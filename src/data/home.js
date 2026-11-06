// Home page content: explainer film chapters, platform hub, solution tabs, why-BuildINT tabs, industries.
// Sources: BuildINT AI Company Profile (2026), Product Brochure, previous buildint.ai.

// `on` = which parts of the building light up in the film. `dur` = seconds.
export const CHAPTERS = [
  { id: 'platform', label: 'Platform', dur: 5, on: ['all'], kicker: 'The Green X Platform', title: 'Every Building System, Connected',
    text: 'Green X devices, cameras and access systems across your sites report to one intelligent cloud.', metric: '15K+ sites deployed', products: [] },
  { id: 'energy', label: 'Energy', dur: 6, on: ['ac', 'neon', 'air', 'bigio', 'meter', 'sign', 'atm'], kicker: 'iBMS · Green X 500 + 200', title: 'AC Runs Only as Much as It Needs To',
    text: 'Green X 500 (NEON) adjusts temperature by occupancy and schedule. Green X 200 (BigIO) reads every meter and UPS.', metric: 'Up to 30% lower HVAC energy', products: ['green-x-500', 'green-x-200'] },
  { id: 'lighting', label: 'Lighting', dur: 6, on: ['lights', 'libi', 'bibug', 'people'], kicker: 'iBMS · Green X 100 + 1000', title: 'Lights Follow People, Not Switches',
    text: 'Green X 1000 (Bi-Bug) senses motion and air quality. Green X 100 (LiBi) switches, schedules and meters the lighting.', metric: 'Empty rooms switch off automatically', products: ['green-x-100', 'green-x-1000'] },
  { id: 'cctv', label: 'Surveillance AI', dur: 6, on: ['cam', 'person'], kicker: 'Surveillance AI', title: 'Cameras That Understand What They See',
    text: 'AI video analytics detect people and vehicles and alert your command center in real time.', metric: '24×7 centralized monitoring', products: [] },
  { id: 'solar', label: 'Solar', dur: 6, on: ['solar', 'sun', 'inverter'], kicker: 'Solar · Rooftop', title: 'Your Roof Makes Your Power',
    text: 'Rooftop solar feeds the building, and Green X tracks generation next to consumption on one dashboard.', metric: 'Clean energy, tracked live', products: [] },
  { id: 'access', label: 'Access', dur: 6, on: ['scanner', 'door', 'person'], kicker: 'Access Control · DigiSuraksha', title: 'The Right People, Through the Right Doors',
    text: 'Facial recognition, RFID and Aadhaar-based authentication, with live access logs.', metric: 'Biometric · RFID · Aadhaar', products: [] },
  { id: 'command', label: 'Command', dur: 7, on: ['net', 'cloud', 'dash'], kicker: 'Command · Green X Cloud', title: 'One Dashboard for Every Site',
    text: 'Energy, solar, bills, alerts and cameras from every location, analysed by AI on one screen.', metric: 'iBMS · Solar · CCTV · Access', products: [] },
]

// Platform hub nodes (clockwise from top).
export const HUB_NODES = [
  { id: 'gx100', name: 'Green X 100', role: 'LiBi · Lighting control', img: 'products/libi', to: '/products/green-x-100', desc: 'Relay control, holiday and custom schedules, motion automation and single-phase metering up to 60A.' },
  { id: 'cctv', name: 'CCTV', role: 'AI video surveillance', icon: 'Video', to: '/solutions/cctv', desc: 'Bullet & PTZ cameras, ANPR and AI video analytics streamed to a centralized command center.' },
  { id: 'gx200', name: 'Green X 200', role: 'BigIO · IoT gateway', img: 'products/bigio', to: '/products/green-x-200', desc: 'Collects data from Modbus smart meters, UPS and industrial equipment and sends it securely to the cloud.' },
  { id: 'solar', name: 'Solar', role: 'Rooftop generation', icon: 'Sun', to: '/solutions/solar', desc: 'Rooftop solar generation tracked live next to building consumption.' },
  { id: 'gx500', name: 'Green X 500', role: 'NEON · AC & environment', img: 'products/neon', to: '/products/green-x-500', desc: 'Auto temperature, motion detection and scheduling for every AC, with 3-phase energy monitoring.' },
  { id: 'access', name: 'Access', role: 'Biometric & Aadhaar', icon: 'Fingerprint', to: '/solutions/access', desc: 'Facial recognition, RFID cards and Aadhaar-based authentication with visitor management.' },
  { id: 'bibug', name: 'Green X 1000', role: 'Bi-Bug · Multi-sensor', img: 'products/bibug', to: '/products/green-x-1000', desc: 'Temperature, humidity, motion and indoor air quality sensing with OTA firmware updates.' },
  { id: 'cbms', name: 'CBMS', role: 'iBMS · Electricity bills', icon: 'ReceiptIndianRupee', to: '/solutions/cbms', desc: 'Every electricity bill across every location, fetched via the Government Billing API and paid on one platform.' },
]

export const SOLUTION_TABS = [
  { id: 'ibms', title: 'iBMS', short: 'Powered by the Green X platform', img: 'photos/panel-automation', ratio: '1100/763', to: '/solutions/ibms',
    text: 'AI-based building automation with energy & utility management, HVAC, lighting & pump control, bill management and fire safety, running on Green X 100, 200, 500 and 1000.',
    points: ['Reduced energy & utility costs', 'Predictive asset maintenance', 'Centralized multi-site management'] },
  { id: 'cctv', title: 'Surveillance AI', short: 'Cameras with AI analytics', img: 'photos/canpack-team', ratio: '1200/602', to: '/solutions/cctv',
    text: 'AI video surveillance with bullet & PTZ cameras, ANPR and a centralized command center, deployed for UP Police, ONGC and CANPACK.',
    points: ['Faster incident detection', 'Reduced manual monitoring', 'Scalable surveillance infrastructure'] },
  { id: 'solar', title: 'Solar', short: 'Rooftop power, tracked by Green X', img: '', ratio: '16/10', to: '/solutions/solar',
    text: 'Rooftop solar for offices, campuses, factories and branches, connected to Green X so generation, consumption and savings sit on one dashboard.',
    points: ['Lower grid dependence', 'Reduced electricity bills', 'Progress on ESG goals'] },
  { id: 'access', title: 'Access Control', short: 'Biometric & DigiSuraksha Aadhaar', img: 'photos/face-recognition-entry', ratio: '1100/616', to: '/solutions/access',
    text: 'Identity management with biometric and facial recognition, RFID cards, Aadhaar-based authentication, visitor management and time attendance.',
    points: ['Authorized access only', 'Faster identity verification', 'Improved workforce management'] },
]

export const WHY = [
  { id: 'plug', label: 'Plug-and-Play Setup', icon: 'Plug', img: 'ai/plug', title: 'Installs in Hours, Not Weeks',
    text: 'BuildINT devices fit into existing panels with minimum wiring. No civil or modification work, and no changes to your existing IT systems.',
    points: ['Minimum wiring', 'No civil or modification work', 'Works alongside existing IT'] },
  { id: 'india', label: 'Make in India', icon: 'Factory', img: 'products/lineup', title: 'Bharat Ka Apna Building Intelligence',
    text: 'The Green X series (100, 200, 500 and 1000) is designed and built in India by BuildINT AI, backed by a patent and Government of India start-up recognition.',
    points: ['Indigenous hardware', 'Patented IoT solution', 'Start-up India recognised'] },
  { id: 'scale', label: 'Scales PAN India', icon: 'Globe', img: 'presence/india-map', title: '15,000+ Sites, 300+ Engineers',
    text: 'From a single office to a national ATM network, our engineers deploy and maintain sites across India, with teams in Mumbai, Lucknow, Hyderabad, Gurugram and Dubai.',
    points: ['300+ engineers PAN India', 'Multi-site dashboards', 'Centralized management'] },
  { id: 'security', label: 'Data Security', icon: 'ShieldCheck', img: 'photos/certificates', title: 'Certified and Secure by Design',
    text: 'Secure cloud connectivity, ISO/IEC 27001:2022 information security and ISO 9001:2015 quality management.',
    points: ['ISO/IEC 27001:2022', 'ISO 9001:2015', 'Secure cloud platform'] },
  { id: 'support', label: '24×7 Support', icon: 'Users', img: 'presence/lucknow-tech-center', title: 'An AI Tech Center That Never Sleeps',
    text: 'Our Lucknow AI Tech Center monitors sites around the clock, with remote assistance, troubleshooting, software updates and maintenance.',
    points: ['24×7 safety monitoring', 'Remote troubleshooting', 'Ongoing maintenance'] },
]

export const INDUSTRY_TILES = [
  { name: 'Banking & NBFC', img: 'photos/atm-kochi', text: 'ATMs, branches and e-surveillance' },
  { name: 'Health Care', img: 'old/max', text: 'HVAC optimization and air quality' },
  { name: 'Commercial', img: 'presence/mumbai-office', text: 'Smart offices and building automation' },
  { name: 'Manufacturing', img: 'photos/industry-night', text: 'Energy, assets and fire safety' },
  { name: 'Government & Railways', img: 'photos/cctv-install-height', text: 'City surveillance and lighting automation' },
  { name: 'Education', img: 'old/education', text: 'Campuses, labs and access control' },
]
