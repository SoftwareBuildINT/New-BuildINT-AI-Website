// Solutions. Sources: BuildINT AI Company Profile (2026) + the previous buildint.ai site.
// `img` = image key in src/assets/img (see config.js). `ill` = illustration fallback.

// The four solutions (client brief, Oct 2026): iBMS powered by Green X, then CCTV, Solar and Access Control.
export const SOLUTIONS = [
  { id: 'ibms', tag: '01 · Powered by Green X', title: 'iBMS', long: 'Intelligent Building Management System', desc: 'Energy, HVAC, lighting, pumps, bills and fire safety, automated by the Green X platform.', ill: 'dash', img: 'photos/controllers', icon: 'Building2' },
  { id: 'cctv', tag: '02 · Security', title: 'Surveillance AI', long: 'AI-Powered Surveillance & Command Center', desc: 'AI video analytics, e-surveillance, iMAXX and a centralized command center.', ill: 'cctv', img: 'photos/cctv-install-height', icon: 'Video' },
  { id: 'solar', tag: '03 · Clean energy', title: 'Solar', long: 'Rooftop Solar with Green X Monitoring', desc: 'Rooftop solar connected to Green X, so generation and consumption sit on one dashboard.', ill: 'solar', img: '', icon: 'Sun' },
  { id: 'access', tag: '04 · Identity', title: 'Access Control', long: 'Biometric & DigiSuraksha Aadhaar', desc: 'Biometric, facial recognition, RFID and Aadhaar-based authentication.', ill: 'turnkey', img: 'photos/face-recognition-entry', icon: 'Fingerprint' },
]

export const SECTIONS = [
  {
    id: 'ibms', sol: 'ibms', group: 'iBMS', chip: 'iBMS', eyebrow: 'Solution 01 · Powered by Green X', title: 'iBMS — Intelligent Building Management System', sub: 'Integrated automation, energy management & smart infrastructure',
    ill: 'dash', img: 'photos/controllers', extraMedia: { img: 'photos/panel-automation', ill: 'office', alt: 'BuildINT automation panels on site' },
    features: { title: 'Key Features', items: ['AI-based building automation', 'Smart access & security', 'Energy & utility management', 'HVAC, lighting & pump control', 'Lift & escalator integration', 'Centralized monitoring dashboard', 'IoT analytics & smart alerts'] },
    value: ['Improved operational efficiency', 'Reduced energy & utility costs', 'Enhanced safety & security', 'Predictive asset maintenance', 'Centralized multi-site management', 'Data-driven decision making', 'Sustainable smart buildings'],
    demos: ['Max Healthcare', 'Railway lighting automation', 'ATM', 'BMS'],
    architecture: true,
  },
  {
    id: 'iems', sol: 'ibms', group: 'iBMS', chip: 'iEMS', eyebrow: 'iBMS · Energy', title: 'i-Energy Management System', sub: 'IoT smart application', ill: 'dash', img: 'old/solution/IEMS',
    intro: 'Achieve your sustainability goals with our cutting-edge analytical platform designed for energy data mining and management. This platform empowers clients with tailored energy consumption reports for both internal purposes and regulatory submissions, optimized energy utilization, seamless monitoring of corporate KPIs, adherence to legal standards, and enhanced building performance.',
    features: { title: 'Key Features', items: [
      'Simplify operations with our 24/7 accessible cloud-based management platform.',
      'Oversee user accounts, allocate sensors and devices, and retrieve operational records instantly.',
      'Leverage AI-powered insights for user behavior analytics and statistics.',
      'Receive alarms and notifications triggered by predefined events.',
      'Enjoy tailored dashboards and customizable reporting functionalities.',
    ] },
  },
  {
    id: 'automation', sol: 'ibms', group: 'iBMS', chip: 'Building Automation', eyebrow: 'iBMS · Automation', title: 'Building Automation', sub: 'Work smarter, not harder', ill: 'office', img: 'old/solution/image004-1024x472',
    intro: 'Work smarter, not harder with the BuildINT Smart Office System. Our advanced IoT solutions are designed to enhance workplace comfort and efficiency, including features like automated thermal management, customizable lighting, facility reservation systems, energy usage analytics, security controls, and much more.',
    features: { title: 'Key Features', items: [
      'Thermal comfort control system',
      'Our smart AI-based engine learns preferences of all office members over time and optimizes office thermal conditions to keep everyone comfortable',
      'Users can easily control AC operations from our SYNCIOT app, adjusting temperature, fan speeds and modes without leaving their seats',
      'Smart scheduling and scene settings',
      'Advanced data analytics',
    ] },
  },
  {
    id: 'smart-office', sol: 'ibms', group: 'iBMS', chip: 'Smart Offices', eyebrow: 'iBMS · Workplace', title: 'Smart Offices', sub: 'Create a comfort environment & reduce carbon emissions', ill: 'smartoffice', img: 'old/solution/solutions-5',
    intro: 'A smart office transcends traditional intelligent buildings by merging human interaction with automation, ensuring a more comfortable, efficient, and sustainable environment. Through a mobile app, employees can easily adjust lighting, temperature, and ventilation to suit their preferences, enhancing well-being and productivity. These systems also optimize energy use, contributing to sustainability goals and a greener future.',
    boxes: [
      { title: 'Comprehensive Security & Safety', items: ['Protect your premises against burglars and accidents with advanced security devices.', 'Receive instant real-time notifications on your phone for unusual activity.'] },
      { title: 'Indoor Environment System', items: ['Personalize your indoor environment for maximum comfort and user preferences.', 'AI engine learns your habits over time and automatically adjusts settings.'] },
    ],
  },
  {
    id: 'iatm', sol: 'ibms', group: 'iBMS', chip: 'iATM', eyebrow: 'iBMS · Banking', title: 'i-Automated Teller Machine', sub: 'iATM automation', ill: 'atm', img: 'photos/atm-kochi', extraMedia: { img: 'old/solution/iATM-FINAL-IMAGE-1536x864', ill: 'atm', alt: 'iATM automation' },
    intro: 'An iEMS can be modified and redesigned for use in ATMs. Here the BiB is used for automating the AC and signage control with inputs from sensors. This helps us reduce energy consumption greatly. Also the ATM machine can be reset remotely and the UPS can also be controlled and kept a check on.',
    spec: [['AC control', 'Sensor-driven automation'], ['Signage', 'Smart scheduling'], ['Remote reset', 'ATM machine, from anywhere'], ['UPS', 'Controlled and monitored'], ['Fire alarm panel', 'Smoke, heat & fire hazard alerts'], ['Uptime', 'Uninterrupted operation, lower power use']],
  },
  {
    id: 'cbms', sol: 'ibms', group: 'iBMS', chip: 'CBMS', eyebrow: 'iBMS · Billing', title: 'Centralised Electricity Bill Management', ill: 'bill', img: 'old/solution/CBM', contain: true,
    intro: 'Introducing our robust platform, empowered with Government Billing API, specifically tailored to provide a seamless user experience in managing electricity bills for multiple locations effortlessly.',
    features: { title: 'Elevate Your Bill Management Experience with BuildINT CBMS', items: [
      'One platform to view & manage all electricity bills.',
      'Get auto notification/alert for bills via Bill API Gateway.',
      'Upload physical bills and convert them to digital format.',
      'Automate payments securely with Integrated Payment API.',
      'Power up your savings: Analyse, Optimize, Pay smart.',
      'One platform to get alerts at your fingertips: Always informed.',
    ] },
    steps: ['Analyse', 'Optimize', 'Pay smart'],
  },
  {
    id: 'ai', sol: 'ibms', group: 'AI', chip: 'AI & ML', eyebrow: 'iBMS · Intelligence', title: 'AI & ML', ill: 'ai', img: 'photos/ai-chip',
    spec: [
      ['Predictive Maintenance', 'ML algorithms analyze sensor data to predict equipment failures, reducing downtime and maintenance costs.'],
      ['Energy Optimization', 'AI-driven analytics optimize energy usage by identifying patterns and suggesting efficient energy distribution.'],
      ['Real-Time Decision Making', 'IoT devices, combined with AI, enable quick responses to changing energy demands, improving grid reliability.'],
      ['Anomaly Detection', 'ML models detect unusual patterns, such as energy theft or system faults, ensuring system integrity.'],
      ['Renewable Integration', 'AI helps manage renewable energy sources like solar and wind by predicting generation patterns and balancing supply and demand.'],
      ['Automation and Control', 'AI-powered IoT systems automate energy management, reducing human intervention and improving efficiency.'],
    ],
  },
  {
    id: 'fire', sol: 'ibms', group: 'Fire', chip: 'Fire & Life Safety', eyebrow: 'iBMS · Life safety', title: 'Fire Systems', sub: 'Detection · Alarm · Protection',
    ill: 'turnkey', img: 'photos/fire-panel', extraMedia: { img: 'photos/fire-alarm-wall', ill: 'turnkey', alt: 'Fire alarm panel installed on site' },
    features: { title: 'Key Features', items: ['Intelligent fire detection', 'Smoke & heat sensors', 'IoT-based fire alarm system', 'Addressable fire control panel', 'Real-time alerts & notifications', 'Emergency evacuation integration', 'Centralized fire monitoring'] },
    value: ['Early fire detection', 'Enhanced life safety', 'Faster emergency response', 'Reduced property damage', 'Regulatory compliance', 'Business continuity', '24×7 safety monitoring'],
  },
  {
    id: 'cctv', sol: 'cctv', group: 'CCTV', chip: 'AI Surveillance', eyebrow: 'Solution 02 · Security', title: 'Surveillance AI — AI-Powered', sub: 'AI-powered surveillance & centralized security monitoring',
    ill: 'cctv', img: 'photos/cctv-install-height', extraMedia: { img: 'photos/night-camera', ill: 'cctv', alt: 'Surveillance camera at night' },
    features: { title: 'Key Features', items: ['AI video surveillance', 'Bullet & PTZ camera integration', 'Centralized command center', 'ANPR & smart vehicle recognition', 'Real-time monitoring & alerts', 'Multi-site surveillance management', 'VMS & IoT integration'] },
    value: ['Enhanced safety & security', 'Faster incident detection', 'Reduced manual monitoring', 'Improved operational visibility', 'Centralized security management', 'Data-driven decision making', 'Scalable surveillance infrastructure'],
    demos: ['UP Police', 'CANPACK CCTV', 'ONGC', 'AI-powered stain detection'],
  },
  {
    id: 'esurveillance', sol: 'cctv', group: 'CCTV', chip: 'E-Surveillance', eyebrow: 'Surveillance · 32-zone', title: 'E-Surveillance & Centralised Monitoring', sub: '32-zone security alert system', ill: 'cctv', img: 'old/CCTV',
    labeled: [
      ['Zone coverage', 'Supports up to 32 zones, accommodating both digital and analog inputs for various sensors like door, vibration, smoke, and temperature sensors.'],
      ['Alerts and notifications', 'Provides instant alerts via hooters, SMS, calls, or CMS packets for real-time monitoring.'],
      ['Control and customization', 'Includes multiple output control relays for managing devices like lights and air conditioners.'],
      ['User access', 'Allows multiple user codes and partitions for secure and flexible access.'],
      ['Power management', 'Monitors power sources like EB, UPS, and battery conditions, with alerts for low battery.'],
      ['Connectivity', 'Supports Ethernet, MODBUS communication, and wireless options for seamless integration.'],
      ['Additional features', 'Includes interconnected smoke detector support and compatibility with smart hubs.'],
    ],
  },
  {
    id: 'imaxx', sol: 'cctv', group: 'CCTV', chip: 'iMAXX', eyebrow: 'Surveillance · Device', title: 'iMAXX', sub: 'Total control at your fingertips', ill: 'imaxx', img: 'old/solution/imax', contain: true,
    intro: 'Designed for maximum security, real-time monitoring, and energy efficiency, i-Maxx ensures total control at your fingertips.',
    spec: [['4-Cam Surveillance', 'Secure local/cloud storage'], ['Smart Sensors', 'Fire, smoke, motion, vibration detection'], ['Instant Alerts', 'Intrusion, glass break, panic switch'], ['Energy Monitoring', 'Tracks power, ACs, lights, routers'], ['Seamless Integration', 'Modbus, TCP/IP, MQTT, SIA-DCS'], ['24/7 Power Backup', 'Industrial router, 18AH 12V battery']],
  },
  {
    id: 'solar', sol: 'solar', group: 'Solar', chip: 'Solar', eyebrow: 'Solution 03 · Clean energy', title: 'Solar — Rooftop Power, Tracked by Green X', sub: 'Generate, monitor and optimise on one platform', ill: 'solar', img: '',
    intro: 'Put your roof to work. Rooftop solar plants for offices, campuses, factories and bank branches, connected to the Green X platform so generation, consumption and savings sit side by side.',
    features: { title: 'What You Get', items: ['Site survey and system design', 'Rooftop solar installation and commissioning', 'Live generation monitoring on Green X', 'Generation vs consumption analytics', 'Alerts when output drops', 'Carbon footprint tracking'] },
    value: ['Lower grid dependence', 'Reduced electricity bills', 'Progress on ESG and net-zero goals', 'One dashboard for solar and building energy'],
  },
  {
    id: 'access', sol: 'access', group: 'Access', chip: 'Access Control', eyebrow: 'Solution 04 · Identity', title: 'Access Control — Biometric & DigiSuraksha Aadhaar', sub: 'Identity management & secure access solutions',
    ill: 'turnkey', img: 'photos/face-recognition-entry', extraMedia: { img: 'photos/aadhaar-auth', ill: 'turnkey', alt: 'Aadhaar-based authentication' },
    features: { title: 'Key Features', items: ['Biometric & facial recognition', 'RFID / smart card authentication', 'Aadhaar-based authentication', 'Visitor management system', 'Door access & time attendance', 'Centralized access monitoring', 'Real-time access alerts'] },
    value: ['Enhanced security & compliance', 'Authorized access control', 'Improved workforce management', 'Reduced unauthorized entry', 'Centralized multi-site management', 'Faster identity verification', 'Increased operational efficiency'],
  },
  {
    id: 'turnkey', sol: 'delivery', group: 'Turnkey', chip: 'Turnkey', eyebrow: 'How we deliver', title: 'Turnkey Projects', ill: 'turnkey', img: 'old/solution/turnkey',
    intro: 'Every BuildINT solution can be delivered turnkey: design, supply, installation, integration and maintenance of CCTV, building management, access control and fire safety systems, by one accountable team.',
    boxes: [
      { title: 'CCTV Systems', items: ['High-definition analog and IP cameras.', 'Video management software for real-time monitoring and recording.'] },
      { title: 'Building Management Systems', items: ['Integration of HVAC, lighting, and energy management systems.', 'Centralized control for efficient building operations.', 'Smart automation for energy savings and operational efficiency.'] },
      { title: 'Access Control Systems', items: ['Door controllers and card readers for secure entry.', 'Magnetic door locks and push buttons.', 'Software for managing user access and permissions.'] },
      { title: 'Fire Safety Systems', items: ['Fire alarms with smoke, heat, and beam detectors.', 'Fire suppression systems, including chemical-based solutions.', 'Voice evacuation systems and manual call points.'] },
    ],
  },
]

export const USP = [
  { icon: 'Plug', text: 'Minimum wiring & plug-n-play solution' },
  { icon: 'Leaf', text: 'Limiting carbon emission' },
  { icon: 'Sprout', text: 'We follow ESG strategies' },
  { icon: 'CloudCog', text: 'IoT in-built network & secure cloud-based technology' },
  { icon: 'Timer', text: 'Modern tech digital timer with add-on benefits' },
  { icon: 'Building2', text: 'No civil and modification work required' },
  { icon: 'MonitorCheck', text: 'Integration with existing IT system not required' },
]

// Traditional building vs AI-powered smart building (company profile, "ISUP" slide).
export const TRANSFORM = {
  challenges: [['Zap', 'High energy consumption'], ['Users', 'Manual building operations'], ['Monitor', 'No real-time monitoring'], ['Wrench', 'Reactive maintenance'], ['EyeOff', 'Security blind spots'], ['Boxes', 'Multiple standalone systems'], ['IndianRupee', 'High operational cost'], ['BarChart3', 'No data-driven decisions']],
  solutions: ['AI energy optimization & savings', 'Intelligent BMS automation', '24×7 real-time monitoring & alerts', 'Predictive maintenance & fault detection', 'AI CCTV & video analytics', 'Integrated & unified platform', 'Reduced OPEX & energy bills', 'Live dashboards & data-driven decisions'],
  outcomes: [['Leaf', 'Greener buildings'], ['TrendingDown', 'Lower costs, higher efficiency'], ['ShieldCheck', 'Safe, secure & compliant'], ['BrainCircuit', 'AI-driven intelligence']],
}
