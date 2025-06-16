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
    
    // Education Section
    "educationTitle": "Education",
    "educationDescription": "My academic journey and qualifications",
    "universityName": "Yogyakarta State University",
    "universityDegree": "Bachelor of Applied Science in Electronic Engineering",
    "universityPeriod": "2022 - Present",
    "universityDescription": "Focusing on electronic systems engineering with specialization in robotics, IoT, and automation technologies.",
    "relevantCourses": "Relevant Courses",
    "course1": "Digital Electronics",
    "course2": "Microcontroller Programming",
    "course3": "Embedded Systems",
    "course4": "Robotics and Automation",
    "course5": "Internet of Things",
    
    // Testimonials Section
    "testimonialsTitle": "Testimonials",
    "testimonialsDescription": "What people say about my work and collaboration",
    
    // Contact Section
    "contactTitle": "Get In Touch",
    "contactDescription": "Feel free to reach out to me for collaboration or job opportunities",
    "nameLabel": "Your Name",
    "emailLabel": "Your Email",
    "messageLabel": "Message",
    "sendMessage": "Send Message",
    "contactInfo": "Contact Information",
    "addressLabel": "Address",
    "addressValue": "Yogyakarta, Indonesia",
    "emailAddressLabel": "Email",
    "phoneLabel": "Phone",
    
    // Footer
    "copyright": "© 2025 Muhammad Ibrahim Musyaffa. All rights reserved.",
    "privacyPolicy": "Privacy Policy",
    "termsOfService": "Terms of Service",
  },
  id: {
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
    
    // Education Section
    "educationTitle": "Pendidikan",
    "educationDescription": "Perjalanan akademik dan kualifikasi saya",
    "universityName": "Universitas Negeri Yogyakarta",
    "universityDegree": "Sarjana Terapan Teknik Elektronika",
    "universityPeriod": "2022 - Sekarang",
    "universityDescription": "Fokus pada teknik sistem elektronika dengan spesialisasi di bidang robotika, IoT, dan teknologi otomasi.",
    "relevantCourses": "Mata Kuliah Relevan",
    "course1": "Elektronika Digital",
    "course2": "Pemrograman Mikrokontroler",
    "course3": "Sistem Tertanam",
    "course4": "Robotika dan Otomasi",
    "course5": "Internet of Things",
    
    // Testimonials Section
    "testimonialsTitle": "Testimoni",
    "testimonialsDescription": "Apa kata orang tentang pekerjaan dan kolaborasi saya",
    
    // Contact Section
    "contactTitle": "Hubungi Saya",
    "contactDescription": "Jangan ragu untuk menghubungi saya untuk kolaborasi atau peluang kerja",
    "nameLabel": "Nama Anda",
    "emailLabel": "Email Anda",
    "messageLabel": "Pesan",
    "sendMessage": "Kirim Pesan",
    "contactInfo": "Informasi Kontak",
    "addressLabel": "Alamat",
    "addressValue": "Yogyakarta, Indonesia",
    "emailAddressLabel": "Email",
    "phoneLabel": "Telepon",
    
    // Footer
    "copyright": "© 2025 Muhammad Ibrahim Musyaffa. Hak cipta dilindungi.",
    "privacyPolicy": "Kebijakan Privasi",
    "termsOfService": "Ketentuan Layanan",
  }
};

// Provider component
export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // Check if there's a saved language preference in localStorage
  const [language, setLanguage] = useState<Language>('en');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Load saved language preference on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferred-language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'id')) {
        setLanguage(savedLanguage);
      } else {
        // Try to detect browser language
        const browserLanguage = navigator.language.split('-')[0];
        if (browserLanguage === 'id') {
          setLanguage('id');
        }
      }
      setIsLoaded(true);
    }
  }, []);
  
  // Save language preference when it changes
  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', newLanguage);
    }
  };

  // Function to get translation for a key
  const t = (key: string): string => {
    return (translations[language] && translations[language][key]) || key;
  };

  // If not loaded yet, provide default context to prevent flicker
  if (!isLoaded && typeof window !== 'undefined') {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);