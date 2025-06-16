export interface ProjectData {
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: readonly string[];
  features: readonly string[];
  myTasks?: readonly string[];  // 🔧 ADD: Add myTasks field
  images: readonly string[];
  githubUrl: string;
  liveUrl: string;
  duration: string;
  teamSize: string;
  status: string;
}

export const projectsData = {
  "smart-traffic-light": {
    title: "Smart Home Automation",
    category: "Electronics",
    description: "ESP32-based home automation prototype for environmental monitoring and control",
    longDescription: "This project develops a smart home automation prototype using ESP32 microcontroller to automatically monitor and control environmental conditions. The system is designed to enhance comfort and energy efficiency by regulating temperature, humidity, and room lighting. The system utilizes DHT22 sensor for measuring temperature and humidity, PIR sensor for human motion detection, and LDR sensor for light level detection. Data from all three sensors is processed in real-time to control fans, bathroom lights, and terrace lights through relay modules. Lights and fans are activated automatically according to needs, creating an energy-efficient and environmentally friendly system. With microcontroller-based technology integration and synchronized automatic responses, this project becomes a practical solution for creating smart, comfortable, and energy-efficient spaces.",
    technologies: ["ESP32", "DHT22 Sensor", "PIR Sensor", "LDR Sensor", "Relay Modules", "Arduino IDE", "C++", "Real-time Processing"] as const,
    features: ["Automatic Temperature Control", "Motion Detection", "Light Level Sensing", "Energy Efficiency", "Real-time Environmental Monitoring", "Automated Lighting System"] as const,
    myTasks: [
      "Designed and assembled wiring systems for electronic components of the project",
      "Developed and built sensor-based home automation system to automatically monitor and control room environmental conditions", 
      "Programmed integration of DHT22, LDR, and PIR sensors for temperature, humidity, lighting control, and human motion detection"
    ] as const,
    images: [
      "./images/project/Lampu Lalu Lintas Cerdas Berbasis YOLO/project-traffic-light.jpeg",
      "./images/project/Lampu Lalu Lintas Cerdas Berbasis YOLO/tf1.png",
      "./images/project/Lampu Lalu Lintas Cerdas Berbasis YOLO/tf2.png"
    ] as const,
    githubUrl: "https://github.com/yourusername/smart-home-iot",
    liveUrl: "https://smart-home-demo.com",
    duration: "2 months",
    teamSize: "3 people",
    status: "Completed"
  },
  "robotics-project": {
  title: "Line Following Robot",
  category: "Robotics", 
  description: "Autonomous line following robot with modular design and adaptive obstacle handling",
  longDescription: "This line follower robot features a modular design with a head and two body segments, using Arduino Nano as the controller, photodiodes as sensors, and DC motors as actuators. The system incorporates a CD4051BE multiplexer for I/O pin efficiency and an OLED display supporting three modes: start, settings for sensor calibration, and pause for debugging. Powered by a 2-cell LiPo battery with MT-3608 step-up module stabilization, eight photodiode sensors detect lines based on light reflection, while the L293D driver controls motors using a finite state machine algorithm to handle various obstacles. Innovations include real-time OLED monitoring, pause & resume functionality, and adaptive obstacle handling, enabling the robot to successfully complete complex test tracks while effectively overcoming technical constraints.",
  technologies: ["Arduino Nano", "Photodiode Sensors", "DC Motors", "CD4051BE Multiplexer", "OLED Display", "L293D Driver", "Eagle PCB", "C++"] as const,
  features: ["Modular Design", "Real-time OLED Monitoring", "Pause & Resume Functionality", "Adaptive Obstacle Handling", "Finite State Machine Algorithm", "Sensor Calibration Mode"] as const,
  myTasks: [
    "Designed schematic and PCB layout using Eagle software to support the robot system",
    "Created, etched, cut, and drilled the PCB according to the designed layout",
    "Installed electronic components on the PCB and performed quality checks on pathways and components",
    "Programmed the robot to control motors, sensors, and other components for autonomous path following"
  ] as const,
  images: [
    "./images/project/Line Follower/project-line-follower-2.jpeg",
    "./images/project/Line Follower/1735094415319.jpg",
    "./images/project/Line Follower/project-line-follower-1.jpg"
  ] as const,
  githubUrl: "https://github.com/yourusername/line-following-robot",
  liveUrl: "",
  duration: "3 months",
  teamSize: "4 people",
  status: "Completed"
},
  "home-automation-project": {
  title: "Microcontroller-Based Home Automation System",
  category: "IoT",
  description: "ESP32-based home automation prototype for environmental monitoring and control",
  longDescription: "This project develops a smart home automation prototype using ESP32 microcontroller to automatically monitor and control environmental conditions. The system is designed to enhance comfort and energy efficiency by regulating temperature, humidity, and room lighting. The system utilizes DHT22 sensor for measuring temperature and humidity, PIR sensor for human motion detection, and LDR sensor for light level detection. Data from all three sensors is processed in real-time to control fans, bathroom lights, and terrace lights through relay modules. Lights and fans are activated automatically according to needs, creating an energy-efficient and environmentally friendly system. With microcontroller-based technology integration and synchronized automatic responses, this project becomes a practical solution for creating smart, comfortable, and energy-efficient spaces.",
  technologies: ["ESP32", "DHT22 Sensor", "PIR Sensor", "LDR Sensor", "Relay Modules", "Arduino IDE", "C++", "Real-time Processing"] as const,
  features: ["Automatic Temperature Control", "Motion Detection", "Light Level Sensing", "Energy Efficiency", "Real-time Environmental Monitoring", "Automated Lighting System"] as const,
  myTasks: [
    "Designed and assembled wiring systems for electronic components of the project",
    "Developed and built sensor-based home automation system to automatically monitor and control room environmental conditions", 
    "Programmed integration of DHT22, LDR, and PIR sensors for temperature, humidity, lighting control, and human motion detection"
  ] as const,
  images: [
    "./images/project/Sistem Otomasi Rumah Berbasis Mikrokontroler/home-auto-1.jpeg", 
    "./images/project/Sistem Otomasi Rumah Berbasis Mikrokontroler/jk.jpeg",
    "./images/project/Sistem Otomasi Rumah Berbasis Mikrokontroler/home-auto-2.jpeg"
  ] as const,
  githubUrl: "https://github.com/yourusername/home-automation-system",
  liveUrl: "",
  duration: "3 months",
  teamSize: "4 people", 
  status: "Completed"
},
  "automatic-door-project": {
  title: "Automatic Door System with Fuzzy Logic",
  category: "Smart Systems",
  description: "Ultrasonic and gas sensor-based automatic door system with fuzzy logic for fire safety",
  longDescription: "This project develops an automatic door system designed to enhance room comfort and security using ultrasonic sensors and MQ-2 gas sensors, with fuzzy logic algorithm as the main controller. The ultrasonic sensor detects objects approaching the door - when objects are ≥ 30 cm away, the door remains closed; at 20 cm, the door begins to open; and at 10 cm, the door fully opens. Simultaneously, the MQ-2 gas sensor monitors smoke density for safety. When smoke levels are ≤ 2800 ppm (safe category), the door follows the ultrasonic sensor logic. However, if smoke levels reach ≥ 3350 ppm (danger category), the door automatically opens fully to provide evacuation access. The system implements fuzzy logic to deliver adaptive responses based on sensor data, ensuring efficient and flexible door operation according to different situations. This project delivers an automation technology solution that is not only intelligent but also prioritizes safety aspects.",
  technologies: ["Arduino", "Ultrasonic Sensors", "MQ-2 Gas Sensors", "Fuzzy Logic", "Servo Motors", "C++", "Real-time Processing"] as const,
  features: ["Proximity-based Door Control", "Gas Detection", "Fire Safety Protocol", "Adaptive Response System", "Automatic Evacuation Mode", "Fuzzy Logic Decision Making"] as const,
  myTasks: [
    "Designed and assembled wiring systems for electronic components of the project",
    "Developed and built an automatic door system with integrated ultrasonic and gas sensors for fire safety",
    "Programmed a Fuzzy Logic-based system to automatically open doors in response to gas detection and ultrasonic sensor triggers"
  ] as const,
  images: [
    "./images/project/door automation/door-auto-2.jpeg",
    "./images/project/door automation/1735092123188.jpg",
    "./images/project/door automation/WhatsApp Image 2025-06-15 at 07.43.29.jpeg"
  ] as const,
  githubUrl: "https://github.com/yourusername/automatic-door-system",
  liveUrl: "",
  duration: "1 month",
  teamSize: "4 people",
  status: "Completed"
},
  "gas-detection-system": {
  title: "Gas Detection System with PID Fan Control",
  category: "Industrial Automation",
  description: "Adaptive PID control system for optimizing air quality through automated fan speed regulation",
  longDescription: "This project implements adaptive PID (Proportional-Integral-Derivative) control to regulate fan speed in real-time based on air quality conditions. An MQ-2 sensor is used to detect the presence of gas or potential hazards in the air, with a fan as the primary actuator. When the sensor detects dangerous gases, the PID controller automatically increases the fan speed to eliminate the gas and improve ventilation. Conversely, if no dangerous gases are detected or air quality improves, the PID controller adjusts the fan speed to a lower level to save energy, while still ensuring a safe and comfortable environment. The system provides an energy-efficient solution for maintaining optimal air quality in various environments.",
  technologies: ["MQ-2 Gas Sensor", "PID Controller", "DC Fan", "Arduino", "PWM Control", "Real-time Monitoring", "C++"] as const,
  features: ["Real-time Air Quality Monitoring", "Adaptive PID Control", "Energy Efficiency", "Automatic Ventilation", "Gas Hazard Mitigation", "Variable Fan Speed Control"] as const,
  myTasks: [
    "Assisted in designing wiring and determining necessary electronic components for the project",
    "Provided ideas and input regarding system design and implementation",
    "Contributed to programming for controlling gas sensors and fans using the PID system"
  ] as const,
  images: [
    "./images/project/sistem deteksi gas/project-gas-detection.jpeg", 
    "./images/project/sistem deteksi gas/WhatsApp Video 2025-06-15 at 07.46.55.mp4",
  ] as const,
  githubUrl: "https://github.com/yourusername/gas-detection-pid-control",
  liveUrl: "",
  duration: "3 months",
  teamSize: "4 people", 
  status: "Completed"
},
  "face-recognition-system": {
  title: "Face Detection and Recognition System",
  category: "Computer Vision",
  description: "Real-time face detection and recognition system using YuNet CNN and face_recognition library",
  longDescription: "This project aims to automatically detect and recognize facial identities using a combination of the CNN-based YuNet face detection model and the ResNet-based face_recognition library. The system works in real-time through a webcam or static images, utilizing YuNet to detect face positions and face_recognition to match faces with a known dataset. Facial data is collected from team members (15 photos per member) and automatically annotated before being stored in a known_faces.pkl file for process acceleration. The system follows a workflow that begins with opening the webcam, detecting faces using YuNet, resizing and converting images to RGB format, and finally recognizing faces by comparing them with stored face models. This project is designed for practical applications such as automatic attendance, security systems, or identity management.",
  technologies: ["Python", "YuNet CNN", "face_recognition", "OpenCV", "ResNet", "Real-time Processing", "Computer Vision", "Pickle"] as const,
  features: ["Real-time Face Detection", "Face Recognition", "Multiple Face Processing", "Dataset Management", "Automatic Annotation", "Performance Optimization"] as const,
  myTasks: [
    "Collected photo data from each team member (15 photos per member) to be stored in a file called known_face.pkl",
    "Helped design ideas regarding the face detection and recognition system to be created",
    "Assisted in program design and development, including integration of YuNet model and face_recognition"
  ] as const,
  images: [
    "./images/project/Sistem Deteksi dan Pengenalan Wajah dengan Face Recognition dan YuNet/project-self-balancing.jpg",
    "./images/project/Sistem Deteksi dan Pengenalan Wajah dengan Face Recognition dan YuNet/project-self-balancing.jpg",
  ] as const,
  githubUrl: "https://github.com/yourusername/face-recognition-system",
  liveUrl: "",
  duration: "2 months",
  teamSize: "3 people", 
  status: "Completed"
}
} as const;

export type ProjectSlug = keyof typeof projectsData;