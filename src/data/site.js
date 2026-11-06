// Company-wide facts. Source: BuildINT AI Company Profile (2026) and Product Brochure.
export const SITE = {
  name: 'BuildINT AI',
  legalName: 'BuildINT AI Private Limited',
  tagline: 'Bharat Ka Apna Building Intelligence',
  slogan: 'Saving Aapki, Bijlee Desh ki',
  phone: '+91 74000 74047',
  email: 'support@buildint.co',
  demoUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe421Gs2zLQH9vfVgJL4Q0L9SwZHUC7w-oB18e3maWDsl2MyQ/viewform?usp=dialog',
  chatUrl: 'https://www.chatbase.co/chatbot-iframe/28A_XJd3jlPr9LhM-9uEn',
  logo: 'brand/logo',
  logoWhite: 'brand/logo-white',
  mascot: 'brand/elebi',
  mascotFace: 'brand/elebi-face',
  founded: 2019,

  mission: 'To lead in IoT-driven smart energy management & automation, enabling efficiency, sustainability, and a greener future.',
  vision: 'To empower businesses to optimize energy, reduce costs, and drive sustainability through intelligent IoT and automation solutions.',

  about: [
    'BuildINT AI runs iBMS on the Green X Platform and brings Surveillance AI, solar and access control onto one cloud dashboard, with Made-in-India devices.',
    'Founded in 2019 and headquartered in Mumbai, with an AI Tech Center in Lucknow, we combine AI, IoT, edge computing and real-time analytics to make buildings efficient, safe and future-ready, from a single branch to a national network of 15,000+ sites.',
  ],

  // Our story (About page)
  story: [
    'From vision to reality, BuildINT has led the way in smart energy management through IoT-driven innovation. What began as a mission to optimize consumption has evolved into a powerful blend of automation solutions, connected devices, and real-time data—empowering businesses to cut costs, reduce waste, and boost efficiency.',
    "Over time, we've expanded across industries, delivering smart technology, sensor-based monitoring, and cloud connectivity that support sustainable growth. With a focus on industrial IoT, predictive maintenance, and intelligent control systems, we continue building a greener, smarter future.",
  ],

  // Two BuildINT AI brands shown on the About page.
  brands: [
    { name: 'Green X', role: 'Smart building platform', text: 'Our Made-in-India IoT platform and devices (Green X 100, 200, 500 and 1000) run iBMS: HVAC, lighting, meters, CCTV and access control, all on one cloud dashboard.', to: '/products' },
    { name: 'ESSA', role: 'Energy', text: 'Our energy business: solar, energy efficiency and measurable savings that cut electricity bills and carbon emissions at every site.', to: '/solutions/solar' },
  ],

  // Growth & traction (company profile, 2026)
  traction: [
    { to: 7, suffix: '+', label: 'Years of Experience' },
    { to: 52, suffix: '+', label: 'Clients' },
    { to: 15, suffix: 'K+', label: 'Sites Deployed' },
    { to: 300, suffix: '+', label: 'Engineers PAN India' },
    { to: 10, suffix: ' Lakh+', label: 'kWh Energy Saved' },
  ],

  // Sustainability impact (BuildINT AI, 2026). Update here and every page follows.
  impact: {
    energy: { to: 10, suffix: ' Lakh+', unit: 'kWh', label: 'Energy Saved' },
    co2: { to: 675, suffix: '+', unit: 'Tonnes', label: 'CO₂ Emissions Avoided' },
    note: 'Equivalent to 6,75,000 kg of CO₂ emissions avoided through energy efficiency.',
  },

  // Community & sport (CSR). Add new events at the top.
  community: [
    {
      kind: 'Sports sponsorship',
      title: 'BuildINT AI Sponsors Local Sport',
      text: 'BuildINT AI is proud to sponsor sporting events that bring people together. Supporting athletes and grassroots sport is part of how we build healthier, more active and more connected communities.',
      url: 'https://www.linkedin.com/feed/update/urn:li:activity:7521454197733691392',
      photos: [
        ['csr/sports-team', 'BuildINT AI team with young athletes at their training centre'],
        ['csr/sports-medals', 'Sponsored athletes with their medals and trophies'],
      ],
    },
  ],

  journey: [
    { year: 2019, text: 'Started BuildINT in June' },
    { year: 2020, text: '1st PAN India project in iEMS', note: 'Covid impact' },
    { year: 2021, text: '1000+ locations installed', note: 'Covid impact' },
    { year: 2022, text: 'NEON launched' },
    { year: 2023, text: 'iMAX launched' },
    { year: 2024, text: 'AI-based e-surveillance solutions' },
    { year: 2025, text: 'Strategic partnership with CP Plus' },
    { year: 2026, text: 'AI Tech Center opens in Lucknow' },
  ],

  offices: [
    { city: 'Mumbai', kind: 'Registered office', address: '808, 8th Floor, Lodha Supremus, Opposite MTNL Office, Powai Saki Vihar Road, Andheri East, Mumbai – 400072', photo: 'presence/mumbai-office', map: 'https://www.google.com/maps/search/?api=1&query=Lodha+Supremus+Saki+Vihar+Road+Powai+Mumbai+400072' },
    { city: 'Lucknow', kind: 'AI Tech Center', address: 'First Floor, 1/6 A Vardan Khand, Sector 1, Gomti Nagar Extension, Lucknow – 226010', photo: 'presence/lucknow-tech-center', map: 'https://www.google.com/maps/search/?api=1&query=Vardan+Khand+Sector+1+Gomti+Nagar+Extension+Lucknow+226010' },
  ],
  presence: ['Mumbai', 'Lucknow', 'Hyderabad', 'Gurugram', 'Dubai'],

  socials: [
    { label: 'Facebook', short: 'fb', url: 'https://www.facebook.com/buildintofficial' },
    { label: 'X (Twitter)', short: 'x', url: 'https://twitter.com/BuildINT_ind' },
    { label: 'Instagram', short: 'ig', url: 'https://www.instagram.com/buildint_official/' },
    { label: 'LinkedIn', short: 'in', url: 'https://www.linkedin.com/company/buildint/' },
  ],

  certifications: [
    { kind: 'Quality', name: 'ISO 9001:2015' },
    { kind: 'Information security', name: 'ISO/IEC 27001:2022' },
    { kind: 'Government of India', name: 'Start-up Recognition' },
    { kind: 'Intellectual property', name: 'Patent Certificate' },
  ],
  recognitions: ['Make in India', 'ISO 9001:2015', 'ISO/IEC 27001:2022', 'D-U-N-S Registered', 'ISHRAE', 'MSME', 'CII', 'CP Plus System Integrator'],

  news: [
    { source: 'Business Standard', title: "BuildINT's Patented IoT solution Revolutionizes Energy Savings and Management for Corporates", url: 'https://www.business-standard.com/content/press-releases-ani/buildint-s-patented-iot-solution-revolutionizes-energy-savings-and-management-for-corporates-123091201217_1.html' },
    { source: 'CB Insights', title: 'BuildINT Specializes in IoT-Based Energy Management Systems', url: 'https://www.cbinsights.com/company/buildint' },
  ],

  industries: [
    ['Government', 'Landmark'], ['Railways', 'TrainFront'], ['Manufacturing', 'Factory'], ['Banking & NBFC', 'Landmark'], ['Commercial', 'Building2'],
    ['Retail', 'ShoppingCart'], ['Education', 'GraduationCap'], ['Health Care', 'HeartPulse'], ['FMCG', 'Package'], ['MNCs', 'Globe'],
  ],
}

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/products', label: 'Products', dropdown: 'products' },
  { to: '/solutions', label: 'Solutions', dropdown: 'solutions' },
  { to: '/case-studies', label: 'Projects' },
  { to: '/csr', label: 'CSR' },
  { to: '/careers', label: 'Careers' },
  { to: '/blog', label: 'Blogs' },
  { to: '/contact', label: 'Contact Us' },
]
