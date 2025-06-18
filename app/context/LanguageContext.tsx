"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'id';

// Define context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Translation data
const translations: Record<Language, Record<string, string>> = {
  en: {
    "downloadCV": "Download CV",
    "downloadMyCV": "Download my CV",
    // Smart Traffic Light Project
    "project_traffic_title": "Smart Traffic Light System",
    "project_traffic_category": "Computer Vision",
    "project_traffic_description": "YOLO-based intelligent traffic light system for dynamic traffic flow optimization",
    "project_traffic_longDescription": "This project is the development of a smart traffic light system to overcome the inefficiency of conventional lights that cannot dynamically adjust to vehicle density levels. The system uses YOLO to detect vehicle saturation degrees through cameras at intersections. The detection data is processed by a microcomputer to determine adaptive light durations that are sent to the microcontroller via the MQTT protocol. This innovation enables more responsive traffic light control, reduces queues, and improves travel efficiency in congested areas.",
    "project_traffic_myTask1": "Participated in technical discussions to design the YOLO-based system used in the project",
    "project_traffic_myTask2": "Assisted in the creation of the device prototype, including system design and implementation",
    "project_traffic_myTask3": "Searched for suitable testing locations for the prototype through internet platform analysis",
    
    // Line Following Robot Project
    "project_robotics_title": "Line Following Robot",
    "project_robotics_category": "Robotics",
    "project_robotics_description": "Autonomous line following robot with modular design and adaptive obstacle handling",
    "project_robotics_longDescription": "This line follower robot features a modular design with a head and two body segments, using Arduino Nano as the controller, photodiodes as sensors, and DC motors as actuators. The system incorporates a CD4051BE multiplexer for I/O pin efficiency and an OLED display supporting three modes: start, settings for sensor calibration, and pause for debugging. Powered by a 2-cell LiPo battery with MT-3608 step-up module stabilization, eight photodiode sensors detect lines based on light reflection, while the L293D driver controls motors using a finite state machine algorithm to handle various obstacles. Innovations include real-time OLED monitoring, pause & resume functionality, and adaptive obstacle handling, enabling the robot to successfully complete complex test tracks while effectively overcoming technical constraints.",
    "project_robotics_myTask1": "Designed schematic and PCB layout using Eagle software to support the robot system",
    "project_robotics_myTask2": "Created, etched, cut, and drilled the PCB according to the designed layout",
    "project_robotics_myTask3": "Installed electronic components on the PCB and performed quality checks on pathways and components",
    "project_robotics_myTask4": "Programmed the robot to control motors, sensors, and other components for autonomous path following",
    
    // Home Automation Project
    "project_home_title": "Microcontroller-Based Home Automation System",
    "project_home_category": "IoT",
    "project_home_description": "ESP32-based home automation prototype for environmental monitoring and control",
    "project_home_longDescription": "This project develops a smart home automation prototype using ESP32 microcontroller to automatically monitor and control environmental conditions. The system is designed to enhance comfort and energy efficiency by regulating temperature, humidity, and room lighting. The system utilizes DHT22 sensor for measuring temperature and humidity, PIR sensor for human motion detection, and LDR sensor for light level detection. Data from all three sensors is processed in real-time to control fans, bathroom lights, and terrace lights through relay modules. Lights and fans are activated automatically according to needs, creating an energy-efficient and environmentally friendly system. With microcontroller-based technology integration and synchronized automatic responses, this project becomes a practical solution for creating smart, comfortable, and energy-efficient spaces.",
    "project_home_myTask1": "Designed and assembled wiring systems for electronic components of the project",
    "project_home_myTask2": "Developed and built sensor-based home automation system to automatically monitor and control room environmental conditions",
    "project_home_myTask3": "Programmed integration of DHT22, LDR, and PIR sensors for temperature, humidity, lighting control, and human motion detection",
    
    // Automatic Door Project
    "project_door_title": "Automatic Door System with Fuzzy Logic",
    "project_door_category": "Smart Systems",
    "project_door_description": "Ultrasonic and gas sensor-based automatic door system with fuzzy logic for fire safety",
    "project_door_longDescription": "This project develops an automatic door system designed to enhance room comfort and security using ultrasonic sensors and MQ-2 gas sensors, with fuzzy logic algorithm as the main controller. The ultrasonic sensor detects objects approaching the door - when objects are ≥ 30 cm away, the door remains closed; at 20 cm, the door begins to open; and at 10 cm, the door fully opens. Simultaneously, the MQ-2 gas sensor monitors smoke density for safety. When smoke levels are ≤ 2800 ppm (safe category), the door follows the ultrasonic sensor logic. However, if smoke levels reach ≥ 3350 ppm (danger category), the door automatically opens fully to provide evacuation access. The system implements fuzzy logic to deliver adaptive responses based on sensor data, ensuring efficient and flexible door operation according to different situations. This project delivers an automation technology solution that is not only intelligent but also prioritizes safety aspects.",
    "project_door_myTask1": "Designed and assembled wiring systems for electronic components of the project",
    "project_door_myTask2": "Developed and built an automatic door system with integrated ultrasonic and gas sensors for fire safety",
    "project_door_myTask3": "Programmed a Fuzzy Logic-based system to automatically open doors in response to gas detection and ultrasonic sensor triggers",
    
    // Gas Detection Project
    "project_gas_title": "Gas Detection System with PID Fan Control",
    "project_gas_category": "Industrial Automation",
    "project_gas_description": "Adaptive PID control system for optimizing air quality through automated fan speed regulation",
    "project_gas_longDescription": "This project implements adaptive PID (Proportional-Integral-Derivative) control to regulate fan speed in real-time based on air quality conditions. An MQ-2 sensor is used to detect the presence of gas or potential hazards in the air, with a fan as the primary actuator. When the sensor detects dangerous gases, the PID controller automatically increases the fan speed to eliminate the gas and improve ventilation. Conversely, if no dangerous gases are detected or air quality improves, the PID controller adjusts the fan speed to a lower level to save energy, while still ensuring a safe and comfortable environment. The system provides an energy-efficient solution for maintaining optimal air quality in various environments.",
    "project_gas_myTask1": "Assisted in designing wiring and determining necessary electronic components for the project",
    "project_gas_myTask2": "Provided ideas and input regarding system design and implementation",
    "project_gas_myTask3": "Contributed to programming for controlling gas sensors and fans using the PID system",
    
    // Face Recognition Project
    "project_face_title": "Face Detection and Recognition System",
    "project_face_category": "Computer Vision",
    "project_face_description": "Real-time face detection and recognition system using YuNet CNN and face_recognition library",
    "project_face_longDescription": "This project aims to automatically detect and recognize facial identities using a combination of the CNN-based YuNet face detection model and the ResNet-based face_recognition library. The system works in real-time through a webcam or static images, utilizing YuNet to detect face positions and face_recognition to match faces with a known dataset. Facial data is collected from team members (15 photos per member) and automatically annotated before being stored in a known_faces.pkl file for process acceleration. The system follows a workflow that begins with opening the webcam, detecting faces using YuNet, resizing and converting images to RGB format, and finally recognizing faces by comparing them with stored face models. This project is designed for practical applications such as automatic attendance, security systems, or identity management.",
    "project_face_myTask1": "Collected photo data from each team member (15 photos per member) to be stored in a file called known_face.pkl",
    "project_face_myTask2": "Helped design ideas regarding the face detection and recognition system to be created",
    "project_face_myTask3": "Assisted in program design and development, including integration of YuNet model and face_recognition",
    
    // Project Common Fields
    "project_duration": "Duration",
    "project_team_size": "Team Size",
    "project_status": "Status",
    "project_technologies": "Technologies",
    "project_features": "Features",
    "project_my_tasks": "My Tasks",
    "project_completed": "Completed",
    "project_in_progress": "In Progress",
    "project_people": "people",
    "project_months": "months",
    "project_weeks": "weeks",
    "project_days": "days",

    "certificationsHeading": "My Certifications",
    "certificationSubtitle": "Professional qualifications and achievements",
    "certification1_title": "Drone Safety & Ethics Training",
    "certification1_description": "Drone Safety And Ethics Training Course And Pass The test for Basic Drone Maneuvers",
    "certification2_title": "AI Implementation",
    "certification2_description": "Fundamentals of Artificial Intelligence Implementation",
    "certification3_title": "Backend Development",
    "certification3_description": "Backend in Website Development",
    "certification4_title": "Java Programming",
    "certification4_description": "Getting Started with Java Programming",
    "certification5_title": "Machine Learning",
    "certification5_description": "Linear Models in Machine Learning: Fundamentals",
    "certification6_title": "Network Administration",
    "certification6_description": "Young Network Administrator Competency Certificate",
    "viewCertification": "View Certification",
    "certificateIssued": "Issued by",
  // Organizations Section
    "robotika_uny_title": "Robotika UNY",
    "robotika_uny_description": "UNY Robotics is a division of the Engineering Technology UKM which operates in the field of technology, especially robotics.",
    "hmve_uny_title": "HMVE UNY",
    "hmve_uny_description": "HMVE as a facilitator in developing academic and non-academic interests, channeling aspirations, and fostering a social spirit among Electrical and Electronics Engineering students.",
    "organizations_heading": "My Organizations",
    "gallery_view": "Gallery View",  
  // Demo Items Menu
    "demoItem_organizational": "Organizational experience",
    "demoItem_projects": "My Projects",
    "demoItem_certifications": "Certifications",
    "demoItem_achievements": "Achievements",
    "demoItem_tools": "Tools Skill",
    "demoItem_work": "Work Experience",
    
    // Testimonials
    "testimonial1_quote": "Essential suite for creating documents, spreadsheets, and presentations in a professional setting.",
    "testimonial2_quote": "A lightweight and flexible code editor with extensive language and extension support.",
    "testimonial3_quote": "An interactive web-based platform for coding, data analysis, and machine learning in Python.",
    "testimonial4_quote": "A simple and classic IDE for C/C++ programming, ideal for learning and basic development.",
    "testimonial5_quote": "A simulation tool for electronic circuits and microcontrollers, used to test designs virtually.",
    "testimonial6_quote": "An open-source development environment for writing and uploading code to Arduino boards using simplified C/C++.",
    "testimonial7_quote": "A PCB design software from Autodesk, used for creating and testing electronic circuit layouts.",
    "testimonial8_quote": "A powerful network simulator for designing, configuring, and visualizing network topologies.",
    "testimonial9_quote": "A programming tool for Omron PLCs, commonly used in industrial automation systems.",
    "testimonial10_quote": "A numerical computing environment used for simulations, mathematical modeling, and data processing.",
    "testimonial11_quote": "Simulation software for pneumatic, hydraulic, and electrical systems, widely used in automation.",
    
    // Card Data (Projects)
    "project_smart_traffic_title": "Smart Traffic Light System",
    "project_smart_traffic_category": "Computer Vision & IoT",
    "project_robotics1_title": "Robotics",
    "project_robotics1_category": "Robotic",
    "project_home_automation_title": "Home Automation System",
    "project_home_automation_category": "IoT",
    "project_automatic_door_title": "Automatic Door System",
    "project_automatic_door_category": "Smart Systems",
    "project_gas_detection_title": "Gas Detection System", 
    "project_gas_detection_category": "Industrial Automation",
    "project_face_recognition_title": "Face Recognition System",
    "project_face_recognition_category": "Computer Vision",
    
    // Achievement Content
    "achievement1_title": "Excellent Team Award in the 2024 National Level Indonesian Flying Robot Contest: Racing Planet Division",
    "achievement1_description": "The Indonesian Flying Robot Contest is a competition organized by the Ministry of Education, Culture, Research, and Technology (Kemendikbudristek) through the Indonesian Talent Development Center and National Achievement Center. This prestigious competition aims to enhance students' creativity and skills in aviation technology.",
    
    "achievement2_title": "Participation in the Polines Robot Competition 2024",
    "achievement2_description": "Polines Robotic Contest (PRC) is a national level robotics competition held by the Student Activity Unit for Science Development of Semarang State Polytechnic.",
    
    "achievement3_title": "Finalist Race Work Write National Scientific Electrolympic UPNVJ 2024",
    "achievement3_description": "Electrolympic 2024 is event competition open in the field academic and non- academic are one of them is Work write scientific that canfollowed by all student active with the theme Utilization Technology For Lifestyle Sustainable in the Era of Society 5.0.",
    
    "achievement4_title": "Outstanding Student Award in Academic Reasoning at Yogyakarta State University 2025",
    "achievement4_description": "",
    // Navigation items
  "home": "Home",
  "about": "About",
  "projects": "Projects", 
  "skills": "Skills",
  "education": "Education",
  "testimonials": "Testimonials",
  "contact": "Contact",
  
  // Additional nav items from your code
  "Dashboard": "Dashboard",
  "Work": "Work",
  "Organizational": "Organizational",
  "Certifications": "Certifications", 
  "Achievements": "Achievements",
  "galleryView": "Gallery View",

    // Hero Section
    "readyForJob": "I'm Ready For Job",
    "electronicEngineer": "Electronic Engineer",
    "iotEngineer": "IoT Engineer",
    "roboticEngineer": "Robotic Engineer",
    "uavEngineer": "UAV Engineer",
    "myName": "I'm Muhammad Ibrahim Musyaffa",
    "myTitle": "Student of Electronic Engineering",
    "myDescription": "I am a student at Yogyakarta State University specializing in robotics, AI, machine learning, IoT, software development, and UAV technology. I'm a visionary problem-solver with strong teamwork skills, passionate about driving technological innovation that creates positive social impact.",
    "contactMe": "Contact Me",
    "scrollDown": "Scroll Down",
    "myPortfolio": "My Portfolio",
    
    // Work Experience Section
    "workExperienceTitle": "Work Experience",
    "internshipTitle": "Electrical Engineer Internship",
    "internshipLocation": "• Bekasi, Indonesia",
    "companyDescription": "PT AM/NS Indonesia is a manufacturing company that processes cold-rolled steel, galvanized steel, and annealed steel in sheet and coil forms.",
    "keyResponsibilities": "Key Responsibilities:",
    "responsibility1": "Analyzed thermocouple sensor functions in the reheating tube furnace process on the continuous galvanizing line to ensure optimal temperature control in the galvanization process.",
    "responsibility2": "Performed maintenance and repair of electrical equipment including light repair, steel sheet counter machine repair, regular panel voltage checks, assisted with drive motor checks, motor greasing, and other tasks to maintain operational reliability.",
    
    // About Section
    "aboutTitle": "About Me",
    "aboutDescription": "I'm a passionate Electronic Engineering student with expertise in robotics, IoT, and UAV technology.",
    "experienceYears": "Years of Experience",
    "projectsCompleted": "Projects Completed",
    "clientsSatisfied": "Satisfied Clients",
    "awardsReceived": "Awards Received",
    "aboutMe1": "Hi there! I'm Ibrahim, an Electronic Engineering student with a passion for creating innovative solutions using technology.",
    "aboutMe2": "I specialize in robotics, artificial intelligence, and IoT development, with practical experience in designing and implementing electronic systems.",
    "aboutMe3": "My goal is to contribute to technological advancement while solving real-world problems through engineering excellence.",
    
    "viewDetails": "View details",
    // Projects Section
    "projectsTitle": "Projects",
    "projectsDescription": "Explore my latest projects across various domains of technology and innovation.",
    "allCategories": "All Categories",
    "viewProject": "View Project",
    "projectDetails": "Project Details",
    "projectObjectives": "Objectives",
    "projectTechnologies": "Technologies",
    "projectResults": "Results",
    "closeDetails": "Close Details",
    
    // Skills Section
    "skillsTitle": "Skills & Expertise",
    "skillsDescription": "My technical expertise and professional capabilities",
    "hardSkillsTitle": "Technical Skills",
    "softSkillsTitle": "Soft Skills",
    "skillLevel": "Skill Level",
    "expertiseIn": "Areas of Expertise",
    
    // Education Timeline - 2022-Present
    "timeline_2022_title": "2022 - Present",
    "edu_d4_title": "D4 Electronic Engineering",
    "edu_uny_name": "Yogyakarta State University",
    "edu_status_current": "Currently Studying",
    "edu_uny_description": "Focusing on advanced automation, IoT systems, robotics, and intelligent control technologies with strong emphasis on practical implementation.",
    "edu_academic_excellence": "Academic Excellence",
    "edu_gpa_label": "Cumulative GPA 5th Semester",
    "edu_gpa_value": "3.7",
    "edu_key_subjects": "Key Subjects",
    "subject_network": "Network Computers",
    "subject_iot": "IoT Systems",
    "subject_robotics": "Robotics",
    "subject_smart_control": "Smart Control",
    "subject_telemetry": "Telemetry",
    "subject_ai": "Artificial Intelligence",
    "subject_plc": "PLC",
    "subject_microcontroller": "Microcontroller",
    "subject_microprocessor": "Microprocessor",
    "subject_power_electronics": "Power Electronics",
    "subject_instrumentation": "Instrumentation",
    "subject_automation": "Automation",
    "edu_5th_semester": "5th Semester",
    
    // Education Timeline - 2020-2022
    "timeline_2020_title": "2020 - 2022",
    "edu_man_bekasi": "MAN 1 Bekasi",
    "edu_science_program": "Science Program (IPA)",
    "edu_status_completed": "Completed",
    "edu_man_description": "Specialized in Natural Sciences with focus on Mathematics, Physics, Chemistry, and Biology. Built strong foundation in analytical thinking and scientific methodology.",
    "edu_academic_achievement": "Academic Achievement",
    "edu_final_score": "Final Semester Score",
    "edu_score_value": "89.21",
    
    // ProjectModal additional keys
    "project_about": "About This Project",
    "project_code": "Code",
    "project_live": "Live",
    "project_gallery": "Project Gallery",

    // Testimonials Section
    "testimonialsTitle": "Testimonials",
    "testimonialsDescription": "What people say about my work and collaboration",
    
    "letsConnect": "Let's Connect",
    "readyToCollaborate": "Ready to collaborate? Reach out and let's build something amazing together.",
    "callUs": "Call us",
    "quickMessage": "Quick Message",
    "yourName": "Your Name",
    "yourEmail": "Your Email",
    "subject": "Subject",
    "yourMessage": "Your Message",
    "sendMessage": "Send Message",
    "copyright": "© 2025 Muhammad Ibrahim Musyaffa. All rights reserved.",
    "availableForFreelance": "Available for freelance work",
    "socialLinks": "Social Links",
    "githubProfile": "GitHub Profile",
    "linkedinProfile": "LinkedIn Profile",
    "instagramProfile": "Instagram Profile",
    "whatsappContact": "WhatsApp Contact",
    "emailContact": "Email Contact",
  },
  id: {
    "downloadCV": "Unduh CV",
    "downloadMyCV": "Unduh CV saya",
    // Smart Traffic Light Project
    "project_traffic_title": "Sistem Lampu Lalu Lintas Cerdas",
    "project_traffic_category": "Computer Vision",
    "project_traffic_description": "Sistem lampu lalu lintas cerdas berbasis YOLO untuk optimasi arus lalu lintas dinamis",
    "project_traffic_longDescription": "Proyek ini adalah pengembangan sistem lampu lalu lintas cerdas untuk mengatasi ketidakefisienan lampu konvensional yang tidak mampu menyesuaikan tingkat kepadatan kendaraan secara dinamis. Sistem ini menggunakan YOLO untuk mendeteksi derajat kejenuhan kendaraan melalui kamera di persimpangan. Data hasil deteksi diproses oleh microcomputer untuk menentukan durasi lampu adaptif yang dikirimkan ke microcontroller melalui protokol MQTT. Inovasi ini memungkinkan pengaturan lampu lalu lintas yang lebih responsif, mengurangi antrian, dan meningkatkan efisiensi perjalanan di daerah padat.",
    "project_traffic_myTask1": "Berpartisipasi dalam diskusi teknis untuk merancang sistem berbasis YOLO yang digunakan dalam proyek",
    "project_traffic_myTask2": "Membantu dalam pembuatan prototipe alat, termasuk penyusunan desain dan implementasi sistem",
    "project_traffic_myTask3": "Mencari lokasi percobaan yang sesuai untuk pengujian prototipe melalui analisis platform internet",
    
    // Line Following Robot Project
    "project_robotics_title": "Robot Line Follower",
    "project_robotics_category": "Robotika",
    "project_robotics_description": "Robot pengikut garis otonom dengan desain modular dan penanganan rintangan adaptif",
    "project_robotics_longDescription": "Robot line follower ini memiliki desain modular dengan kepala dan dua segmen tubuh, menggunakan Arduino Nano sebagai kontroler, fotodioda sebagai sensor, dan motor DC sebagai aktuator. Sistem ini menggunakan multiplekser CD4051BE untuk efisiensi pin I/O dan layar OLED yang mendukung tiga mode: mulai, pengaturan untuk kalibrasi sensor, dan jeda untuk debugging. Didukung oleh baterai LiPo 2-sel dengan stabilisasi modul step-up MT-3608, delapan sensor fotodioda mendeteksi garis berdasarkan refleksi cahaya, sementara driver L293D mengontrol motor menggunakan algoritma finite state machine untuk menangani berbagai rintangan. Inovasi mencakup pemantauan OLED real-time, fungsi jeda & lanjutkan, dan penanganan rintangan adaptif, memungkinkan robot berhasil menyelesaikan jalur uji yang kompleks sambil secara efektif mengatasi kendala teknis.",
    "project_robotics_myTask1": "Mendesain skematik dan layout PCB menggunakan perangkat lunak Eagle untuk mendukung sistem robot",
    "project_robotics_myTask2": "Membuat, mengetsa, memotong, dan mengebor PCB sesuai dengan layout yang dirancang",
    "project_robotics_myTask3": "Memasang komponen elektronik pada PCB dan melakukan pemeriksaan kualitas pada jalur dan komponen",
    "project_robotics_myTask4": "Memprogram robot untuk mengontrol motor, sensor, dan komponen lainnya untuk mengikuti jalur secara otonom",
    
    // Home Automation Project
    "project_home_title": "Sistem Otomasi Rumah Berbasis Mikrokontroler",
    "project_home_category": "IoT",
    "project_home_description": "Prototipe otomasi rumah berbasis ESP32 untuk pemantauan dan pengaturan lingkungan",
    "project_home_longDescription": "Proyek ini mengembangkan prototipe otomasi rumah cerdas menggunakan mikrokontroler ESP32 untuk secara otomatis memantau dan mengontrol kondisi lingkungan. Sistem ini dirancang untuk meningkatkan kenyamanan dan efisiensi energi dengan mengatur suhu, kelembaban, dan pencahayaan ruangan. Sistem menggunakan sensor DHT22 untuk mengukur suhu dan kelembaban, sensor PIR untuk deteksi gerakan manusia, dan sensor LDR untuk deteksi tingkat cahaya. Data dari ketiga sensor diproses secara real-time untuk mengontrol kipas, lampu kamar mandi, dan lampu teras melalui modul relay. Lampu dan kipas diaktifkan secara otomatis sesuai kebutuhan, menciptakan sistem yang hemat energi dan ramah lingkungan. Dengan integrasi teknologi berbasis mikrokontroler dan respons otomatis yang tersinkronisasi, proyek ini menjadi solusi praktis untuk menciptakan ruang yang cerdas, nyaman, dan hemat energi.",
    "project_home_myTask1": "Merancang dan merakit sistem kabel untuk komponen elektronik proyek",
    "project_home_myTask2": "Mengembangkan dan membangun sistem otomasi rumah berbasis sensor untuk secara otomatis memantau dan mengontrol kondisi lingkungan ruangan",
    "project_home_myTask3": "Memprogram integrasi sensor DHT22, LDR, dan PIR untuk kontrol suhu, kelembaban, pencahayaan, dan deteksi gerakan manusia",
    
    // Automatic Door Project
    "project_door_title": "Sistem Pintu Otomatis dengan Logika Fuzzy",
    "project_door_category": "Sistem Cerdas",
    "project_door_description": "Sistem pintu otomatis berbasis sensor ultrasonik dan gas dengan logika fuzzy untuk keselamatan kebakaran",
    "project_door_longDescription": "Proyek ini mengembangkan sistem pintu otomatis yang dirancang untuk meningkatkan kenyamanan dan keamanan ruangan menggunakan sensor ultrasonik dan sensor gas MQ-2, dengan algoritma logika fuzzy sebagai pengendali utama. Sensor ultrasonik mendeteksi objek yang mendekati pintu - ketika objek berjarak ≥ 30 cm, pintu tetap tertutup; pada 20 cm, pintu mulai terbuka; dan pada 10 cm, pintu terbuka sepenuhnya. Secara bersamaan, sensor gas MQ-2 memantau kepadatan asap untuk keamanan. Ketika tingkat asap ≤ 2800 ppm (kategori aman), pintu mengikuti logika sensor ultrasonik. Namun, jika tingkat asap mencapai ≥ 3350 ppm (kategori bahaya), pintu secara otomatis terbuka sepenuhnya untuk memberikan akses evakuasi. Sistem ini menerapkan logika fuzzy untuk memberikan respons adaptif berdasarkan data sensor, memastikan pengoperasian pintu yang efisien dan fleksibel sesuai dengan situasi yang berbeda. Proyek ini menghadirkan solusi teknologi otomasi yang tidak hanya cerdas tetapi juga mengutamakan aspek keselamatan.",
    "project_door_myTask1": "Merancang dan merakit sistem kabel untuk komponen elektronik proyek",
    "project_door_myTask2": "Mengembangkan dan membangun sistem pintu otomatis dengan sensor ultrasonik dan gas terintegrasi untuk keselamatan kebakaran",
    "project_door_myTask3": "Memprogram sistem berbasis Logika Fuzzy untuk secara otomatis membuka pintu sebagai respons terhadap deteksi gas dan pemicu sensor ultrasonik",
    
    "viewDetails": "Lihat detail",
    // ProjectModal additional keys
    "project_about": "Tentang Proyek Ini",
    "project_code": "Kode",
    "project_live": "Demo",
    "project_gallery": "Galeri Proyek",

    // Gas Detection Project
    "project_gas_title": "Sistem Deteksi Gas dengan Kontrol Kipas PID",
    "project_gas_category": "Otomasi Industri",
    "project_gas_description": "Sistem kontrol PID adaptif untuk mengoptimalkan kualitas udara melalui regulasi kecepatan kipas otomatis",
    "project_gas_longDescription": "Proyek ini menerapkan kontrol PID (Proporsional-Integral-Derivatif) adaptif untuk mengatur kecepatan kipas secara real-time berdasarkan kondisi kualitas udara. Sensor MQ-2 digunakan untuk mendeteksi keberadaan gas atau potensi bahaya di udara, dengan kipas sebagai aktuator utama. Ketika sensor mendeteksi gas berbahaya, pengontrol PID secara otomatis meningkatkan kecepatan kipas untuk menghilangkan gas dan memperbaiki ventilasi. Sebaliknya, jika tidak terdeteksi gas berbahaya atau kualitas udara membaik, pengontrol PID menyesuaikan kecepatan kipas ke level yang lebih rendah untuk menghemat energi, sambil tetap memastikan lingkungan yang aman dan nyaman. Sistem ini menyediakan solusi hemat energi untuk menjaga kualitas udara optimal di berbagai lingkungan.",
    "project_gas_myTask1": "Membantu dalam merancang pengkabelan dan menentukan komponen elektronik yang diperlukan untuk proyek",
    "project_gas_myTask2": "Memberikan ide dan masukan mengenai desain sistem dan implementasi",
    "project_gas_myTask3": "Berkontribusi pada pemrograman untuk mengendalikan sensor gas dan kipas menggunakan sistem PID",
    
    // Face Recognition Project
    "project_face_title": "Sistem Deteksi dan Pengenalan Wajah",
    "project_face_category": "Computer Vision",
    "project_face_description": "Sistem deteksi dan pengenalan wajah real-time menggunakan YuNet CNN dan library face_recognition",
    "project_face_longDescription": "Proyek ini bertujuan untuk secara otomatis mendeteksi dan mengenali identitas wajah menggunakan kombinasi model deteksi wajah YuNet berbasis CNN dan library face_recognition berbasis ResNet. Sistem bekerja secara real-time melalui webcam atau gambar statis, memanfaatkan YuNet untuk mendeteksi posisi wajah dan face_recognition untuk mencocokkan wajah dengan dataset yang dikenal. Data wajah dikumpulkan dari anggota tim (15 foto per anggota) dan dianotasi secara otomatis sebelum disimpan dalam file known_faces.pkl untuk percepatan proses. Sistem mengikuti alur kerja yang dimulai dengan membuka webcam, mendeteksi wajah menggunakan YuNet, mengubah ukuran dan mengkonversi gambar ke format RGB, dan akhirnya mengenali wajah dengan membandingkannya dengan model wajah yang tersimpan. Proyek ini dirancang untuk aplikasi praktis seperti absensi otomatis, sistem keamanan, atau manajemen identitas.",
    "project_face_myTask1": "Mengumpulkan data foto dari setiap anggota tim (15 foto per anggota) untuk disimpan dalam file bernama known_face.pkl",
    "project_face_myTask2": "Membantu merancang ide mengenai sistem deteksi dan pengenalan wajah yang akan dibuat",
    "project_face_myTask3": "Membantu dalam perancangan dan pengembangan program, termasuk integrasi model YuNet dan face_recognition",
    
    // Project Common Fields
    "project_duration": "Durasi",
    "project_team_size": "Ukuran Tim",
    "project_status": "Status",
    "project_technologies": "Teknologi",
    "project_features": "Fitur",
    "project_my_tasks": "Tugas Saya",
    "project_completed": "Selesai",
    "project_in_progress": "Sedang Berlangsung",
    "project_people": "orang",
    "project_months": "bulan",
    "project_weeks": "minggu",
    "project_days": "hari",

    "certificationsHeading": "Sertifikasi Saya",
    "certificationSubtitle": "Kualifikasi profesional dan pencapaian",
    "certification1_title": "Pelatihan Keamanan & Etika Drone",
    "certification1_description": "Kursus Pelatihan Keamanan dan Etika Drone serta Lulus Ujian untuk Manuver Dasar Drone",
    "certification2_title": "Implementasi AI",
    "certification2_description": "Dasar-dasar Implementasi Kecerdasan Buatan",
    "certification3_title": "Pengembangan Backend",
    "certification3_description": "Backend dalam Pengembangan Website",
    "certification4_title": "Pemrograman Java",
    "certification4_description": "Memulai dengan Pemrograman Java",
    "certification5_title": "Machine Learning",
    "certification5_description": "Model Linear dalam Machine Learning: Fundamental",
    "certification6_title": "Administrasi Jaringan",
    "certification6_description": "Sertifikat Kompetensi Administrator Jaringan Muda",
    "viewCertification": "Lihat Sertifikat",
    "certificateIssued": "Dikeluarkan oleh",
    // Organizations Section
    "robotika_uny_title": "Robotika UNY",
    "robotika_uny_description": "Robotika UNY adalah divisi dari UKM Teknologi Rekayasa yang bergerak di bidang teknologi, khususnya robotika.",
    "hmve_uny_title": "HMVE UNY", 
    "hmve_uny_description": "HMVE sebagai fasilitator dalam mengembangkan minat akademik dan non-akademik, menyalurkan aspirasi, dan menumbuhkan semangat sosial di kalangan mahasiswa Teknik Elektro dan Elektronika.",
    "organizations_heading": "Organisasi Saya",
    "gallery_view": "Tampilan Galeri",
  // Demo Items Menu
    "demoItem_organizational": "Pengalaman Organisasi",
    "demoItem_projects": "Proyek Saya",
    "demoItem_certifications": "Sertifikasi",
    "demoItem_achievements": "Prestasi",
    "demoItem_tools": "Keterampilan Alat",
    "demoItem_work": "Pengalaman Kerja",
    
    // Testimonials
    "testimonial1_quote": "Suite penting untuk membuat dokumen, spreadsheet, dan presentasi dalam lingkungan profesional.",
    "testimonial2_quote": "Editor kode yang ringan dan fleksibel dengan dukungan bahasa dan ekstensi yang luas.",
    "testimonial3_quote": "Platform web interaktif untuk coding, analisis data, dan machine learning dalam Python.",
    "testimonial4_quote": "IDE sederhana dan klasik untuk pemrograman C/C++, ideal untuk pembelajaran dan pengembangan dasar.",
    "testimonial5_quote": "Alat simulasi untuk sirkuit elektronik dan mikrokontroler, digunakan untuk menguji desain secara virtual.",
    "testimonial6_quote": "Lingkungan pengembangan open-source untuk menulis dan mengunggah kode ke board Arduino menggunakan C/C++ yang disederhanakan.",
    "testimonial7_quote": "Software desain PCB dari Autodesk, digunakan untuk membuat dan menguji layout sirkuit elektronik.",
    "testimonial8_quote": "Simulator jaringan yang kuat untuk merancang, mengonfigurasi, dan memvisualisasikan topologi jaringan.",
    "testimonial9_quote": "Alat pemrograman untuk PLC Omron, umum digunakan dalam sistem otomasi industri.",
    "testimonial10_quote": "Lingkungan komputasi numerik yang digunakan untuk simulasi, pemodelan matematika, dan pemrosesan data.",
    "testimonial11_quote": "Software simulasi untuk sistem pneumatik, hidrolik, dan elektrik, banyak digunakan dalam otomasi.",
    
    // Card Data (Projects)
    "project_smart_traffic_title": "Sistem Lampu Lalu Lintas Cerdas",
    "project_smart_traffic_category": "Computer Vision & IoT",
    "project_robotics1_title": "Robotika",
    "project_robotics1_category": "Robotika",
    "project_home_automation_title": "Sistem Otomasi Rumah",
    "project_home_automation_category": "IoT",
    "project_automatic_door_title": "Sistem Pintu Otomatis",
    "project_automatic_door_category": "Sistem Cerdas",
    "project_gas_detection_title": "Sistem Deteksi Gas", 
    "project_gas_detection_category": "Otomasi Industri",
    "project_face_recognition_title": "Sistem Pengenalan Wajah",
    "project_face_recognition_category": "Computer Vision",
    
    // Achievement Content
    "achievement1_title": "Penghargaan Tim Terbaik dalam Kontes Robot Terbang Indonesia Tingkat Nasional 2024: Divisi Racing Planet",
    "achievement1_description": "Kontes Robot Terbang Indonesia adalah kompetisi yang diselenggarakan oleh Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi (Kemendikbudristek) melalui Pusat Pengembangan Talenta Indonesia dan Pusat Prestasi Nasional. Kompetisi bergengsi ini bertujuan untuk meningkatkan kreativitas dan keterampilan mahasiswa dalam teknologi penerbangan.",
    
    "achievement2_title": "Partisipasi dalam Kompetisi Robot Polines 2024",
    "achievement2_description": "Polines Robotic Contest (PRC) adalah kompetisi robotika tingkat nasional yang diadakan oleh Unit Kegiatan Mahasiswa Pengembangan Sains Politeknik Negeri Semarang.",
    
    "achievement3_title": "Finalis Race Work Write National Scientific Electrolympic UPNVJ 2024",
    "achievement3_description": "Electrolympic 2024 adalah kompetisi event yang terbuka di bidang akademik dan non-akademik salah satunya adalah Karya tulis ilmiah yang dapat diikuti oleh semua mahasiswa aktif dengan tema Pemanfaatan Teknologi Untuk Gaya Hidup Berkelanjutan di Era Masyarakat 5.0.",
    
    "achievement4_title": "Penghargaan Mahasiswa Berprestasi di Bidang Penalaran di Universitas Negeri Yogyakarta 2025",
    "achievement4_description": "",
    // Navigation items
  "home": "Beranda",
  "about": "Tentang",
  "Projects": "Proyek", 
  "skills": "Keterampilan",
  "Education": "Pendidikan",
  "testimonials": "Testimoni",
  "contact": "Kontak",
  
  // Additional nav items from your code
  "Dashboard": "Dasbor",
  "Work": "Pekerjaan",
  "Organizational": "Organisasi",
  "Certifications": "Sertifikasi", 
  "Achievements": "Prestasi",
  "galleryView": "Tampilan Galeri",

    // Hero Section
    "readyForJob": "Saya Siap Bekerja",
    "electronicEngineer": "Insinyur Elektronika",
    "iotEngineer": "Insinyur IoT",
    "roboticEngineer": "Insinyur Robotika",
    "uavEngineer": "Insinyur UAV",
    "myName": "Saya Muhammad Ibrahim Musyaffa",
    "myTitle": "Mahasiswa D4 Teknik Elektronika",
    "myDescription": "Saya adalah mahasiswa di Universitas Negeri Yogyakarta yang mengkhususkan diri dalam robotika, AI, machine learning, IoT, pengembangan perangkat lunak, dan teknologi UAV. Saya adalah pemecah masalah visioner dengan keterampilan kerja tim yang kuat, bersemangat mendorong inovasi teknologi yang menciptakan dampak sosial positif.",
    "contactMe": "Hubungi Saya",
    "scrollDown": "Gulir ke Bawah",
    "myPortfolio": "Portofolio Saya",
    
    // Work Experience Section
    "workExperienceTitle": "Pengalaman Kerja",
    "internshipTitle": "Magang Teknik Elektro",
    "internshipLocation": "• Bekasi, Indonesia",
    "companyDescription": "PT AM/NS Indonesia adalah perusahaan manufaktur yang memproses baja canai dingin, baja galvanis dan baja anil dalam bentuk lembaran dan gulungan.",
    "keyResponsibilities": "Tanggung Jawab Utama:",
    "responsibility1": "Menganalisis fungsi sensor thermocouple dalam proses reheating tube furnace pada continuous galvanizing line untuk memastikan kontrol suhu yang optimal dalam proses galvanisasi.",
    "responsibility2": "Melakukan pemeliharaan dan perbaikan peralatan elektrik meliputi perbaikan lampu, perbaikan mesin counter sheet baja, pengecekan tegangan panel secara berkala, membantu pengecekan drive motor, membantu greasing motor dan lainnya untuk menjaga keandalan operasional.",
    
    // About Section
    "aboutTitle": "Tentang Saya",
    "aboutDescription": "Saya adalah mahasiswa Teknik Elektronika yang bersemangat dengan keahlian di bidang robotika, IoT, dan teknologi UAV.",
    "experienceYears": "Tahun Pengalaman",
    "projectsCompleted": "Proyek Selesai",
    "clientsSatisfied": "Klien Puas",
    "awardsReceived": "Penghargaan Diterima",
    "aboutMe1": "Halo! Saya Ibrahim, mahasiswa Teknik Elektronika dengan passion menciptakan solusi inovatif menggunakan teknologi.",
    "aboutMe2": "Saya mengkhususkan diri dalam robotika, kecerdasan buatan, dan pengembangan IoT, dengan pengalaman praktis dalam merancang dan mengimplementasikan sistem elektronik.",
    "aboutMe3": "Tujuan saya adalah berkontribusi pada kemajuan teknologi sambil memecahkan masalah dunia nyata melalui keunggulan teknik.",
    
    // Projects Section
    "projectsTitle": "Proyek",
    "projectsDescription": "Jelajahi proyek terbaru saya di berbagai bidang teknologi dan inovasi.",
    "allCategories": "Semua Kategori",
    "viewProject": "Lihat Proyek",
    "projectDetails": "Detail Proyek",
    "projectObjectives": "Tujuan",
    "projectTechnologies": "Teknologi",
    "projectResults": "Hasil",
    "closeDetails": "Tutup Detail",
    
    // Skills Section
    "skillsTitle": "Keterampilan & Keahlian",
    "skillsDescription": "Keahlian teknis dan kemampuan profesional saya",
    "hardSkillsTitle": "Keterampilan Teknis",
    "softSkillsTitle": "Keterampilan Lunak",
    "skillLevel": "Tingkat Keahlian",
    "expertiseIn": "Bidang Keahlian",
    
    // Education Timeline - 2022-Present
    "timeline_2022_title": "2022 - Sekarang",
    "edu_d4_title": "D4 Teknik Elektronika",
    "edu_uny_name": "Universitas Negeri Yogyakarta",
    "edu_status_current": "Sedang Belajar",
    "edu_uny_description": "Fokus pada otomasi tingkat lanjut, sistem IoT, robotika, dan teknologi kontrol cerdas dengan penekanan kuat pada implementasi praktis.",
    "edu_academic_excellence": "Prestasi Akademik",
    "edu_gpa_label": "IPK Semester 5",
    "edu_gpa_value": "3,7",
    "edu_key_subjects": "Mata Kuliah Utama",
    "subject_network": "Jaringan Komputer",
    "subject_iot": "Sistem IoT",
    "subject_robotics": "Robotika",
    "subject_smart_control": "Kontrol Cerdas",
    "subject_telemetry": "Telemetri",
    "subject_ai": "Kecerdasan Buatan",
    "subject_plc": "PLC",
    "subject_microcontroller": "Mikrokontroler",
    "subject_microprocessor": "Mikroprosesor",
    "subject_power_electronics": "Elektronika Daya",
    "subject_instrumentation": "Instrumentasi",
    "subject_automation": "Otomasi",
    "edu_5th_semester": "Semester 5",
    
    // Education Timeline - 2020-2022
    "timeline_2020_title": "2020 - 2022",
    "edu_man_bekasi": "MAN 1 Bekasi",
    "edu_science_program": "Program IPA",
    "edu_status_completed": "Selesai",
    "edu_man_description": "Spesialisasi di bidang Ilmu Pengetahuan Alam dengan fokus pada Matematika, Fisika, Kimia, dan Biologi. Membangun dasar yang kuat dalam pemikiran analitis dan metodologi ilmiah.",
    "edu_academic_achievement": "Prestasi Akademik",
    "edu_final_score": "Nilai Akhir Semester",
    "edu_score_value": "89,21",
    
    // Testimonials Section
    "testimonialsTitle": "Testimoni",
    "testimonialsDescription": "Apa kata orang tentang pekerjaan dan kolaborasi saya",
    
   // Contact Section
    "letsConnect": "Mari Terhubung",
    "readyToCollaborate": "Siap berkolaborasi? Hubungi saya dan mari bangun sesuatu yang luar biasa bersama.",
    "callUs": "Hubungi kami",
    "quickMessage": "Pesan Singkat",
    "yourName": "Nama Anda",
    "yourEmail": "Email Anda",
    "subject": "Subjek",
    "yourMessage": "Pesan Anda",
    "sendMessage": "Kirim Pesan",
    "copyright": "© 2025 Muhammad Ibrahim Musyaffa. Semua hak dilindungi.",
    "availableForFreelance": "Tersedia untuk pekerjaan freelance",
    "socialLinks": "Tautan Sosial",
    "githubProfile": "Profil GitHub",
    "linkedinProfile": "Profil LinkedIn",
    "instagramProfile": "Profil Instagram",
    "whatsappContact": "Kontak WhatsApp",
    "emailContact": "Kontak Email",
  }
};

// Provider component
export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // Initialize with default language
  const [language, setLanguage] = useState<Language>('en');
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    // Only run browser-specific code after mounting
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferred-language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'id')) {
        setLanguage(savedLanguage);
      } else {
        // Try to detect browser language
        try {
          const browserLanguage = navigator.language.split('-')[0];
          if (browserLanguage === 'id') {
            setLanguage('id');
          }
        } catch (e) {
          // Fallback if navigator is not available
          console.error("Could not detect browser language", e);
        }
      }
    }
  }, []);
  
  // Save language preference when it changes
  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', language);
    }
  }, [language, isClient]);

  // Function to get translation for a key
  const t = (key: string): string => {
    return (translations[language] && translations[language][key]) || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);