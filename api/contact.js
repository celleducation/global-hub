function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function replaceTemplate(template, values) {
  return Object.entries(values).reduce((output, [key, value]) => {
    return output.replace(new RegExp(`{{${key}}}`, 'g'), escapeHtml(value));
  }, template);
}

function buildInternalInquiryHtml(data) {
  return `
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
}

function buildConfirmationHtml(data) {
  const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Global Hub Inquiry Confirmation</title>
</head>
<body style="margin:0;padding:0;background:#050505;font-family:Arial,sans-serif;color:#ffffff;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Your Global Hub inquiry has been received. We will get back to you personally shortly.
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#050505;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#0d0d0d;border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;">
          <tr>
            <td style="padding:18px 28px;background:#ff5bd6;color:#050505;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">
              Global Hub for Cell Performance
            </td>
          </tr>
          <tr>
            <td style="padding:40px 28px 24px 28px;background:linear-gradient(180deg,#111111 0%,#0b0b0b 100%);">
              <div style="font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#ff5bd6;margin-bottom:14px;">Inquiry Received</div>
              <h1 style="margin:0 0 18px 0;font-size:36px;line-height:1.05;font-weight:800;color:#ffffff;">Thank you for your request.</h1>
              <p style="margin:0 0 18px 0;font-size:17px;line-height:1.75;color:rgba(255,255,255,0.82);">Hello {{contactName}}, we have received your Global Hub inquiry regarding <span style="color:#ff5bd6;">{{interest}}</span>.</p>
              <p style="margin:0;font-size:16px;line-height:1.75;color:rgba(255,255,255,0.72);">Our team will review your request personally and come back to you shortly with the next steps for network access, event participation, or shop-related questions.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px 28px;background:#0b0b0b;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0;background:#121212;border:1px solid rgba(255,255,255,0.08);border-radius:18px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 22px;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#ff5bd6;margin-bottom:8px;">Your Request</div>
                    <div style="font-size:15px;line-height:1.7;color:#ffffff;"><strong style="font-weight:700;">Company / Practice:</strong> {{company}}</div>
                    <div style="font-size:15px;line-height:1.7;color:#ffffff;"><strong style="font-weight:700;">Contact Person:</strong> {{contactName}}</div>
                    <div style="font-size:15px;line-height:1.7;color:#ffffff;"><strong style="font-weight:700;">Interest:</strong> {{interest}}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 22px;">
                    <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#ff5bd6;margin-bottom:8px;">What Happens Next</div>
                    <div style="font-size:15px;line-height:1.8;color:rgba(255,255,255,0.78);">1. We review your inquiry internally.<br>2. We assess the right fit for your request.<br>3. We get back to you personally via email.</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 34px 28px;background:#0b0b0b;">
              <a href="https://www.cell-performance.shop" style="display:inline-block;padding:14px 22px;border-radius:999px;border:1.5px solid #ff5bd6;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;">Visit Shop</a>
              <a href="https://www.cell-education.com" style="display:inline-block;margin-left:12px;padding:14px 22px;border-radius:999px;border:1px solid rgba(255,255,255,0.18);color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;">Cell Education</a>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 28px 28px;background:#080808;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0 0 8px 0;font-size:13px;line-height:1.7;color:rgba(255,255,255,0.72);">Global Hub for Cell Performance</p>
              <p style="margin:0 0 8px 0;font-size:13px;line-height:1.7;color:rgba(255,255,255,0.52);">Cell Education - The Institute GmbH & Co. KG · Frankfurter Straße 7 · 61462 Königstein im Taunus</p>
              <p style="margin:0;font-size:13px;line-height:1.7;color:rgba(255,255,255,0.52);"><a href="https://cell-education.com/impressum" style="color:rgba(255,255,255,0.72);text-decoration:none;">Imprint</a> · <a href="https://cell-education.com/datenschutz" style="color:rgba(255,255,255,0.72);text-decoration:none;">Privacy Policy</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return replaceTemplate(template, {
    company: data.company || '—',
    contactName: data.contactName || 'there',
    interest: data.interest || 'your inquiry'
  });
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
    const html = buildInternalInquiryHtml(data);
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

    const internalResponse = await fetch('https://api.resend.com/emails', {
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

    const internalResult = await internalResponse.json().catch(() => ({}));
    if (!internalResponse.ok) {
      return res.status(502).json({ ok: false, error: internalResult.message || 'Email delivery failed' });
    }

    const confirmationResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [data.email],
        subject: 'We received your Global Hub inquiry',
        html: buildConfirmationHtml(data),
        text: [
          `Hello ${data.contactName},`,
          '',
          `We have received your Global Hub inquiry regarding ${data.interest}.`,
          'Our team will review your request personally and come back to you shortly.',
          '',
          'Global Hub for Cell Performance'
        ].join('\n')
      })
    });

    const confirmationResult = await confirmationResponse.json().catch(() => ({}));
    if (!confirmationResponse.ok) {
      return res.status(502).json({ ok: false, error: confirmationResult.message || 'Confirmation email delivery failed' });
    }

    return res.status(200).json({
      ok: true,
      id: internalResult.id || null,
      confirmationId: confirmationResult.id || null
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || 'Unexpected server error' });
  }
};
