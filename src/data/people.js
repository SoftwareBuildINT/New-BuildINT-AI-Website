// Client wall (company profile, "Trusted by Leading Organizations").
export const CLIENTS = [
  ['Indian Railways', 'indian-railways'], ['UP Police', 'up-police'], ['IIT Bombay', 'iit-bombay'], ['ONGC', 'ongc'], ['Adani', 'adani'], ['epay', 'epay'],
  ['Max Healthcare', 'max-healthcare'], ['Hitachi Payment Services', 'hitachi-payment'], ['ICICI Prudential Life', 'icici-prudential'], ['Kotak Mahindra Bank', 'kotak-bank'], ['Kotak Life Insurance', 'kotak-life'], ['Varachha Co-op Bank, Surat', 'varachha-bank'], ['DBS', 'dbs'],
  ['CP Plus', 'cp-plus'], ['Euronet', 'euronet'], ['L&T Finance', 'lt-finance'], ['CANPACK', 'canpack'], ['SMFG', 'smfg'], ['Muthoot Housing Finance', 'muthoot'], ['Podar International School', 'podar'],
  ['Sterling', 'sterling'], ['Deloitte', 'deloitte'], ['Goldman Sachs', 'goldman-sachs'], ['Diebold Nixdorf', 'diebold-nixdorf'], ['Tridium', 'tridium'], ['WNS', 'wns'],
].map(([name, key]) => ({ name, logo: `clients/${key}` }))

export const PARTNERS = [
  ['CP Plus', 'old/cpplus'], ['Voltas', 'old/voltas'], ['Blue Star', 'old/bluestar'], ['Daikin', 'old/dakin'], ['Tridium', 'old/tridium'], ['Microsoft', 'old/microsoft'],
].map(([name, logo]) => ({ name, logo }))

export const TESTIMONIALS = [
  { org: 'L&T Finance', initials: 'LT', logo: 'old/LandT', rating: '4.8', text: 'When we were looking to strengthen our CCTV and E-surveillance systems, BuildINT came highly recommended—and they didn’t disappoint. From the start, their team was responsive, knowledgeable, and easy to work with. The new reconciliation platform they set up runs smoothly, and any issues are handled quickly. It’s been a really solid partnership.' },
  { org: 'Diebold Nixdorf', initials: 'DN', logo: 'old/Diebold', rating: '4.9', text: 'We’ve been working with BuildINT for over two years now, and they’ve been a reliable partner from day one. They help us manage ATM site security, surveillance, and even our AC systems. What stands out most is how proactive and consistent their support is—we never feel like we’re chasing them down. It’s a rare find in the industry.' },
  { org: 'Hitachi Payment Services', initials: 'H', logo: 'old/HITACHI-logo', rating: '4.9', text: 'BuildINT helped us roll out thousands of CCTV cameras across our ATM sites—no small task—and handled it with real professionalism. They also built out our monitoring platform and take care of regular maintenance. We’ve seen a noticeable improvement in how smoothly things run, and their team is always just a call away. They’ve earned our trust.' },
  { org: 'Thakur College', initials: 'TC', logo: 'old/Thakur-log', rating: '4.9', text: 'Working with BuildINT has been a great experience. They really took the time to understand what we needed and delivered a tech solution that made a real difference to our daily operations. Their team is professional, attentive, and easy to communicate with—which makes all the difference.' },
  { org: 'R.C. Patel Institute of Technology', initials: 'RC', logo: 'old/ses', rating: '4.9', text: 'We truly appreciate BuildINT for giving our students a real chance to grow. Through their internship program, our students got hands-on exposure to the tech industry and built confidence in their skills. It’s rare to find a company so committed to mentoring young talent.' },
]

export const FOUNDER = {
  name: 'Captain Amit Rai', role: 'Founder & Managing Director', photo: 'team/amit-rai',
  linkedin: 'https://www.linkedin.com/in/captain-amit-rai-710b8a10',
  bio: [
    "Captain Amit Rai is a visionary entrepreneur leading BuildINT's mission to transform buildings through AI, IoT, and intelligent automation. With expertise in business strategy, innovation, and operational excellence, he has built a company focused on delivering smart, connected, and sustainable infrastructure.",
    'Under his leadership, BuildINT continues to empower organizations with intelligent technologies that improve efficiency, optimize energy usage, enhance security, and drive digital transformation.',
  ],
}

// Leadership team (company profile, 2026)
export const LEADERSHIP = [
  { name: 'Hari Shahi', role: 'Chief Executive Officer', photo: 'team/hari', linkedin: 'https://www.linkedin.com/in/hari-shahi/', bio: 'A business growth strategist with 40+ years of corporate and entrepreneurial experience, he has led large-scale businesses and teams of 9,000+ professionals. An executive coach, mentor and qualified independent director, he advises founders, CEOs and leadership teams on growth, strategy, transformation and governance.' },
  { name: 'Vaibhav Mogal', role: 'Strategic Chief Financial Officer', photo: 'team/vaibhav', linkedin: 'https://www.linkedin.com/in/vaibhav-mogal-799b5b253', bio: 'A strategic business leader with 14+ years of experience in finance, corporate strategy, business development, and institutional relations. As CFO at BuildINT, he leads financial strategy, fundraising, strategic partnerships, and business expansion, driving sustainable growth and long-term value.' },
  { name: 'Preetam Mahadik', role: 'Head – Enterprise IT & Operations', photo: 'team/preetam', linkedin: 'https://www.linkedin.com/in/preetam-mahadik-43168146/', bio: 'An Enterprise IT and Operations leader with 27+ years driving large-scale infrastructure, cybersecurity and strategic sourcing across BFSI, manufacturing and technology. He builds high-performance teams, optimises CAPEX/OPEX and delivers resilient IT, cost efficiency and operational excellence.' },
]

// From the previous website — confirm these roles with BuildINT before launch.
export const BOARD = [
  { name: 'Captain Amit Rai', role: 'Founder & Managing Director', photo: 'team/amit-rai', linkedin: 'https://www.linkedin.com/in/captain-amit-rai-710b8a10',
    bio: "A former Indian Army officer turned entrepreneur, he founded BuildINT in 2019 with a mission to make every building smarter, safer and greener. Bringing military discipline, leadership and a problem-solving mindset to business, he has grown BuildINT into an AI and IoT company powering 15,000+ sites for 52+ clients across India." },
  { name: 'Payal Bharadwaj', role: 'Director – HR & Finance', photo: 'team/payal', linkedin: 'https://www.linkedin.com/in/payal-bharadwaj-socedu/', bio: 'Leads people and finance, fostering a culture of growth, inclusivity, and employee engagement with a deep focus on talent management and organizational development.' },
]

export const CASES = [
  { title: 'BFSI', result: 15, resultPrefix: '10–', resultLabel: 'Savings, scalable across sites', ill: 'bank', img: 'photos/panel-automation',
    challenge: 'Companies needed a reliable, scalable IoT-powered security and fire safety system to protect assets and personnel across multiple sites. They faced challenges in real-time sensor monitoring, automated incident alerts, response coordination, and seamless integration while ensuring compliance with safety regulations.',
    solution: ['Enhanced security and real-time monitoring', 'Improved fire safety compliance across locations', 'Scalable solution for future site expansions and savings up to 10–15%'] },
  { title: 'Commercial Building', result: 20, resultLabel: 'Energy cost reduction', ill: 'office', img: 'old/case-study1',
    challenge: 'Our client, a trusted property developer, has been increasingly prioritizing sustainability, health, and well-being in the workplace. They sought a solution to enhance employee comfort and create a healthier indoor environment while maintaining energy efficiency and operational excellence.',
    solution: ['Increased security efficiency, reducing unauthorized access risks.', 'Energy cost reduction by 20%, improving financial sustainability.', 'In collaboration with our team, they implemented our Commercial Building System to elevate employee health and comfort.'] },
  { title: 'Hospitals and Health Care', result: 30, resultLabel: 'Lower HVAC energy consumption', ill: 'hospital', img: 'old/max',
    challenge: 'Hospitals faced high HVAC energy costs, inefficient heat pump usage, and the need to improve indoor air quality to ensure patient safety. They required a solution to optimize energy consumption while maintaining a healthy and comfortable environment.',
    solution: ['Implemented a comprehensive HVAC optimization strategy to reduce energy costs and improve efficiency.', 'Achieved a 30% reduction in HVAC energy consumption, lowering operational costs.', 'Improved indoor air quality with UV filtration, ensuring a safer environment for patients.'] },
]

// Project photos from the field (company profile).
export const FIELD = [
  { img: 'photos/atm-kochi', label: 'ATM site automation · Kochi, Kerala', tag: 'iBMS' },
  { img: 'photos/canpack-team', label: 'CANPACK CCTV deployment team', tag: 'CCTV' },
  { img: 'photos/panel-automation', label: 'Electrical panel automation', tag: 'iBMS' },
  { img: 'photos/cctv-install-height', label: 'Camera installation at height', tag: 'CCTV' },
  { img: 'photos/fire-alarm-wall', label: 'Fire alarm panel on site', tag: 'Fire' },
  { img: 'photos/access-control-door', label: 'Card-based access control', tag: 'Access' },
  { img: 'photos/pump-room-panel', label: 'Pump room control panel', tag: 'iBMS' },
  { img: 'photos/night-camera', label: 'Night-time surveillance', tag: 'CCTV' },
  { img: 'photos/device-install-kochi', label: 'Controller installation · Kochi, Kerala', tag: 'iBMS' },
]

export const FAQ = [
  ['How can BuildINT solutions improve operational efficiency?', 'BuildINT automates energy management, surveillance, and bill tracking, reducing manual efforts and enabling businesses to focus on core operations while cutting costs.'],
  ['What industries can benefit from BuildINT solutions?', 'Our solutions cater to various industries, including banking, commercial offices, hospitals, and smart infrastructure projects, helping businesses optimize energy and security.'],
  ['How does BuildINT contribute to sustainability?', 'Our energy management solutions reduce energy wastage, optimizing consumption and promoting eco-friendly operations.'],
  ['How does BuildINT help businesses optimize energy consumption?', 'BuildINT leverages IoT-driven analytics to monitor, control, and optimize energy usage in real time, reducing wastage, lowering costs, and improving sustainability while ensuring seamless automation.'],
  ['What products does BuildINT make?', 'BuildINT AI designs its own IoT hardware in India, sold as the Green X series: Green X 100 (LiBi lighting controller), Green X 200 (BigIO IoT gateway & DDC controller), Green X 500 (NEON AC & environment controller) and Green X 1000 (Bi-Bug multi-sensor). Together they form the Green X Platform behind BuildINT iBMS.'],
  ['Is technical support available?', 'Yes, we offer 24/7 technical support to ensure smooth operation. Our team provides remote assistance, troubleshooting, and guidance to help clients maximize their system’s efficiency.'],
  ['How does BuildINT contribute to energy savings?', 'Our solutions, such as iEMS and iATM, monitor and optimize energy consumption using real-time analytics, AI, and automation, helping businesses achieve up to 15% energy savings.'],
  ['What is iATM, and why is it important?', 'iATM is an energy optimization and monitoring system for ATMs, ensuring uninterrupted operation while reducing power consumption.'],
  ['How can I get started with BuildINT solutions?', 'Simply contact us through our website or request a demo. Our team will assess your requirements and suggest the best-fit solution for your business.'],
  ['What support does BuildINT provide after implementation?', 'We offer technical support, software updates, and system maintenance to ensure seamless operation and long-term efficiency.'],
  ['Does BuildINT provide fire alarm systems for ATMs?', 'Yes, we integrate fire alarm panels into our iATM system to detect smoke, heat, and fire hazards, ensuring instant alerts and safety measures.'],
]

export const ROLES = ['Project Manager', 'Site Engineer', 'Software Developers']
