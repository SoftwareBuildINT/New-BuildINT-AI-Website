// BuildINT AI hardware. Source: BuildINT AI Product Brochure.
// Devices are sold as the Green X series (see SERIES below).
const DEVICE_LIST = [
  {
    id: 'libi', name: 'LiBi™', kind: 'Smart lighting controller', title: 'Smart IoT-Enabled Lighting Controller', img: 'products/libi', icon: 'Lightbulb',
    tagline: 'Smarter lighting. Better efficiency.',
    overview: 'LiBi delivers intelligent lighting control with scheduling, motion-based automation and energy monitoring.',
    features: ['Smart relay control', 'Dynamic scheduling', 'Motion-based lighting automation', 'Single-phase energy monitoring', 'MQTT/TCP IoT connectivity', 'Manual override', 'Peripheral integration'],
    applications: ['Office & commercial lighting', 'Industrial lighting management', 'Smart homes & campuses', 'Parking & corridor automation', 'Street & public lighting systems'],
    specs: [['Control Type', 'Relay-based'], ['Network Communication', 'Wi-Fi'], ['Scheduling', 'Regular, Holiday, Custom'], ['Sensor Inputs', 'Motion (via peripheral)'], ['Voltage Measurement', 'Single-phase (230V AC)'], ['Current Measurement', 'Up to 60A (True RMS)'], ['Control Outputs', '1 Relay'], ['Operating Voltage', '12V 1A'], ['Power Supply', '230V AC ±10%, 50Hz'], ['Mounting', 'DIN Rail / Wall Mount'], ['Protection', 'Overcurrent, Surge, Overvoltage']],
  },
  {
    id: 'bigio', name: 'BigIO', kind: 'I/O expansion & integration device', title: 'Intelligent IoT Gateway & DDC Controller', img: 'products/bigio', icon: 'Router',
    tagline: 'Connect. Control. Analyze.',
    overview: 'BigIO is an intelligent IoT gateway developed by BuildINT for data acquisition and remote monitoring. It collects data from Modbus-enabled devices such as smart meters, UPS systems and industrial equipment, and securely sends it to the cloud for real-time monitoring and analytics.',
    features: ['Modbus data collection', 'Secure cloud connectivity', 'IoT-ready architecture', 'Energy monitoring', 'Asset monitoring', 'Plug-and-play setup', 'Real-time data transmission', 'Multi-protocol support'],
    applications: ['Smart meter data acquisition', 'UPS & asset monitoring', 'Industrial equipment monitoring', 'Multi-site energy visibility', 'Cloud-connected IoT deployments', 'Building automation integration', 'Facility management systems', 'Smart city & infrastructure projects'],
    capabilities: [['Field data', 'Modbus-enabled devices'], ['Connectivity', 'Secure cloud communication'], ['Monitoring', 'Real-time remote visibility'], ['Analytics', 'Energy & asset insights'], ['Architecture', 'IoT-ready gateway layer'], ['Deployment', 'Plug-and-play setup']],
  },
  {
    id: 'neon', name: 'NEON', kind: 'AC control for a smarter tomorrow', title: 'Intelligent IoT-Based AC & Environment Controller', img: 'products/neon', icon: 'AirVent',
    tagline: 'Adaptive comfort. Lower energy waste.',
    overview: 'Smart AC control that combines automation, environmental sensing and energy optimization.',
    features: ['Auto temperature adjustment', 'Motion detection', 'Custom scheduling', 'Hybrid cloud connected/local', 'Real-time alerts', 'Analytics-ready'],
    applications: ['Offices', 'Hotels', 'Schools', 'Commercial buildings', 'Retrofit AC systems', 'EMS/BMS integration'],
    specs: [['Processor', 'ESP32 S3'], ['Connectivity', 'Wi-Fi 2.4GHz, RS485 (Modbus RTU)'], ['Control Interfaces', 'IR, Relay, Modbus'], ['Energy Monitoring', '3-phase voltage & current'], ['Peripheral Interface', 'MQTT, TCP'], ['Power Supply', '12V DC'], ['Operating Temperature', '-10°C to +60°C']],
  },
  {
    id: 'bibug', name: 'Bi-Bug', kind: 'Multi-sensor peripheral node', title: 'Compact Multi-Sensor Peripheral Device', img: 'products/bibug', icon: 'Radar',
    tagline: 'Flexible sensing for intelligent environments.',
    overview: 'Bi-Bug is a versatile peripheral node for multi-sensor integration, signal processing and reliable communication.',
    features: ['Multi-sensor integration', 'MQTT/TCP communication', 'OTA firmware updates', 'Two-way Wi-Fi communication', 'Dynamic sensor data processing', 'Motion detection interrupt handling', 'Environmental calibration'],
    applications: ['Smart building environment monitoring', 'Industrial sensing & control systems', 'IoT-based research & experimentation', 'Remote telemetry', 'Sensor fusion & dynamic automation'],
    specs: [['Microcontroller', 'ESP8266'], ['Power Supply', '5V DC input'], ['Communication Interfaces', 'MQTT/TCP'], ['Sensors Supported', 'Temperature, Humidity, Motion, IAQ'], ['Firmware Update', 'OTA update'], ['Operating Voltage', '3.3V logic level, 5V tolerant protected inputs']],
  },
]

export const DEVICES = Object.fromEntries(DEVICE_LIST.map((d) => [d.id, d]))

// Green X product series (client brief, Oct 2026). Each series is one or more devices.
export const SERIES = [
  { id: 'green-x-100', model: '100', name: 'Green X 100', device: 'LiBi', devices: ['libi'], img: 'products/libi', solution: 'ibms',
    kind: 'Smart lighting controller', title: 'Smart IoT-Enabled Lighting Controller', tagline: DEVICES.libi.tagline,
    overview: 'Green X 100 is powered by LiBi: intelligent lighting control with scheduling, motion-based automation and single-phase energy monitoring.' },
  { id: 'green-x-200', model: '200', name: 'Green X 200', device: 'BigIO', devices: ['bigio'], img: 'products/bigio', solution: 'ibms',
    kind: 'IoT gateway & DDC controller', title: 'Intelligent IoT Gateway & DDC Controller', tagline: DEVICES.bigio.tagline,
    overview: 'Green X 200 is powered by BigIO: an IoT gateway that collects data from Modbus smart meters, UPS systems and industrial equipment and sends it securely to the Green X cloud.' },
  { id: 'green-x-500', model: '500', name: 'Green X 500', device: 'NEON', devices: ['neon'], img: 'products/neon', solution: 'ibms',
    kind: 'AC & environment controller', title: 'Intelligent IoT-Based AC & Environment Controller', tagline: DEVICES.neon.tagline,
    overview: 'Green X 500 is powered by NEON: smart AC control that combines automation, environmental sensing and energy optimization. It is the heart of BuildINT iBMS.' },
  { id: 'green-x-1000', model: '1000', name: 'Green X 1000', device: 'Bi-Bug', devices: ['bibug'], img: 'products/bibug', solution: 'ibms',
    kind: 'Multi-sensor peripheral node', title: 'Compact Multi-Sensor Peripheral Device', tagline: DEVICES.bibug.tagline,
    overview: 'Green X 1000 is powered by Bi-Bug: a versatile sensor node for temperature, humidity, motion and indoor air quality, with OTA firmware updates.' },
]

// Everything that lists "products" uses the series.
export const PRODUCTS = SERIES
export const deviceIdToSeries = (deviceId) => SERIES.find((s) => s.devices.includes(deviceId))

export const PILLARS = [
  ['Leaf', 'Energy efficiency'], ['Settings', 'Automation simplified'], ['BarChart3', 'Data-driven intelligence'], ['ShieldCheck', 'A sustainable tomorrow'],
]

// iBMS architecture: how Green X devices reach the cloud (company profile).
export const ARCHITECTURE = {
  flow: [
    'Green X devices (100 · LiBi, 200 · BigIO, 500 · NEON, 1000 · Bi-Bug) capture live sensor & meter data',
    'Router provides secure on-site connectivity to the cloud',
    'The Green X cloud platform runs AI analytics, alerting & multi-site aggregation',
    'Dashboard surfaces live status, alerts & historical trends to operators',
  ],
  capabilities: [
    ['iEMS', 'real-time energy monitoring & analytics'],
    ['CBMS', 'automated billing with improved accuracy'],
    ['Predictive maintenance', '& fault detection'],
    ['Multi-site', 'centralized dashboard'],
    ['AI-driven', 'carbon footprint tracking'],
  ],
}
