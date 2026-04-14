const nav=document.getElementById('nav');
const hero=document.querySelector('.hero');
function syncScrollUi(){
  const isScrolled = window.scrollY > 12;
  let switchPoint = 50;
  if(hero){
    const navHeight = nav ? nav.offsetHeight : 0;
    switchPoint = Math.max(50, hero.offsetHeight - navHeight - 24);
  }
  nav.classList.toggle('nav--scrolled', window.scrollY >= switchPoint);
  document.body.classList.toggle('is-scrolled', isScrolled);
}
window.addEventListener('scroll', syncScrollUi, { passive: true });
window.addEventListener('resize', syncScrollUi);
function toggleNav(){document.getElementById('navOverlay').classList.toggle('active')}
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',function(e){const t=document.querySelector(this.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}})});

const partnerLogoScroller=document.querySelector('.partners__mobile-scroll');
const partnerLogoImage=document.querySelector('.partners__mobile-image');
let partnerLogoFrame=null;
let partnerLogoPausedUntil=0;

function stopPartnerLogoAutoScroll(){
  if(partnerLogoFrame){
    cancelAnimationFrame(partnerLogoFrame);
    partnerLogoFrame=null;
  }
}

function startPartnerLogoAutoScroll(){
  stopPartnerLogoAutoScroll();
  if(!partnerLogoScroller || !partnerLogoImage) return;
  if(!window.matchMedia('(max-width: 768px)').matches) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const maxScroll = Math.max(0, partnerLogoScroller.scrollWidth - partnerLogoScroller.clientWidth);
  if(maxScroll < 24) return;

  let direction = 1;
  let lastTime = performance.now();
  const speed = 18;

  const step = (now) => {
    const delta = now - lastTime;
    lastTime = now;

    if(now < partnerLogoPausedUntil){
      partnerLogoFrame = requestAnimationFrame(step);
      return;
    }

    const next = partnerLogoScroller.scrollLeft + direction * speed * (delta / 1000);
    if(next >= maxScroll){
      partnerLogoScroller.scrollLeft = maxScroll;
      direction = -1;
      partnerLogoPausedUntil = now + 900;
    } else if(next <= 0){
      partnerLogoScroller.scrollLeft = 0;
      direction = 1;
      partnerLogoPausedUntil = now + 900;
    } else {
      partnerLogoScroller.scrollLeft = next;
    }

    partnerLogoFrame = requestAnimationFrame(step);
  };

  partnerLogoFrame = requestAnimationFrame(step);
}

if(partnerLogoScroller){
  const pauseAutoScroll = () => {
    partnerLogoPausedUntil = performance.now() + 4000;
  };
  partnerLogoScroller.addEventListener('touchstart', pauseAutoScroll, { passive: true });
  partnerLogoScroller.addEventListener('pointerdown', pauseAutoScroll, { passive: true });
  partnerLogoScroller.addEventListener('scroll', pauseAutoScroll, { passive: true });
  window.addEventListener('resize', startPartnerLogoAutoScroll);
  window.addEventListener('load', startPartnerLogoAutoScroll);
  startPartnerLogoAutoScroll();
}

const translations={
en:{
nav:["Shop","Event","Partners","Network"],
banner:["Exclusive","June 20, 2026 - Longevity Lab Mallorca","Limited spots for doctors, health professionals, and companies in the health sector"],
heroAbout:"About Cell Education",
headlineTitle:'Shaping the future of <span class="accent">cellular medicine</span>.',
headlineText:"The international network for cellular health, connecting doctors, researchers, and therapists worldwide.",
headlineCta:"Join the Network",
cards:["About Cell Education","Our Partners"],
textblock:'With the Global Hub Network, we connect doctors worldwide for cellular medicine, longevity, and therapeutic innovation.',
textblockCta:"Register",
shopLabel:"Shop",
shopTitle:"Products & Solutions",
shopCards:[
["Supplements","Targeted formulations for mitochondrial support, cellular health, and performance-oriented practice concepts.","Explore"],
["Infusions","Specialized infusion solutions for structured clinical use, including mitochondrial support and practice-oriented application concepts.","Explore"],
["Medical Know-How","Educational resources and structured medical guidance around bionic cell therapy, cellular health protocols, and practical integration into clinical settings.","Explore"]
],
eventLabel:"Event",
eventTitle:"Longevity Lab Mallorca 2026",
eventDate:"June 20, 2026",
eventHeroTitle:"Longevity Lab<br>Mallorca",
eventLocation:"Mallorca, Spain · Estadi Mallorca Son Moix & Mallorca Country Club",
eventDesc:"As the official sponsor of RCD Mallorca and a partner of the Mallorca Country Club, the Global Hub for Cell Performance invites an exclusive group to a unique day of experiences. Discover how bionic cell therapy and evidence-based approaches to cellular health are setting new standards for performance, recovery, and long-term health.",
eventBtns:["Secure Your Spot"],
timeline:[
["Longevity & Performance Seminar","Estadi Mallorca Son Moix, Home of RCD Mallorca. Scientific presentations on bionic cell therapy, longevity strategies and preventive medicine, led by Dr. Kay Bredehorst."],
["ATP Tournament & Networking","Mallorca Country Club, Vanda Pharmaceuticals Mallorca Championships. World-class tennis and exclusive networking in Santa Ponsa."],
["Welcome Drink","Mallorca Country Club, Avinguda del Golf 20, 07180 Santa Ponsa. Enjoy a welcome drink to arrive, connect, and enjoy the atmosphere before the evening program begins."],
["Evening Event & Dinner","An exclusive evening for personal interaction with doctors, sports medicine specialists and business leaders."]
],
gallery:[
["Evening Event at Mallorca Country Club","Networking, dinner and curated conversations in a premium setting in Santa Ponsa."],
["ATP Tournament & Networking","World-class tennis atmosphere as part of the Vanda Pharmaceuticals Mallorca Championships."]
],
expertsLabel:"Medical Leadership",
expertsTitle:"Dr. Kay Bredehorst",
expertRole:"Director",
expertDesc:"Founder & Medical Director of Cell Education, developer of ONE Life Sciences supplements, recognized expert in bionic cell therapy and longevity, and consultant to numerous organizations in elite professional sports.",
badges:["Bionic Cell Therapy","Longevity","Elite Sports"],
networkLabel:"B2B",
networkTitle:"The Global Hub Network",
networkFeatures:[
["Verified Partners","Access for doctors, practitioners, medical professionals, and companies in the health sector."],
["Exclusive Protocols","Clinically validated therapy protocols and practical dosage guidance."],
["Medical Education","Education in cellular medicine, available online and in person."],
["B2B Opportunities","Exclusive conditions, network access, and new partnership opportunities for practices, clinics, and health businesses."]
],
partnersLabel:"Partners",
partnersTitle:"Selected partners in the Global Hub ecosystem",
partnersText:"The Global Hub brings together educational, clinical, and sports-related partners in one curated context. This creates a clearer entry point for professional exchange, product orientation, and event participation.",
sportLabel:"Official Partner of RCD Mallorca",
sportTitle:"Sport & Cellular Medicine",
sportHead:'RCD Mallorca',
sportText:"As an official sponsor of RCD Mallorca, we support elite performance at the highest international level. The partnership reflects shared values such as ambition, professionalism, and continuous development. Through this sponsorship, we engage in the environment of international professional football and contribute to a context in which peak athletic performance can thrive.",
sportBtn:"Visit RCD Mallorca",
officialLabel:"Official Partners",
officialBodies:[
"With Burg-Apotheke as a partner, we develop novel infusion applications that are available exclusively to our participants. Together, we offer a unique combination of medical knowledge transfer and innovative infusion solutions, individually developed for your practice or clinic.",
"Mallorca Country Club is one of the island's leading sports and event venues and hosts international tennis events such as the ATP Mallorca Championships. This partnership creates a distinctive setting for our events and network gatherings, combining a professional sports environment, an international audience, and high-quality infrastructure for meaningful exchange around health, performance, and prevention."
],
officialBtns:["Burg Apotheke","Mallorca Country Club"],
finalTitle:'Become Part of the Global Hub',
finalText:"B2B inquiry for doctors, practitioners, health professionals, and companies in the health sector.",
finalIntro:"Please enter your details. We will get back to you personally and review the right fit for network access, event participation, and shop access.",
formLabels:["Company / Practice","Contact Person","Email","Phone","Role","Interest","Message"],
roleOptions:["Please choose","Doctor","Practitioner","Pharmacist / Pharmacy","Health Professional","Health Sector Company","Sports Medicine / Performance","Other"],
interestOptions:["Please choose","Longevity Lab Mallorca 2026","Global Hub Network","Shop Access / Products","Partnership / Cooperation"],
messagePlaceholder:"What are you specifically interested in?",
formNote:"We review every request personally. For direct contact, please email info@cell-education.com.",
formBtns:["Send Inquiry","Go to Shop"],
memberCta:"Become a Member",
formStatus:{submitting:"Sending your inquiry...",submittingButton:"Sending...",success:"Thank you. Your request has been sent successfully.",error:"We could not send your request right now. Please email info@cell-education.com."},
footerHeadings:["","Instagram"],
footerTag:'Connecting<br>Medicine<br><span class="accent">Worldwide</span>',
footerCompany:"Cell Education - The Institute GmbH & Co. KG · Frankfurter Straße 7 · 61462 Königstein im Taunus",
footerLegal:["Imprint","Privacy Policy"],
floatingShop:"Shop"
},
de:{
nav:["Shop","Veranstaltung","Partners","Netzwerk"],
banner:["Exklusiv","20. Juni 2026 - Longevity Lab Mallorca","Begrenzte Plätze für Ärzte, Gesundheitsfachkräfte und Unternehmen aus dem Gesundheitsbereich"],
heroAbout:"Über Cell Education",
headlineTitle:'Wir gestalten die Zukunft der <span class="accent">Zellmedizin</span>.',
headlineText:"Das internationale Netzwerk für zelluläre Gesundheit, das Ärzte, Forschende und Therapeutinnen und Therapeuten weltweit verbindet.",
headlineCta:"Dem Netzwerk beitreten",
cards:["Über Cell Education","Unsere Partner"],
textblock:'Mit dem Global Hub Netzwerk vernetzen wir Ärzte weltweit für Zellmedizin, Longevity und therapeutische Innovation.',
textblockCta:"Jetzt anfragen",
shopLabel:"Shop",
shopTitle:"Produkte & Lösungen",
shopCards:[
["Supplemente","Gezielte Formulierungen für mitochondriale Unterstützung, zelluläre Gesundheit und leistungsorientierte Praxiskonzepte.","Entdecken"],
["Infusionen","Spezialisierte Infusionslösungen für den strukturierten klinischen Einsatz, inklusive mitochondrialer Unterstützung und praxisnaher Anwendungskonzepte.","Entdecken"],
["Medizinisches Know-how","Fachliche Inhalte und strukturierte medizinische Orientierung zu bionischer Zelltherapie, Protokollen für zelluläre Gesundheit und deren Integration in den Praxisalltag.","Entdecken"]
],
eventLabel:"Veranstaltung",
eventTitle:"Longevity Lab Mallorca 2026",
eventDate:"20. Juni 2026",
eventHeroTitle:"Longevity Lab<br>Mallorca",
eventLocation:"Mallorca, Spanien · Estadi Mallorca Son Moix & Mallorca Country Club",
eventDesc:"Als offizieller Sponsor von RCD Mallorca und Partner des Mallorca Country Club lädt der Global Hub for Cell Performance eine exklusive Gruppe zu einem besonderen Tag voller Impulse und Begegnungen ein. Erleben Sie, wie bionische Zelltherapie und evidenzbasierte Konzepte für zelluläre Gesundheit neue Standards für Performance, Regeneration und langfristige Gesundheit setzen.",
eventBtns:["Platz sichern"],
timeline:[
["Seminar zu Longevity & Performance","Im Estadi Mallorca Son Moix, der Heimat von RCD Mallorca. Fachvorträge zu bionischer Zelltherapie, Longevity-Strategien und Präventivmedizin unter der Leitung von Dr. Kay Bredehorst."],
["ATP-Turnier & Networking","Im Mallorca Country Club bei den Vanda Pharmaceuticals Mallorca Championships. Spitzentennis und exklusives Networking in Santa Ponsa."],
["Welcome Drink","Mallorca Country Club, Avinguda del Golf 20, 07180 Santa Ponsa. Genießen Sie einen Welcome Drink, um anzukommen, sich auszutauschen und die Atmosphäre vor dem Abendprogramm zu erleben."],
["Abendveranstaltung & Dinner","Ein exklusiver Abend für den persönlichen Austausch mit Ärzten, Sportmedizinern und unternehmerischen Entscheidern."]
],
gallery:[
["Abendveranstaltung im Mallorca Country Club","Networking, Dinner und kuratierte Gespräche in einem hochwertigen Rahmen in Santa Ponsa."],
["ATP-Turnier & Networking","Weltklasse-Tennis im Rahmen der Vanda Pharmaceuticals Mallorca Championships."]
],
expertsLabel:"Fachliche Leitung",
expertsTitle:"Dr. Kay Bredehorst",
expertRole:"Leitung",
expertDesc:"Gründer und Medical Director von Cell Education, Entwickler der Supplemente von ONE Life Sciences, anerkannter Experte für bionische Zelltherapie und Longevity sowie Berater zahlreicher Organisationen im professionellen Spitzensport.",
badges:["Bionische Zelltherapie","Longevity","Spitzensport"],
networkLabel:"B2B",
networkTitle:"Das Global Hub Netzwerk",
networkFeatures:[
["Verifizierte Partner","Zugang für Ärzte, Heilpraktiker, medizinische Fachkräfte und Unternehmen aus dem Gesundheitsbereich."],
["Exklusive Protokolle","Klinisch validierte Therapieprotokolle und praxisnahe Dosierungsempfehlungen."],
["Medizinische Fortbildung","Fortbildungen in der Zellmedizin, online und vor Ort verfügbar."],
["B2B-Möglichkeiten","Exklusive Konditionen, Netzwerkzugang und neue Partnerschaftschancen für Praxen, Kliniken und Gesundheitsunternehmen."]
],
partnersLabel:"Partner",
partnersTitle:"Ausgewählte Partner im Global Hub Ökosystem",
partnersText:"Der Global Hub bringt Bildungs-, Klinik- und sportbezogene Partner in einem kuratierten Kontext zusammen. So entsteht ein klarerer Einstieg in fachlichen Austausch, Produktorientierung und Veranstaltungsteilnahme.",
sportLabel:"Offizieller Partner von RCD Mallorca",
sportTitle:"Sport & Zellmedizin",
sportHead:'RCD Mallorca',
sportText:"Zellmedizin und Performance-Optimierung im Profisport und damit zelluläre Gesundheit mitten im Spitzensport auf und neben dem Platz.",
sportBtn:"RCD Mallorca besuchen",
officialLabel:"Offizielle Partner",
officialBodies:[
"Gemeinsam mit der Burg-Apotheke entwickeln wir neuartige Infusionsanwendungen, die exklusiv für unsere Teilnehmer verfügbar sind. So entsteht eine besondere Verbindung aus medizinischer Wissensvermittlung und innovativen Infusionslösungen, individuell für Praxis oder Klinik konzipiert.",
"Der Mallorca Country Club zählt zu den renommiertesten Sport- und Eventlocations der Insel und ist Austragungsort internationaler Tennisevents wie der ATP Mallorca Championships. Die Partnerschaft schafft den passenden Rahmen für unsere Veranstaltungen und Netzwerktreffen mit professionellem Sportumfeld, internationalem Publikum und hochwertiger Infrastruktur."
],
officialBtns:["Burg Apotheke","Mallorca Country Club"],
finalTitle:'Teil des Global Hub werden',
finalText:"B2B-Anfrage für Ärzte, Heilpraktiker, Gesundheitsfachkräfte und Unternehmen aus dem Gesundheitsbereich.",
finalIntro:"Bitte hinterlassen Sie Ihre Angaben. Wir melden uns persönlich bei Ihnen und prüfen gemeinsam den passenden Zugang zu Netzwerk, Veranstaltung und Shop.",
formLabels:["Unternehmen / Praxis","Ansprechpartner","E-Mail","Telefon","Rolle","Interesse","Nachricht"],
roleOptions:["Bitte wählen","Arzt","Heilpraktiker","Apotheker / Apotheke","Gesundheitsfachkraft","Unternehmen im Gesundheitsbereich","Sportmedizin / Performance","Sonstiges"],
interestOptions:["Bitte wählen","Longevity Lab Mallorca 2026","Global Hub Netzwerk","Shop-Zugang / Produkte","Partnerschaft / Kooperation"],
messagePlaceholder:"Wofür interessieren Sie sich konkret?",
formNote:"Wir prüfen jede Anfrage persönlich. Für direkten Kontakt schreiben Sie bitte an info@cell-education.com.",
formBtns:["Anfrage senden","Zum Shop"],
memberCta:"Mitglied werden",
formStatus:{submitting:"Ihre Anfrage wird gesendet...",submittingButton:"Wird gesendet...",success:"Vielen Dank. Ihre Anfrage wurde erfolgreich versendet.",error:"Ihre Anfrage konnte gerade nicht gesendet werden. Bitte schreiben Sie an info@cell-education.com."},
footerHeadings:["","Instagram"],
footerTag:'Medizin<br>weltweit<br><span class="accent">verbinden</span>',
footerCompany:"Cell Education - The Institute GmbH & Co. KG · Frankfurter Straße 7 · 61462 Königstein im Taunus",
footerLegal:["Impressum","Datenschutz"],
floatingShop:"Shop"
},
es:{
nav:["Tienda","Evento","Partners","Red"],
banner:["Exclusivo","20 de junio de 2026 - Longevity Lab Mallorca","Plazas limitadas para médicos, profesionales de la salud y empresas del sector sanitario"],
heroAbout:"Sobre Cell Education",
headlineTitle:'Dando forma al futuro de la <span class="accent">medicina celular</span>.',
headlineText:"La red internacional para la salud celular, que conecta a medicos, investigadores y terapeutas de todo el mundo.",
headlineCta:"Unirse a la red",
cards:["Sobre Cell Education","Nuestros socios"],
textblock:'Con la red Global Hub conectamos a profesionales medicos de todo el mundo en torno a la medicina celular, la longevidad y la innovacion terapeutica.',
textblockCta:"Solicitar acceso",
shopLabel:"Tienda",
shopTitle:"Productos y soluciones",
shopCards:[
["Suplementos","Formulaciones dirigidas al soporte mitocondrial, la salud celular y conceptos orientados al rendimiento en la practica profesional.","Explorar"],
["Infusiones","Soluciones de infusion especializadas para un uso clinico estructurado, con apoyo mitocondrial y conceptos de aplicacion orientados a la practica.","Explorar"],
["Conocimiento medico","Recursos formativos y orientacion medica estructurada sobre terapia celular bionica, protocolos de salud celular e integracion practica en entornos clinicos.","Explorar"]
],
eventLabel:"Evento",
eventTitle:"Longevity Lab Mallorca 2026",
eventDate:"20 de junio de 2026",
eventHeroTitle:"Longevity Lab<br>Mallorca",
eventLocation:"Mallorca, Espana · Estadi Mallorca Son Moix & Mallorca Country Club",
eventDesc:"Como patrocinador oficial del RCD Mallorca y socio del Mallorca Country Club, Global Hub for Cell Performance reune a profesionales para una jornada centrada en salud celular, prevencion y medicina del rendimiento. El programa combina educacion medica, intercambio interdisciplinar y perspectivas basadas en evidencia para la practica clinica y aplicada.",
eventBtns:["Reservar plaza"],
timeline:[
["Seminario de longevidad y rendimiento","Estadi Mallorca Son Moix, sede del RCD Mallorca. Presentaciones cientificas sobre terapia celular bionica, estrategias de longevidad y medicina preventiva, dirigidas por el Dr. Kay Bredehorst."],
["Torneo ATP y networking","Mallorca Country Club, Vanda Pharmaceuticals Mallorca Championships. Tenis de primer nivel y networking exclusivo en Santa Ponsa."],
["Welcome Drink","Mallorca Country Club, Avinguda del Golf 20, 07180 Santa Ponsa. Disfrute de una copa de bienvenida para llegar, conectar y disfrutar del ambiente antes de que comience el programa de la noche."],
["Evento de noche y cena","Una velada exclusiva para el intercambio personal con medicos, especialistas en medicina deportiva y responsables empresariales."]
],
gallery:[
["Evento de noche en Mallorca Country Club","Networking, cena y conversaciones curadas en un entorno premium en Santa Ponsa."],
["Torneo ATP e intercambio profesional","Contexto tenistico internacional en el marco de las Vanda Pharmaceuticals Mallorca Championships."]
],
expertsLabel:"Direccion medica",
expertsTitle:"Dr. Kay Bredehorst",
expertRole:"Director",
expertDesc:"Fundador y director medico de Cell Education, desarrollador de los suplementos de ONE Life Sciences, experto reconocido en terapia celular bionica y longevidad, y asesor de numerosas organizaciones del deporte profesional de elite.",
badges:["Terapia celular bionica","Longevidad","Deporte de elite"],
networkLabel:"B2B",
networkTitle:"La red Global Hub",
networkFeatures:[
["Socios verificados","Acceso para medicos, terapeutas, profesionales sanitarios y empresas del sector salud."],
["Protocolos exclusivos","Protocolos terapeuticos clinicamente validados y pautas practicas de dosificacion."],
["Formacion medica","Formacion en medicina celular, disponible online y presencial."],
["Oportunidades B2B","Condiciones exclusivas, acceso a la red y nuevas oportunidades de colaboracion para consultas, clinicas y empresas de salud."]
],
partnersLabel:"Socios",
partnersTitle:"Socios seleccionados en el ecosistema Global Hub",
partnersText:"Global Hub reúne a socios educativos, clínicos y vinculados al deporte en un contexto curado. Esto crea un punto de entrada más claro para el intercambio profesional, la orientación sobre productos y la participación en eventos.",
sportLabel:"Socio oficial del RCD Mallorca",
sportTitle:"Deporte y medicina celular",
sportHead:'RCD Mallorca',
sportText:"Medicina celular y optimizacion del rendimiento en el deporte profesional, llevando la salud celular al maximo nivel dentro y fuera del campo.",
sportBtn:"Visitar RCD Mallorca",
officialLabel:"Socios oficiales",
officialBodies:[
"Junto a Burg-Apotheke desarrollamos nuevas aplicaciones de infusion disponibles en exclusiva para nuestros participantes. La colaboracion combina transferencia de conocimiento medico e innovadoras soluciones de infusion adaptadas a cada consulta o clinica.",
"Mallorca Country Club es uno de los espacios deportivos y de eventos mas destacados de la isla y acoge citas internacionales como la ATP Mallorca Championships. Esta colaboracion crea el entorno ideal para nuestros eventos y encuentros de red, con un ambiente deportivo profesional, publico internacional e infraestructura de alto nivel."
],
officialBtns:["Burg Apotheke","Mallorca Country Club"],
finalTitle:'Forme parte del Global Hub',
finalText:"Solicitud B2B para medicos, terapeutas, profesionales sanitarios y empresas del sector salud.",
finalIntro:"Dejenos sus datos. Nos pondremos en contacto personalmente para valorar el acceso mas adecuado a la red, al evento y a la tienda.",
formLabels:["Empresa / consulta","Persona de contacto","Email","Telefono","Perfil","Interes","Mensaje"],
roleOptions:["Seleccione","Medico","Terapeuta","Farmaceutico / farmacia","Profesional sanitario","Empresa del sector salud","Medicina deportiva / performance","Otro"],
interestOptions:["Seleccione","Longevity Lab Mallorca 2026","Red Global Hub","Acceso a tienda / productos","Partnership / cooperacion"],
messagePlaceholder:"En que esta interesado exactamente?",
formNote:"Revisamos cada solicitud personalmente. Para contacto directo, escribanos a info@cell-education.com.",
formBtns:["Enviar solicitud","Ir a la tienda"],
memberCta:"Hazte miembro",
formStatus:{submitting:"Enviando su solicitud...",submittingButton:"Enviando...",success:"Gracias. Su solicitud se ha enviado correctamente.",error:"No hemos podido enviar su solicitud en este momento. Escribanos a info@cell-education.com."},
footerHeadings:["","Instagram"],
footerTag:'Conectando<br>la medicina<br><span class="accent">en todo el mundo</span>',
footerCompany:"Cell Education - The Institute GmbH & Co. KG · Frankfurter Straße 7 · 61462 Königstein im Taunus",
footerLegal:["Aviso legal","Privacidad"],
floatingShop:"Tienda"
},
pl:{
nav:["Sklep","Wydarzenie","Partners","Siec"],
banner:["Ekskluzywnie","20 czerwca 2026 - Longevity Lab Mallorca","Ograniczona liczba miejsc dla lekarzy, specjalistów ochrony zdrowia i firm z sektora zdrowia"],
heroAbout:"O Cell Education",
headlineTitle:'Tworzymy przyszlosc <span class="accent">medycyny komorkowej</span>.',
headlineText:"Miedzynarodowa siec zdrowia komorkowego, laczaca lekarzy, badaczy i terapeutow z calego swiata.",
headlineCta:"Dolacz do sieci",
cards:["O Cell Education","Nasi partnerzy"],
textblock:'<span class="accent">Laczymy lekarzy z calego swiata</span> wokol medycyny komorkowej, longevity i innowacji terapeutycznych.',
textblockCta:"Zglos sie",
shopLabel:"Sklep",
shopTitle:"Produkty i rozwiazania",
shopCards:[
["Suplementy","Ukierunkowane formulacje wspierajace mitochondria, zdrowie komorkowe i koncepcje pracy zorientowane na wydolnosc.","Odkryj"],
["Infuzje","Specjalistyczne rozwiazania infuzyjne do ustrukturyzowanego zastosowania klinicznego, obejmujace wsparcie mitochondrialne i praktyczne koncepcje wdrozenia.","Odkryj"],
["Know-how medyczny","Materialy edukacyjne i uporzadkowane wskazowki medyczne dotyczace bionicznej terapii komorkowej, protokolow zdrowia komorkowego i ich integracji w praktyce klinicznej.","Odkryj"]
],
eventLabel:"Wydarzenie",
eventTitle:"Longevity Lab Mallorca 2026",
eventDate:"20 czerwca 2026",
eventHeroTitle:"Longevity Lab<br>Mallorca",
eventLocation:"Majorka, Hiszpania · Estadi Mallorca Son Moix & Mallorca Country Club",
eventDesc:"Jako oficjalny sponsor RCD Mallorca i partner Mallorca Country Club, Global Hub for Cell Performance gromadzi profesjonalistow wokol zdrowia komorkowego, prewencji i medycyny wydolnosciowej. Program laczy edukacje medyczna, wymiane interdyscyplinarna i podejscie oparte na dowodach dla praktyki klinicznej i stosowanej.",
eventBtns:["Zarezerwuj miejsce"],
timeline:[
["Seminarium Longevity i Performance","Estadi Mallorca Son Moix, stadion RCD Mallorca. Prezentacje naukowe o bionicznej terapii komorkowej, strategiach longevity i medycynie prewencyjnej prowadzone przez dr. Kaya Bredehorsta."],
["Turniej ATP i networking","Mallorca Country Club, Vanda Pharmaceuticals Mallorca Championships. Swiatowej klasy tenis i ekskluzywny networking w Santa Ponsa."],
["Wieczorne wydarzenie i kolacja","Ekskluzywny wieczor sprzyjajacy bezposrednim rozmowom z lekarzami, ekspertami medycyny sportowej i liderami biznesu."]
],
gallery:[
["Wieczorne wydarzenie w Mallorca Country Club","Networking, kolacja i starannie zaplanowane rozmowy w wyjatkowej przestrzeni w Santa Ponsa."],
["Turniej ATP i networking","Atmosfera swiatowego tenisa w ramach Vanda Pharmaceuticals Mallorca Championships."],
],
expertsLabel:"Nadzor merytoryczny",
expertsTitle:"Dr. Kay Bredehorst",
expertRole:"Dyrektor",
expertDesc:"Zalozyciel i Medical Director Cell Education, tworca suplementow ONE Life Sciences, uznany ekspert w dziedzinie bionicznej terapii komorkowej i longevity oraz doradca wielu organizacji profesjonalnego sportu.",
badges:["Bioniczna terapia komorkowa","Longevity","Sport elitarny"],
networkLabel:"B2B",
networkTitle:"Siec Global Hub",
networkFeatures:[
["Zweryfikowani partnerzy","Dostep dla lekarzy, terapeutow, specjalistow medycznych i firm z sektora zdrowia."],
["Ekskluzywne protokoly","Klinicznie zweryfikowane protokoly terapeutyczne oraz praktyczne wskazowki dotyczace dawkowania."],
["Edukacja medyczna","Edukacja w zakresie medycyny komorkowej, dostepna online i stacjonarnie."],
["Partnerstwa w ochronie zdrowia","Ustrukturyzowany dostep, wymiana w sieci i mozliwosci partnerstwa dla praktyk, klinik i firm zdrowotnych."]
],
partnersLabel:"Partnerzy",
partnersTitle:"Wybrani partnerzy w ekosystemie Global Hub",
partnersText:"Global Hub łączy partnerów edukacyjnych, klinicznych i związanych ze sportem w jednym, starannie dobranym kontekście. Tworzy to bardziej przejrzysty punkt wejścia do wymiany profesjonalnej, orientacji produktowej i udziału w wydarzeniach.",
sportLabel:"Oficjalny partner RCD Mallorca",
sportTitle:"Sport i medycyna komorkowa",
sportHead:'RCD Mallorca',
sportText:"Medycyna komorkowa i optymalizacja wydolnosci w profesjonalnym sporcie, wprowadzajace zdrowie komorkowe do sportu na najwyzszym poziomie.",
sportBtn:"Odwiedz RCD Mallorca",
officialLabel:"Oficjalni partnerzy",
officialBodies:[
"Wspolnie z Burg-Apotheke rozwijamy nowoczesne zastosowania infuzyjne dostepne wylacznie dla naszych uczestnikow. To polaczenie transferu wiedzy medycznej i innowacyjnych rozwiazan infuzyjnych dopasowanych do potrzeb gabinetu lub kliniki.",
"Mallorca Country Club nalezy do najbardziej renomowanych obiektow sportowych i eventowych na wyspie i gosci miedzynarodowe wydarzenia tenisowe, takie jak ATP Mallorca Championships. Ta wspolpraca tworzy idealne warunki dla naszych wydarzen i spotkan sieciowych."
],
officialBtns:["Burg Apotheke","Mallorca Country Club"],
finalTitle:'Dołącz do Global Hub',
finalText:"Zapytanie B2B dla lekarzy, terapeutow, specjalistow medycznych i firm z sektora zdrowia.",
finalIntro:"Zostaw swoje dane. Skontaktujemy sie osobiscie, aby dobrac odpowiedni dostep do sieci, wydarzenia i sklepu.",
formLabels:["Firma / gabinet","Osoba kontaktowa","Email","Telefon","Rola","Zainteresowanie","Wiadomosc"],
roleOptions:["Wybierz","Lekarz","Terapeuta","Farmaceuta / apteka","Specjalista medyczny","Firma z sektora zdrowia","Medycyna sportowa / performance","Inne"],
interestOptions:["Wybierz","Longevity Lab Mallorca 2026","Siec Global Hub","Dostep do sklepu / produkty","Partnerstwo / wspolpraca"],
messagePlaceholder:"Czym dokladnie jestes zainteresowany?",
formNote:"Kazde zgloszenie analizujemy osobiscie. Aby skontaktowac sie bezposrednio, napisz na info@cell-education.com.",
formBtns:["Wyslij zapytanie","Przejdz do sklepu"],
memberCta:"Zostań członkiem",
formStatus:{submitting:"Wysylanie zapytania...",submittingButton:"Wysylanie...",success:"Dziekujemy. Twoje zapytanie zostalo pomyslnie wyslane.",error:"Nie udalo sie teraz wyslac zapytania. Napisz prosze na info@cell-education.com."},
footerHeadings:["","Instagram"],
footerTag:'Laczymy<br>medycyne<br><span class="accent">na calym swiecie</span>',
footerCompany:"Cell Education - The Institute GmbH & Co. KG · Frankfurter Straße 7 · 61462 Königstein im Taunus",
footerLegal:["Nota prawna","Prywatnosc"],
floatingShop:"Sklep"
}
};

function applyLanguage(lang){
  const t=translations[lang]||translations.en;
  document.documentElement.lang=lang;
  localStorage.setItem("globalHubLang",lang);
  document.querySelectorAll('.lang-switcher button').forEach(btn=>btn.classList.toggle('active',btn.dataset.lang===lang));

  document.querySelectorAll('.nav__links a')[0].textContent=t.nav[0];
  document.querySelectorAll('.nav__links a')[1].textContent=t.nav[1];
  document.querySelectorAll('.nav__links a')[2].textContent=t.nav[2];
  document.querySelectorAll('.nav__links a')[3].textContent=t.nav[3];
  document.querySelector('.nav__cta .pill').childNodes[0].textContent=t.nav[0]+" ";
  document.querySelectorAll('#navOverlay > a')[0].textContent=t.nav[0];
  document.querySelectorAll('#navOverlay > a')[1].textContent=t.nav[1];
  document.querySelectorAll('#navOverlay > a')[2].textContent=t.nav[2];
  document.querySelectorAll('#navOverlay > a')[3].textContent=t.nav[3];
  document.querySelectorAll('#navOverlay > a')[4].childNodes[0].textContent=t.nav[0]+" ";


  document.querySelector('.hero__content .pill').childNodes[0].textContent=t.heroAbout+" ";
  document.querySelector('.headline-section h2').innerHTML=t.headlineTitle;
  document.querySelector('.headline-section p').textContent=t.headlineText;
  document.querySelector('.headline-section .pill').childNodes[0].textContent=t.headlineCta+" ";
  document.querySelector('.network__lede').innerHTML=t.textblock;

  document.querySelector('#shop .sec-label').textContent=t.shopLabel;
  document.querySelector('#shop .sec-title').textContent=t.shopTitle;
  document.querySelectorAll('.shop__card').forEach((card,i)=>{
    card.querySelector('h3').textContent=t.shopCards[i][0];
    card.querySelector('p').textContent=t.shopCards[i][1];
    card.querySelector('.pill').childNodes[0].textContent=t.shopCards[i][2]+" ";
  });

  document.querySelector('.event__date').textContent=t.eventDate;
  document.querySelector('.event__hero h3').innerHTML=t.eventHeroTitle;
  document.querySelector('.event__location').innerHTML=t.eventLocation;
  document.querySelector('.event__desc').textContent=t.eventDesc;
  document.querySelectorAll('.event__btns .pill')[0].childNodes[0].textContent=t.eventBtns[0]+" ";
  document.querySelectorAll('.timeline__item').forEach((item,i)=>{
    item.querySelector('.timeline__title').textContent=t.timeline[i][0];
    item.querySelector('.timeline__desc').textContent=t.timeline[i][1];
  });
  document.querySelectorAll('.event__gallery-caption').forEach((cap,i)=>{
    cap.querySelector('strong').textContent=t.gallery[i][0];
    cap.querySelector('span').textContent=t.gallery[i][1];
  });

  document.querySelector('#experts .sec-label').textContent=t.expertsLabel;
  document.querySelector('#experts .sec-title').textContent=t.expertsTitle;
  document.querySelector('.expert-card__role').textContent=t.expertRole;
  document.querySelector('.expert-card p').textContent=t.expertDesc;
  document.querySelectorAll('.expert-card .badge').forEach((badge,i)=>badge.textContent=t.badges[i]);

  document.querySelector('#network .sec-label').textContent=t.networkLabel;
  document.querySelectorAll('.network__feature').forEach((feature,i)=>{
    feature.querySelector('h4').textContent=t.networkFeatures[i][0];
    feature.querySelector('p').textContent=t.networkFeatures[i][1];
  });
  document.querySelectorAll('.network__actions .pill')[0].childNodes[0].textContent=t.memberCta+" ";

  document.querySelector('#partners .sec-label').textContent=t.partnersLabel;
  document.querySelector('#partners .sec-title').textContent=t.partnersTitle;
  document.querySelector('.partner-cluster__text').textContent=t.partnersText;
  document.querySelector('.partner-cluster__eyebrow').textContent=t.sportLabel;
  document.querySelector('.partner-cluster__spotlight-copy h3').innerHTML=t.sportHead;
  document.querySelector('.partner-cluster__spotlight-copy p').textContent=t.sportText;
  document.querySelector('.partner-cluster__spotlight-copy .pill').childNodes[0].textContent=t.sportBtn+" ";
  document.querySelectorAll('.official-card__content p')[0].textContent=t.officialBodies[0];
  document.querySelectorAll('.official-card__content p')[1].textContent=t.officialBodies[1];
  document.querySelectorAll('.official-card .pill').forEach((btn,i)=>btn.childNodes[0].textContent=t.officialBtns[i]+" ");

  document.querySelector('.final-cta h2').innerHTML=t.finalTitle;
  document.querySelector('.final-cta > p').textContent=t.finalText;
  document.querySelector('.register-form__intro').textContent=t.finalIntro;
  document.querySelectorAll('.register-form label').forEach((label,i)=>label.textContent=t.formLabels[i]);
  const roleOptions=document.querySelectorAll('#role option');
  t.roleOptions.forEach((opt,i)=>{if(roleOptions[i]) roleOptions[i].textContent=opt;});
  const interestOptions=document.querySelectorAll('#interest option');
  t.interestOptions.forEach((opt,i)=>{if(interestOptions[i]) interestOptions[i].textContent=opt;});
  document.querySelector('#message').placeholder=t.messagePlaceholder;
  document.querySelector('.register-form__note').textContent=t.formNote;
  document.querySelector('.register-form__actions .pill--solid').childNodes[0].textContent=t.formBtns[0]+" ";
  document.querySelector('.register-form__actions .pill:not(.pill--solid)').childNodes[0].textContent=t.formBtns[1]+" ";
  syncFormUi();

  document.querySelectorAll('.footer__col h5')[0].textContent=t.footerHeadings[0];
  document.querySelectorAll('.footer__col h5')[1].textContent=t.footerHeadings[1];
  document.querySelector('.footer__tagline h2').innerHTML=t.footerTag;
  document.querySelectorAll('.footer__bottom span')[0].textContent=t.footerCompany;
  document.querySelectorAll('.footer__legal-links a')[0].textContent=t.footerLegal[0];
  document.querySelectorAll('.footer__legal-links a')[1].textContent=t.footerLegal[1];
  document.querySelector('.floating-shop').childNodes[0].textContent=t.floatingShop+"\n";
  document.querySelector('.floating-shop').setAttribute('aria-label',t.formBtns[1]);
}

const registerForm=document.getElementById('registerForm');
const registerFormStatus=document.querySelector('.register-form__status');
const registerFormSubmit=registerForm?.querySelector('button[type="submit"]');
let registerFormState='idle';

function getActiveTranslation(){
  return translations[document.documentElement.lang]||translations[localStorage.getItem("globalHubLang")]||translations.en;
}

function setRegisterFormStatus(state){
  if(!registerFormStatus) return;
  registerFormState=state;
  const t=getActiveTranslation();
  const message=state==='idle'?'':(t.formStatus?.[state]||translations.en.formStatus[state]||'');
  registerFormStatus.hidden=!message;
  registerFormStatus.dataset.state=state;
  registerFormStatus.textContent=message;
}

function syncFormUi(){
  if(!registerFormSubmit) return;
  const t=getActiveTranslation();
  const isSubmitting=registerForm?.dataset.submitting==='true';
  registerFormSubmit.disabled=isSubmitting;
  registerFormSubmit.childNodes[0].textContent=(isSubmitting?(t.formStatus?.submittingButton||translations.en.formStatus.submittingButton):t.formBtns[0])+" ";
  if(registerFormState!=='idle') setRegisterFormStatus(registerFormState);
}

if(registerForm){
  registerForm.addEventListener('submit',async event=>{
    event.preventDefault();
    if(!registerForm.reportValidity()) return;

    const formData=new FormData(registerForm);
    const payload={
      company:String(formData.get('Company / Practice')||'').trim(),
      contactName:String(formData.get('Contact Person')||'').trim(),
      email:String(formData.get('Email')||'').trim(),
      phone:String(formData.get('Phone')||'').trim(),
      role:String(formData.get('Role')||'').trim(),
      interest:String(formData.get('Interest')||'').trim(),
      message:String(formData.get('Message')||'').trim(),
      website:String(formData.get('website')||'').trim()
    };

    if(payload.website){
      registerForm.reset();
      setRegisterFormStatus('success');
      syncFormUi();
      return;
    }

    registerForm.dataset.submitting='true';
    setRegisterFormStatus('submitting');
    syncFormUi();

    try{
      const response=await fetch('/api/contact',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)
      });
      const result=await response.json().catch(()=>({}));
      if(!response.ok||result.ok!==true){
        throw new Error(result.error||'Request failed');
      }
      registerForm.reset();
      setRegisterFormStatus('success');
    }catch(error){
      console.error('Contact form submission failed',error);
      setRegisterFormStatus('error');
    }finally{
      registerForm.dataset.submitting='false';
      syncFormUi();
    }
  });
}

document.querySelectorAll('.lang-switcher button').forEach(btn=>{
  btn.addEventListener('click',()=>applyLanguage(btn.dataset.lang));
});

applyLanguage(localStorage.getItem("globalHubLang")||"en");

syncScrollUi();
