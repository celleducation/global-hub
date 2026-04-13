function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || 'Global Hub <onboarding@resend.dev>';
  const to = process.env.CONTACT_TO_EMAIL || 'info@cell-education.com';

  if (!apiKey) {
    return res.status(500).json({ ok: false, error: 'Missing RESEND_API_KEY' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const data = {
      company: String(body.company || '').trim(),
      contactName: String(body.contactName || '').trim(),
      email: String(body.email || '').trim(),
      phone: String(body.phone || '').trim(),
      role: String(body.role || '').trim(),
      interest: String(body.interest || '').trim(),
      message: String(body.message || '').trim(),
      website: String(body.website || '').trim()
    };

    if (data.website) {
      return res.status(200).json({ ok: true });
    }

    if (!data.company || !data.contactName || !data.email || !data.role || !data.interest) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    const subject = `Global Hub Inquiry: ${data.interest}`;
    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;max-width:640px">
        <h2 style="margin:0 0 16px">New Global Hub inquiry</h2>
        <p style="margin:0 0 24px">A new request was submitted through the Global Hub form.</p>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px 0;font-weight:700;width:180px">Company / Practice</td><td style="padding:8px 0">${escapeHtml(data.company)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Contact Person</td><td style="padding:8px 0">${escapeHtml(data.contactName)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Email</td><td style="padding:8px 0">${escapeHtml(data.email)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Phone</td><td style="padding:8px 0">${escapeHtml(data.phone || '—')}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Role</td><td style="padding:8px 0">${escapeHtml(data.role)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Interest</td><td style="padding:8px 0">${escapeHtml(data.interest)}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700;vertical-align:top">Message</td><td style="padding:8px 0">${escapeHtml(data.message || '—').replace(/\n/g, '<br>')}</td></tr>
        </table>
      </div>
    `;

    const text = [
      'New Global Hub inquiry',
      '',
      `Company / Practice: ${data.company}`,
      `Contact Person: ${data.contactName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || '—'}`,
      `Role: ${data.role}`,
      `Interest: ${data.interest}`,
      `Message: ${data.message || '—'}`
    ].join('\n');

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject,
        html,
        text
      })
    });

    const resendResult = await resendResponse.json().catch(() => ({}));
    if (!resendResponse.ok) {
      return res.status(502).json({ ok: false, error: resendResult.message || 'Email delivery failed' });
    }

    return res.status(200).json({ ok: true, id: resendResult.id || null });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || 'Unexpected server error' });
  }
};
