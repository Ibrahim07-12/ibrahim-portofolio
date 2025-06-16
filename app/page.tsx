"use client";
import { useScroll, useTransform, MotionValue } from "framer-motion";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Lanyard from "./components/Lanyard/Lanyard";
import SplitText from "./components/SplitText/SplitText";
import BlurText from "./components/BlurText/BlurText";
import AnimatedContent from "./components/AnimatedContent/AnimatedContent";
import Aurora from "./components/Aurora/Aurora";
import SplashCursor from "./components/SplashCursor/SplashCursor";
import GradientText from "./components/GradientText/GradientText";
import ScrollVelocity from "./components/ScrollVelocity/ScrollVelocity";
import { Timeline } from "./components/Timelines/Timeline";
import PixelCard from "./components/PixelCard/PixelCard";
import FlowingMenu from "./components/FlowingMenu/FlowingMenu";
import CardSwap, { Card as SwapCard } from "./components/CardSwap/CardSwap";
import { BackgroundBoxes } from "./components/BoxesCore/BoxesCore";
import GlitchText from "./components/GlitchText/GlitchText";
import Beams from "./components/Beams/Beams";
import { LampDemo, LampContainer } from "./components/lamp/lamp";
import { MacbookScroll } from "./components/MacbookScroll/MacbookScroll";
import { GoogleGeminiEffect } from "./components/googleGemini/google-gemini-effect";
import { ThreeDMarquee } from "./components/3Dmarquee/3d-marquee";
import Particles from "./components/Particles/Particles";
import { CardContainer, CardBody, CardItem } from "./components/3DCard/3d-card";
import { LinkPreview } from "./components/LinkPreview/link-preview";
import { StickyScroll } from "./components/stickyscroll/sticky-scroll-reveal";
import { LayoutGrid } from "./components/layoutgrid/layout-grid";
import GridDistortion from "./components/GridDistortion/GridDistortion";
import { AnimatedTestimonials } from "./components/animated/animated-testimonials";
import WeatherTime from "./components/weathertime/weathertime";
import { FloatingNav } from "./components/floatingnavbar/floatingnavbar";
import { ProjectModal } from "./components/ProjectModal/ProjectModal";
import { projectsData, type ProjectData } from "./data/projects";
import { AudioPlayer } from "./components/AudioPlayer/AudioPlayer";
import { BackgroundGradient } from "./components/backgroundgradient/backgroundgradient";
import { BackgroundBeamsWithCollision } from "./components/background-beams-with-collision/background-beams-with-collision";
import RollingGallery from "./components/RollingGallery/RollingGallery";
import {
  IconHome,
  IconMessage,
  IconUser,
  IconBriefcase,
  IconCode,
  IconCertificate,
  IconTrophy,
  IconBuilding,
  IconBook,
} from "@tabler/icons-react";
export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 🔧 TAMBAH: Function untuk smooth transition
  const changeTestimonial = (newIndex: number) => {
    if (isTransitioning) return; // Prevent multiple clicks during transition

    setIsTransitioning(true);

    // Start fade out
    setTimeout(() => {
      setCurrentTestimonial(newIndex);

      // Complete transition
      setTimeout(() => {
        setIsTransitioning(false);
      }, 350);
    }, 350);
  };

  const [selectedProject, setSelectedProject] = useState<
    keyof typeof projectsData | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 🔧 PERBAIKI: Ubah parameter menjadi string, lalu convert ke keyof typeof projectsData
  const handleProjectClick = (slug: string) => {
    console.log("🚀 handleProjectClick called with slug:", slug);
    console.log("📦 Available projects:", Object.keys(projectsData));

    // Type assertion untuk memastikan slug adalah valid key
    const projectKey = slug as keyof typeof projectsData;

    // Validasi apakah slug ada dalam projectsData
    if (projectKey in projectsData) {
      console.log("📋 Project data for slug:", projectsData[projectKey]);
      setSelectedProject(projectKey);
      setIsModalOpen(true);
    } else {
      console.error("❌ Project not found:", slug);
    }
  };

  const handleCloseModal = () => {
    console.log("🔒 Closing modal");
    setIsModalOpen(false);
    setSelectedProject(null);
  };
  const navItems = [
    {
      name: "Dashboard",
      link: "#dashboard",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Education",
      link: "#Education",
      icon: <IconBook className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Work",
      link: "#work",
      icon: <IconBook className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Organizational",
      link: "#organizational",
      icon: (
        <IconBuilding className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Projects",
      link: "#projects",
      icon: <IconCode className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Certifications",
      link: "#certifications",
      icon: (
        <IconCertificate className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Achievements",
      link: "#achievements",
      icon: <IconTrophy className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  const testimonials = [
    {
      quote:
        "Essential suite for creating documents, spreadsheets, and presentations in a professional setting.",
      name: "Microsoft Office",
      src: "./images/logo/ms-office.png",
    },
    {
      quote:
        "A lightweight and flexible code editor with extensive language and extension support.",
      name: "Visual Studio Code",
      src: "./images/logo/vscode.png",
    },
    {
      quote:
        "An interactive web-based platform for coding, data analysis, and machine learning in Python.",
      name: "Jupyter Notebook",
      src: "./images/logo/jupyter.png",
    },
    {
      quote:
        "A simple and classic IDE for C/C++ programming, ideal for learning and basic development.",
      name: "Dev C++",
      src: "./images/logo/dev-cpp.png",
    },
    {
      quote:
        "A simulation tool for electronic circuits and microcontrollers, used to test designs virtually.",
      name: "Proteus",
      src: "./images/logo/proteus.png",
    },
    {
      quote:
        "An open-source development environment for writing and uploading code to Arduino boards using simplified C/C++.",
      name: "Arduino IDE",
      src: "./images/logo/arduino.png",
    },
    {
      quote:
        "A PCB design software from Autodesk, used for creating and testing electronic circuit layouts.",
      name: "EAGLE",
      src: "./images/logo/eagle.png",
    },
    {
      quote:
        "A powerful network simulator for designing, configuring, and visualizing network topologies.",
      name: "Cisco Packet Tracer",
      src: "./images/logo/cisco.png",
    },
    {
      quote:
        "A programming tool for Omron PLCs, commonly used in industrial automation systems.",
      name: "CX Programmer",
      src: "./images/logo/cx-programmer.png",
    },
    {
      quote:
        "A numerical computing environment used for simulations, mathematical modeling, and data processing.",
      name: "Matlab",
      src: "./images/logo/matlab.png",
    },
    {
      quote:
        "Simulation software for pneumatic, hydraulic, and electrical systems, widely used in automation.",
      name: "FluidSIM",
      designation: "",
      src: "./images/logo/fluidsim.png",
    },
  ];
  // Update content untuk menghilangkan text content saat image diklik
  const content = [
    {
      title:
        "Excellent Team Award in the 2024 National Level Indonesian Flying Robot Contest: Racing Planet Division",
      description:
        "The Indonesian Flying Robot Contest is a competition organized by the Ministry of Education, Culture, Research, and Technology (Kemendikbudristek) through the Indonesian Talent Development Center and National Achievement Center. This prestigious competition aims to enhance students' creativity and skills in aviation technology.",
      layoutGridCards: [
        {
          id: 1,
          content: null, // Hapus content text
          className: "md:col-span-2",
          thumbnail: "./images/experience/KRTI/fwefg.jpeg",
        },
        {
          id: 2,
          content: null, // Hapus content text
          className: "col-span-1",
          thumbnail: "./images/experience/KRTI/krti-2.jpeg",
        },
        {
          id: 3,
          content: null, // Hapus content text
          className: "col-span-1",
          thumbnail: "./images/experience/KRTI/krti-3.jpeg",
        },
        {
          id: 4,
          content: null, // Hapus content text
          className: "md:col-span-2",
          thumbnail: "./images/experience/KRTI/krti-trophy.jpg",
        },
      ],
    },
    {
      title: "Participation in the Polines Robot Competition 2024",
      description:
        "Polines Robotic Contest (PRC) is a national level robotics competition held by the Student Activity Unit for Science Development of Semarang State Polytechnic.",
      layoutGridCards: [
        {
          id: 1,
          content: null, // Hapus content text
          className: "md:col-span-2",
          thumbnail: "./images/experience/polines/polines-1.jpeg",
        },
        {
          id: 2,
          content: null, // Hapus content text
          className: "col-span-1",
          thumbnail: "./images/experience/polines/polines-2.jpeg",
        },
        {
          id: 3,
          content: null, // Hapus content text
          className: "col-span-1",
          thumbnail: "./images/experience/polines/polines-3.jpeg",
        },
        {
          id: 4,
          content: null, // Hapus content text
          className: "md:col-span-2",
          thumbnail: "./images/experience/polines/RETANK-1_page-0001 (1).jpg",
        },
      ],
    },
    {
      title:
        "Finalist Race Work Write National Scientific Electrolympic UPNVJ 2024",
      description:
        "Electrolympic 2024 is event competition open in the field academic and non- academic are one of them is Work write scientific that canfollowed by all student active with the theme Utilization Technology For Lifestyle Sustainable in the Era of Society 5.0.",
      layoutGridCards: [
        {
          id: 1,
          content: null, // Hapus content text
          className: "md:col-span-2",
          thumbnail: "./images/experience/lktin/lkti-1.jpg",
        },
        {
          id: 2,
          content: null, // Hapus content text
          className: "col-span-1",
          thumbnail: "./images/experience/lktin/lkti-2.jpeg",
        },
        {
          id: 3,
          content: null, // Hapus content text
          className: "col-span-1",
          thumbnail: "./images/experience/lktin/traffic-light-1.jpeg",
        },
        {
          id: 4,
          content: null, // Hapus content text
          className: "md:col-span-2",
          thumbnail: "./images/experience/lktin/traffic-light-2.jpeg",
        },
      ],
    },
    {
      title:
        "Outstanding Student Award in Academic Reasoning at Yogyakarta State University 2025",
      description: "",
      layoutGridCards: [
        {
          id: 1,
          content: null, // Hapus content text
          className: "md:col-span-2",
          thumbnail:
            "./images/experience/mapres/Sertifikat Penghargaan Mahasiswa Berprestasi di bidang penalaran_page-0001 (1).jpg",
        },
      ],
    },
  ];
  // Setup scroll tracking untuk seluruh halaman
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Path lengths untuk efek biru yang mengikuti scroll halaman
  const bluePathLengths: MotionValue<number>[] = [
    useTransform(scrollYProgress, [0, 0.5], [0, 1]), // Path 1
    useTransform(scrollYProgress, [0.5, 1], [0, 1]), // Path 2
  ];

  const images = [
    "./images/about/drone-training-1.jpeg",
    "./images/about/drone-training-3.jpeg",
    "./images/about/WhatsApp Image 2025-05-06 at 10.39.05.jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.43.jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.45.jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.47.jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.48.jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.49 (1).jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.49.jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.50 (1).jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.50 (2).jpeg",
    "./images/about/bubi.jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.51 (1).jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.51 (2).jpeg",
    "./images/about/bubu.jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.52 (1).jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.52.jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.53 (1).jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.53 (2).jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.53.jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.54 (1).jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.54 (2).jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.54 (3).jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.54.jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.56 (1).jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.56 (2).jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.53.56.jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.55.51.jpeg",
    "./images/about/WhatsApp Image 2025-06-13 at 23.56.45.jpeg",
    "./images/about/WhatsApp Image 2025-06-14 at 00.00.35.jpeg",
    "./images/about/WhatsApp Image 2025-06-14 at 00.01.18.jpeg",
  ];
  // Transform scroll progress menjadi path lengths untuk 5 paths
  // Path akan muncul secara bertahap mengikuti scroll
  const pathLengths: MotionValue<number>[] = [
    useTransform(scrollYProgress, [0, 0.2], [0, 1]), // Path 1: Hero section
    useTransform(scrollYProgress, [0.2, 0.4], [0, 1]), // Path 2: Timeline section
    useTransform(scrollYProgress, [0.4, 0.6], [0, 1]), // Path 3: Organizations section
    useTransform(scrollYProgress, [0.6, 0.8], [0, 1]), // Path 4: MacBook section
    useTransform(scrollYProgress, [0.8, 1], [0, 1]), // Path 5: Final section
  ];

  const cardData = [
    {
      src: "./images/project/Lampu Lalu Lintas Cerdas Berbasis YOLO/project-traffic-light.jpeg", // Consider updating this image
      title: "Smart Traffic Light System",
      category: "Computer Vision & IoT",
      slug: "smart-traffic-light",
    },
    {
      src: "./images/project/Line Follower/project-line-follower.jpg",
      title: "Robotics",
      category: "Robotics",
      slug: "robotics-project",
    },
    {
      src: "./images/project/Sistem Otomasi Rumah Berbasis Mikrokontroler/project-home-automation.jpeg",
      title: "Home Automation System",
      category: "IoT",
      slug: "home-automation-project",
    },
    {
      src: "./images/project/door automation/door-auto-1.jpeg",
      title: "Automatic Door System",
      category: "Smart Systems",
      slug: "automatic-door-project",
    },
    {
      src: "./images/project/sistem deteksi gas/project-gas-detection.jpeg", // Consider updating this image
      title: "Gas Detection System",
      category: "Industrial Automation",
      slug: "gas-detection-system",
    },
    {
      src: "./images/project/Sistem Deteksi dan Pengenalan Wajah dengan Face Recognition dan YuNet/project-self-balancing.jpg", // Consider updating this image
      title: "Face Recognition System",
      category: "Computer Vision",
      slug: "face-recognition-system",
    },
  ];
  const demoItems = [
    {
      link: "#",
      text: "Organizational experience",
      image: "./images/menu/organi.jpeg",
    },
  ];
  const demoItems1 = [
    {
      link: "#",
      text: "My Projects",
      image: "./images/menu/project.jpeg",
    },
  ];
  const demoItems2 = [
    {
      link: "#",
      text: "Certifications",
      image: "./images/menu/certif.jpeg",
    },
  ];
  const demoItems3 = [
    {
      link: "#",
      text: "Achievements",
      image: "./images/menu/achieve.jpeg",
    },
  ];
  const demoItems4 = [
    {
      link: "#",
      text: "Tools Skill",
      image: "./images/menu/tools.jpeg",
    },
  ];
   const demoItems5 = [
    {
      link: "#",
      text: "Work Experience",
      image: "./images/menu/work.jpeg",
    },
  ];
  const data = [
    {
      title: "2022 - Present",
      content: (
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left side: Enhanced Text Content with Cards */}
          <div className="flex-1 order-2 lg:order-1 space-y-6">
            {/* Main University Card */}
            <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition duration-300">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    D4 Teknik Elektronika
                  </h3>
                  <p className="text-sm text-gray-300">
                    Yogyakarta State University
                  </p>
                </div>
              </div>

              {/* Status and Duration */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400 font-semibold">
                    Currently Studying
                  </span>
                </div>
                <span className="text-sm text-blue-400 font-medium">
                  2022 - Present
                </span>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                Focusing on advanced automation, IoT systems, robotics, and
                intelligent control technologies with strong emphasis on
                practical implementation.
              </p>
            </div>

            {/* GPA Achievement Card */}
            <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-xl rounded-xl p-5 border border-green-500/30 hover:border-green-400/50 transition-all duration-500 group">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">
                    Academic Excellence
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Cumulative GPA 5th Semester
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-400 group-hover:scale-110 transition-transform duration-300">
                    3.7
                  </div>
                  <div className="text-xs text-gray-300">/ 4.0</div>
                </div>
              </div>
            </div>

            {/* Subjects Grid */}
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-xl p-5 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-xl">📚</span>
                Key Subjects
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Network Computers",
                  "IoT Systems",
                  "Robotics",
                  "Smart Control",
                  "Telemetry",
                  "Artificial Intelligence",
                  "PLC",
                  "Microcontroller",
                  "Microprocessor",
                  "Power Electronics",
                  "Instrumentation",
                  "Automation",
                ].map((subject, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-gray-200 hover:bg-white/20 transition duration-300 cursor-default transform hover:scale-105 text-center border border-white/10"
                  >
                    {subject}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side: Enhanced Image with Floating Elements */}
          <div className="flex-shrink-0 order-1 lg:order-2 relative">
            {/* Decorative Background */}
            <div className="absolute -inset-12 opacity-30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-green-500 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>

            {/* Main Logo Container */}
            <div className="relative group">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition duration-700 animate-pulse"></div>
              <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl transform group-hover:scale-105 transition duration-700 bg-transparent backdrop-blur-sm">
                <img
                  src="/images/pendidikan/uny-logo.png"
                  alt="UNY Logo"
                  className="w-full h-full object-contain p-8 transition-all duration-500 group-hover:scale-110"
                />
              </div>

              {/* Floating Info Badges */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl animate-bounce">
                🎯 5th Semester
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl animate-bounce delay-300">
                ⭐ 3.7 GPA
              </div>
              <div className="absolute top-1/4 -left-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                🚀 2022-Present
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2020 - 2022",
      content: (
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left side: Enhanced Image */}
          <div className="flex-shrink-0 order-1 relative">
            {/* Background Effects */}
            <div className="absolute -inset-10 opacity-25">
              <div className="absolute top-0 left-0 w-28 h-28 bg-orange-500 rounded-full blur-2xl animate-pulse delay-200"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-red-500 rounded-full blur-xl animate-pulse delay-700"></div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border-4 border-white/25 shadow-xl transform group-hover:scale-105 transition duration-500 bg-transparent backdrop-blur-sm">
                <img
                  src="/images/pendidikan/man-bekasi-logo.png"
                  alt="MAN Bekasi Logo"
                  className="w-full h-full object-contain p-6 transition-all duration-500 group-hover:scale-110"
                />
              </div>

              {/* Achievement Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                🏆 89.21
              </div>
            </div>
          </div>

          {/* Right side: Enhanced Text Content */}
          <div className="flex-1 order-2 space-y-6">
            {/* School Info Card */}
            <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:bg-orange-500/30 transition duration-300">
                  <span className="text-2xl">🏫</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    MAN 1 Bekasi
                  </h3>
                  <p className="text-sm text-gray-300">Science Program (IPA)</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-orange-400 font-semibold">
                    Completed
                  </span>
                </div>
                <span className="text-sm text-orange-400 font-medium">
                  2020 - 2022
                </span>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                Specialized in Natural Sciences with focus on Mathematics,
                Physics, Chemistry, and Biology. Built strong foundation in
                analytical thinking and scientific methodology.
              </p>
            </div>

            {/* Achievement Card */}
            <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 backdrop-blur-xl rounded-xl p-5 border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-500 group">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">
                    Academic Achievement
                  </h4>
                  <p className="text-gray-300 text-sm">Final Semester Score</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                    89.21
                  </div>
                  <div className="text-xs text-gray-300">/ 100</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full">
      {/* FloatingNav Component */}
      <FloatingNav navItems={navItems} />
      <AudioPlayer />
      <div
        ref={containerRef}
        className="min-h-screen overflow-x-hidden relative"
      >
        {/* GoogleGeminiEffect sebagai fixed bottom overlay - di atas semua konten */}
        <div
          className="fixed left-0 w-full z-[9999] pointer-events-none"
          style={{ bottom: "-44px" }}
        >
          <GoogleGeminiEffect
            pathLengths={bluePathLengths}
            className="w-full h-32"
          />
        </div>

        {/* Hapus pb-32 dan ganti dengan pb-0 atau tanpa padding bottom */}
        <div className="relative z-10">
          <div
            id="dashboard"
            className="relative bg-[#1F2937] h-screen overflow-hidden"
          >
            {/* 3D Marquee sebagai Background penuh */}
            <div className="absolute inset-0 w-[120%] h-full -left-[20%]">
              {" "}
              {/* Increased left shift to -15% and width to 120% */}
              <div className="w-full h-full rounded-none bg-gray-950/5 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
                <ThreeDMarquee images={images} />
              </div>
            </div>

            {/* Overlay gelap untuk readability */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            {/* Lanyard - Floating Left */}
            <div className="absolute left-8 top-0 w-1/2 h-full z-20">
              <Lanyard position={[0, 0, 11]} gravity={[0, -150, 0]} />
            </div>

            {/* Text Content - Floating Right */}
            <div className="absolute right-8 top-0 w-1/2 h-full flex items-center z-20">
              <div className="flex flex-col gap-6 max-w-2xl">
                <AnimatedContent
                  distance={150}
                  direction="horizontal"
                  reverse={false}
                  duration={1.2}
                  ease="bounce.out"
                  initialOpacity={0.2}
                  animateOpacity
                  scale={1.1}
                  threshold={0.2}
                  delay={0.3}
                >
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl text-white font-bold">
                      I'm Ready For Job
                    </h1>
                  </div>
                </AnimatedContent>

                <div className="flex flex-col items-start">
                  <SplitText
                    text="I'm Muhammad Ibrahim Musyaffa"
                    className="text-4xl font-semibold text-start text-white"
                    delay={50}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                  />
                  <SplitText
                    text="Mahasiswa D4 Teknik Elektronika"
                    className="text-4xl font-semibold text-start text-[#6366F1]"
                    delay={75}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                  />
                </div>

                <BlurText
                  text="I am a student at Yogyakarta State University specializing in robotics, AI, machine learning, IoT, software development, and UAV technology. I'm a visionary problem-solver with strong teamwork skills, passionate about driving technological innovation that creates positive social impact."
                  delay={75}
                  animateBy="words"
                  direction="top"
                  className="text-2xl mb-8 text-white"
                />

                <div className="flex items-center">
                  <div
                    className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
                    onClick={() => {
                      document.getElementById("contact")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    <GradientText
                      colors={[
                        "#6366F1",
                        "#3B82F6",
                        "#0EA5E9",
                        "#3B82F6",
                        "#6366F1",
                      ]}
                      animationSpeed={3}
                      showBorder={false}
                      className="px-10 py-6 rounded-lg border"
                    >
                      Contact Me
                    </GradientText>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ScrollVelocity - Bottom */}
          <div className="relative w-full bg-black z-30">
            <ScrollVelocity
              texts={["My Portfolio", "Scroll Down"]}
              className="custom-scroll-text text-white"
            />
          </div>

          {/* Education Section */}
          <div id="Education" className="relative group">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-[1]">
              <PixelCard
                variant="pink"
                className="w-full h-full"
                speed={80}
                gap={6}
                colors="#fecdd3,#fda4af,#e11d48"
                noFocus={false}
              >
                <div className="w-full h-full" />
              </PixelCard>
            </div>

            <div className="relative z-[2]">
              <Timeline data={data} />
            </div>
          </div>

          <div
            style={{ height: "100px", position: "relative" }}
            className="bg-black"
          >
            <FlowingMenu items={demoItems5} />
          </div>

          {/* work Experience Section */}
          <BackgroundBeamsWithCollision className="py-16">
            {/* Content Container */}
            <div id="work" className="container mx-auto relative z-20">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-10 px-6">
                {/* Left Container - Text */}
                <div className="lg:w-1/2 space-y-6">
                  {/* Removed "Work Experience" heading */}

                  {/* Internship Information Card */}
                  <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                      <div className="flex items-center gap-4">
                        {/* Logo Container */}
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg border border-white/20 bg-white/5 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          <img
                            src="./images/logo/AMNS.png"
                            className="w-[90%] h-[90%] object-contain"
                          />
                        </div>

                        <h3 className="text-2xl font-bold text-white">
                          PT AM/NS Indonesia
                        </h3>
                      </div>

                      {/* Wider date badge with min-width to prevent wrapping */}
                      <span className="px-5 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium whitespace-nowrap min-w-[180px] text-center">
                        Feb 2025 - May 2025
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-emerald-400 font-medium">
                        Electrical Engineer Internship
                      </span>
                      <span className="text-sm text-gray-400">
                        • Bekasi, Indonesia
                      </span>
                    </div>

                    <p className="text-gray-300 text-base mb-4 leading-relaxed">
                      PT AM/NS Indonesia is a manufacturing company that
                      processes cold-rolled steel, galvanized steel, and
                      annealed steel in sheet and coil forms.
                    </p>

                    <h4 className="text-white font-semibold mb-2">
                      Key Responsibilities:
                    </h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        </div>
                        <p>
                          Analyzed thermocouple sensor functions in the
                          reheating tube furnace process on the continuous
                          galvanizing line to ensure optimal temperature control
                          in the galvanization process.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        </div>
                        <p>
                          Performed maintenance and repair of electrical
                          equipment including light repair, steel sheet counter
                          machine repair, regular panel voltage checks, assisted
                          with drive motor checks, motor greasing, and other
                          tasks to maintain operational reliability.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Container - Rolling Gallery with enhanced design */}
                <div className="lg:w-1/2 relative mt-8 lg:mt-0">
                  {/* Enhanced container with multiple effects */}
                  <div className="relative w-full h-[280px] md:h-[320px] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md shadow-2xl group">
                    {/* Animated border glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse"></div>

                    {/* Inner container with glass effect */}
                    <div className="relative w-full h-full rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm bg-white/5 z-10">
                      {/* Gradient overlay for better visibility */}
                      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                      {/* Decorative elements */}
                      <div className="absolute top-2 left-3 flex space-x-1.5 z-30">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-70"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-70"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-70"></div>
                      </div>

                      <div className="absolute top-3 right-3 text-xs text-white/50 z-30 font-mono">
                        Gallery View
                      </div>

                      {/* RollingGallery with improved spacing */}
                      <RollingGallery
                        autoplay={false}
                        pauseOnHover={true}
                        spacing={5} // Reduced spacing between images
                      />
                    </div>
                  </div>

                  {/* Enhanced decorative elements */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-blue-600 filter blur-[80px] opacity-10 z-0 animate-pulse"></div>
                  <div
                    className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-purple-600 filter blur-[80px] opacity-10 z-0 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>

                  {/* Decorative dots pattern */}
                  <div
                    className="absolute bottom-4 left-2 w-32 h-20 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                      backgroundSize: "10px 10px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </BackgroundBeamsWithCollision>
          {/* FlowingMenu */}
          <div
            style={{ height: "100px", position: "relative" }}
            className="bg-black"
          >
            <FlowingMenu items={demoItems} />
          </div>

          {/* Organizations Section */}
          <div
            id="organizational"
            className="min-h-screen py-10 bg-gradient-to-r from-[#0F172A] via-[#1F2937] to-[#111827] relative overflow-hidden"
          >
            <div className="absolute inset-0 z-0 mt-[400px]">
              <BackgroundBoxes />
            </div>
            <div className="container mx-auto grid grid-cols-2 gap-8 pt-20 mb-40">
              {/* Left side: Image and Text */}
              <div className="flex items-center gap-8 px-8  mt-16 ">
                {/* Circular Image */}
                <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-white/80 shadow-lg shadow-white/30 bg-white relative z-20">
                  <img
                    src="./images/organisasi/robotika-uny-logo.png"
                    alt="Robotika UNY"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-col space-y-4 relative z-20">
                  <h2 className="text-4xl font-bold text-white">
                    Robotika UNY
                  </h2>
                  <p className="text-lg text-gray-300">
                    UNY Robotics is a division of the Engineering Technology UKM
                    which operates in the field of technology, especially
                    robotics.
                  </p>
                </div>
              </div>

              {/* Right side: CardSwap */}
              <div className="relative mt-60 ">
                <CardSwap
                  position="left"
                  translateX="30%"
                  translateY="10%"
                  cardDistance={60}
                  verticalDistance={70}
                  delay={5000}
                  pauseOnHover={false}
                  className="ml-[20px]"
                >
                  <SwapCard>
                    <div className="rounded-lg overflow-hidden w-full h-full">
                      <img
                        src="./images/organisasi/robotika-1.jpeg"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwapCard>

                  <SwapCard>
                    <div className="rounded-lg overflow-hidden w-full h-full">
                      <img
                        src="./images/organisasi/robotika-2.jpeg"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwapCard>

                  <SwapCard>
                    <div className="rounded-lg overflow-hidden w-full h-full">
                      <img
                        src="./images/organisasi/robotika-3.jpeg"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwapCard>
                </CardSwap>
              </div>

              <div className="container mx-auto grid grid-cols-2 gap-8 pt-20">
                {/* Left side: CardSwap */}
                <div className="relative mt-40">
                  <CardSwap
                    position="right"
                    translateX="30%"
                    translateY="100%"
                    cardDistance={40}
                    verticalDistance={50}
                    delay={5000}
                    pauseOnHover={false}
                    className="-ml-[140px]"
                  >
                    <SwapCard>
                      <div className="rounded-lg overflow-hidden w-full h-full">
                        <img
                          src="./images/organisasi/WhatsApp Image 2025-06-14 at 19.30.15.jpeg"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </SwapCard>

                    <SwapCard>
                      <div className="rounded-lg overflow-hidden w-full h-full">
                        <img
                          src="./images/organisasi/hmve-1.jpeg"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </SwapCard>

                    <SwapCard>
                      <div className="rounded-lg overflow-hidden w-full h-full">
                        <img
                          src="./images/organisasi/hmve-2.jpeg"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </SwapCard>
                  </CardSwap>
                </div>

                {/* Right side: Image and Text */}
                <div className="flex items-center gap-8 px-8 mt-16 ml-[300px] relative z-20">
                  {/* Text Content */}
                  <div className="flex flex-col space-y-6 min-w-[400px] relative z-20">
                    <h2 className="text-4xl font-bold text-white text-right">
                      HMVE UNY
                    </h2>
                    <p className="text-lg text-gray-300 text-right whitespace-norma">
                      HMVE as a facilitator in developing academic and
                      non-academic interests, channeling aspirations, and
                      fostering a social spirit among Electrical and Electronics
                      Engineering students.
                    </p>
                  </div>

                  {/* Circular Image */}
                  <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-white/80 shadow-lg shadow-white/30 bg-white">
                    <img
                      src="./images/organisasi/hmve-logo.png"
                      alt="HMVE UNY"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FlowingMenu */}
          <div
            style={{ height: "100px", position: "relative" }}
            className="bg-black"
          >
            <FlowingMenu items={demoItems1} />
          </div>

          {/* MacBook Section */}
          <div id="projects" className="min-h-screen relative bg-black">
            <LampContainer className="w-full h-full">
              <div className="flex flex-col items-center w-screen">
                <div className="mt-[40vh] w-screen">
                  <LampDemo />
                </div>
                <div className="h-[200vh] -mt-[100vh] relative">
                  <MacbookScroll
                    title={<span></span>}
                    showGradient={true}
                    src="public/images/project/displaywindows11.png" // 🔧 TAMBAH: Background image untuk layar
                    cardItems={cardData}
                    onCardClick={handleProjectClick}
                  />
                </div>
              </div>
            </LampContainer>
          </div>

          {/* Final FlowingMenu - hapus margin/padding yang menyebabkan kotak putih */}
          <div
            style={{ height: "100px", position: "relative" }}
            className="bg-black"
          >
            <FlowingMenu items={demoItems2} />
          </div>
        </div>
        {/* Particles Section */}
        {/* Particles Section dengan multiple 3D Cards */}
        <div
          id="certifications"
          className="relative w-full h-[1500px] bg-black"
        >
          {/* Particles sebagai background */}
          <Particles
            particleColors={["#6366F1", "#3B82F6", "#0EA5E9"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />

          {/* Grid 3D Cards mengambang di atas Particles */}
          <div className="absolute inset-0 flex items-center justify-center z-10 p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <CardContainer className="inter-var">
                <CardBody className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative group/card hover:shadow-2xl hover:shadow-blue-500/[0.4] border-blue-500/30 w-auto sm:w-[25rem] h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-white"
                  >
                    Certification 1
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-slate-300 text-sm max-w-sm mt-4"
                  >
                    Drone Safety And Ethics Training Course And Pass The test
                    for Basic Drone Maneuvers
                  </CardItem>
                  <CardItem
                    translateZ="100"
                    className="w-full mt-6 relative z-10"
                  >
                    <img
                      src="./images/sertifikat/APDI _page-0001.jpg"
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-8 relative z-20">
                    <CardItem
                      translateZ={20}
                      as="div"
                      className="relative z-30"
                    >
                      <LinkPreview
                        url="https://member.apdi.id/search?number=322404180001"
                        className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-gray-100 transition-colors duration-200 inline-block relative z-40"
                      >
                        View Certification
                      </LinkPreview>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>

              {/* Card 2 */}
              <CardContainer className="inter-var">
                <CardBody className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative group/card hover:shadow-2xl hover:shadow-blue-500/[0.4] border-blue-500/30 w-auto sm:w-[25rem] h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-white"
                  >
                    Certification 2
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-slate-300 text-sm max-w-sm mt-4"
                  >
                    Fundamentals of Artificial Intelligence Implementation.
                  </CardItem>
                  <CardItem
                    translateZ="100"
                    className="w-full mt-6 relative z-10"
                  >
                    <img
                      src="./images/sertifikat/artifisial.jpg"
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="project 2"
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-8 relative z-20">
                    <CardItem
                      translateZ={20}
                      as="div"
                      className="relative z-30"
                    >
                      <LinkPreview
                        url="https://drive.google.com/file/d/1FGHWtcAOx-5gADC7wn3ZqjzNHGE5isys/view?usp=drive_link"
                        className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-gray-100 transition-colors duration-200 inline-block relative z-40"
                      >
                        View Certification
                      </LinkPreview>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>

              {/* Card 3 */}
              <CardContainer className="inter-var">
                <CardBody className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative group/card hover:shadow-2xl hover:shadow-blue-500/[0.4] border-blue-500/30 w-auto sm:w-[25rem] h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-white"
                  >
                    Certification 3
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-slate-300 text-sm max-w-sm mt-4"
                  >
                    Backend in Website Development.
                  </CardItem>
                  <CardItem
                    translateZ="100"
                    className="w-full mt-6 relative z-10"
                  >
                    <img
                      src="./images/sertifikat/backend.jpg"
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="project 3"
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-8 relative z-20">
                    <CardItem
                      translateZ={20}
                      as="div"
                      className="relative z-30"
                    >
                      <LinkPreview
                        url="https://drive.google.com/file/d/1C-qqs5tpuQjiMM8U8KhAaNOtvbgMHgSU/view?usp=drivesdk"
                        className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-gray-100 transition-colors duration-200 inline-block relative z-40"
                      >
                        View Certification
                      </LinkPreview>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>

              {/* Card 4 */}
              <CardContainer className="inter-var">
                <CardBody className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative group/card hover:shadow-2xl hover:shadow-blue-500/[0.4] border-blue-500/30 w-auto sm:w-[25rem] h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-white"
                  >
                    Certification 4
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-slate-300 text-sm max-w-sm mt-4"
                  >
                    Getting Started with Java Programming.
                  </CardItem>
                  <CardItem
                    translateZ="100"
                    className="w-full mt-6 relative z-10"
                  >
                    <img
                      src="./images/sertifikat/java.jpg"
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="project 4"
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-8 relative z-20">
                    <CardItem
                      translateZ={20}
                      as="div"
                      className="relative z-30"
                    >
                      <LinkPreview
                        url="https://www.dicoding.com/certificates/4EXGV0K1QXRL"
                        className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-gray-100 transition-colors duration-200 inline-block relative z-40"
                      >
                        View Certification
                      </LinkPreview>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>

              {/* Card 5 */}
              <CardContainer className="inter-var">
                <CardBody className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative group/card hover:shadow-2xl hover:shadow-blue-500/[0.4] border-blue-500/30 w-auto sm:w-[25rem] h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-white"
                  >
                    Certification 5
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-slate-300 text-sm max-w-sm mt-4"
                  >
                    Linear Models in Machine Learning: Fundamentals.
                  </CardItem>
                  <CardItem
                    translateZ="100"
                    className="w-full mt-6 relative z-10"
                  >
                    <img
                      src="./images/sertifikat/linearML.jpg"
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="project 5"
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-8 relative z-20">
                    <CardItem
                      translateZ={20}
                      as="div"
                      className="relative z-30"
                    >
                      <LinkPreview
                        url="https://drive.google.com/file/d/1JMUljVS43GyUNsW2pbMVE9ELnzyNCTXt/view?usp=drive_link"
                        className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-gray-100 transition-colors duration-200 inline-block relative z-40"
                      >
                        View Certification
                      </LinkPreview>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>

              {/* Card 6 */}
              <CardContainer className="inter-var">
                <CardBody className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative group/card hover:shadow-2xl hover:shadow-blue-500/[0.4] border-blue-500/30 w-auto sm:w-[25rem] h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-white"
                  >
                    Certification 6
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-slate-300 text-sm max-w-sm mt-4"
                  >
                    Young Network Administrator Competency Certificate.
                  </CardItem>
                  <CardItem
                    translateZ="100"
                    className="w-full mt-6 relative z-10"
                  >
                    <img
                      src="./images/sertifikat/network.jpg"
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="project 6"
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-8 relative z-20">
                    <CardItem
                      translateZ={20}
                      as="div"
                      className="relative z-30"
                    >
                      <LinkPreview
                        url="https://drive.google.com/file/d/1LKeS9uEfsTwqINOVKv-6TC3qBdl713Rv/view?usp=sharing"
                        className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-gray-100 transition-colors duration-200 inline-block relative z-40"
                      >
                        View Certification
                      </LinkPreview>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </div>
          </div>
        </div>
        <div
          style={{ height: "100px", position: "relative" }}
          className="bg-black"
        >
          <FlowingMenu items={demoItems3} />
        </div>
        <div id="achievements">
          <StickyScroll content={content} />
        </div>
        <div
          style={{ height: "100px", position: "relative" }}
          className="bg-black"
        >
          <FlowingMenu items={demoItems4} />
        </div>
        {/* GridDistortion dengan mouse interaction yang benar */}
        <div className="relative w-full min-h-screen">
          {/* GridDistortion background */}
          <GridDistortion
            imageSrc="./images/pendidikan/unykampus.jpeg"
            grid={10}
            mouse={0.3}
            strength={0.25}
            relaxation={0.8}
            className="absolute inset-0 w-full h-full"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

          {/* 🔧 CLEAN: Testimonials section yang lebih simple */}
          <div className="relative z-10 flex items-center justify-center min-h-screen pointer-events-none">
            <div className="w-full max-w-5xl mx-auto p-6 pointer-events-none">
              <div className="relative pointer-events-none">
                {/* Subtle glow */}
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-xl blur-lg pointer-events-none"></div>

                {/* Clean container */}
                <div className="relative backdrop-blur-2xl bg-black/85 rounded-lg px-8 py-6 border border-white/30 shadow-xl pointer-events-auto">
                  {/* Custom Testimonials dengan ukuran lebih kecil */}
                  <div className="testimonials-wrapper">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 max-w-5xl mx-auto">
                      {/* Image dengan BackgroundGradient - smooth state transitions & ukuran diperbaiki */}
                      <div className="flex-shrink-0 relative overflow-hidden">
                        <div
                          className={`transition-all duration-500 ease-in-out transform ${
                            isTransitioning
                              ? "opacity-0 scale-95 translate-x-4"
                              : "opacity-100 scale-100 translate-x-0"
                          }`}
                        >
                          <BackgroundGradient className="rounded-[18px] p-1 bg-white dark:bg-zinc-900">
                            <div className="w-32 h-32 md:w-40 md:h-40 bg-white dark:bg-zinc-900 rounded-2xl p-4 flex items-center justify-center">
                              <img
                                src={testimonials[currentTestimonial].src}
                                alt={testimonials[currentTestimonial].name}
                                className="w-full h-full object-contain transition-all duration-300 ease-out hover:scale-105"
                              />
                            </div>
                          </BackgroundGradient>
                        </div>
                      </div>

                      {/* Text Content dengan smooth state transitions - tanpa navigasi */}
                      <div className="flex-1 flex flex-col justify-center space-y-4 max-w-2xl">
                        <div
                          className={`transition-all duration-500 ease-in-out transform ${
                            isTransitioning
                              ? "opacity-0 translate-y-4"
                              : "opacity-100 translate-y-0"
                          }`}
                        >
                          <blockquote className="text-lg md:text-xl font-medium text-white leading-relaxed">
                            "{testimonials[currentTestimonial].quote}"
                          </blockquote>
                        </div>

                        <div
                          className={`space-y-1 transition-all duration-500 ease-in-out transform delay-75 ${
                            isTransitioning
                              ? "opacity-0 translate-y-4"
                              : "opacity-100 translate-y-0"
                          }`}
                        >
                          <h4 className="text-lg font-bold text-white">
                            {testimonials[currentTestimonial].name}
                          </h4>
                          <p className="text-gray-300 text-xs">
                            {testimonials[currentTestimonial].designation}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 🔧 TAMBAH: Navigation Section - Fixed position di bawah */}
                    <div className="flex flex-col items-center gap-4 mt-8 pt-6 border-t border-white/10">
                      {/* Navigation buttons dengan posisi tetap */}
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() =>
                            changeTestimonial(
                              (currentTestimonial - 1 + testimonials.length) %
                                testimonials.length
                            )
                          }
                          disabled={isTransitioning}
                          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/15 border border-white/30 text-white hover:bg-white/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-out backdrop-blur-10 hover:scale-110 hover:shadow-xl hover:shadow-white/20 active:scale-95"
                        >
                          <svg
                            className="w-5 h-5 transition-transform duration-300 ease-out group-hover:-translate-x-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() =>
                            changeTestimonial(
                              (currentTestimonial + 1) % testimonials.length
                            )
                          }
                          disabled={isTransitioning}
                          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/15 border border-white/30 text-white hover:bg-white/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-out backdrop-blur-10 hover:scale-110 hover:shadow-xl hover:shadow-white/20 active:scale-95"
                        >
                          <svg
                            className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Progress indicators dengan posisi tetap */}
                      <div className="flex gap-2 justify-center">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => changeTestimonial(index)}
                            disabled={isTransitioning}
                            className={`w-2 h-2 rounded-full transition-all duration-400 ease-out transform hover:scale-150 disabled:cursor-not-allowed ${
                              index === currentTestimonial
                                ? "bg-white scale-125 shadow-lg shadow-white/30"
                                : "bg-white/40 hover:bg-white/70 scale-100"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced CSS untuk ultra-smooth animations */}
                  <style jsx global>{`
                    .testimonials-wrapper {
                      width: 100%;
                      max-width: 800px;
                      margin: 0 auto;
                    }

                    /* Ultra-smooth easing curves */
                    .testimonials-wrapper * {
                      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                    }

                    /* Enhanced button interactions */
                    .testimonials-wrapper button:not(:disabled):hover {
                      transform: scale(1.1);
                      box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
                    }

                    .testimonials-wrapper button:not(:disabled):active {
                      transform: scale(0.95);
                      transition-duration: 0.1s;
                    }

                    /* Smooth text selection prevention during transitions */
                    .testimonials-wrapper.transitioning {
                      user-select: none;
                      pointer-events: none;
                    }

                    .testimonials-wrapper.transitioning button {
                      pointer-events: auto;
                    }
                  `}</style>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Contact */}
        <footer
          id="contact"
          className="bg-gray-900 lg:grid lg:grid-cols-5 relative overflow-hidden"
        >
          {/* Background image dengan Weather Widget */}
          <div className="relative block h-32 lg:col-span-2 lg:h-full">
            <img
              src="https://images.unsplash.com/photo-1642370324100-324b21fab3a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
              alt="Contact Background"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-transparent"></div>

            {/* Weather & Time Widget */}
            <div className="absolute top-6 left-6">
              <WeatherTime />
            </div>
          </div>

          {/* Contact Information dengan padding yang lebih kecil */}
          <div className="px-4 py-8 sm:px-6 lg:col-span-3 lg:px-8 bg-gray-900">
            {/* Header dengan margin yang lebih kecil */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Let's Connect
              </h2>
              <p className="text-gray-300 text-sm">
                Ready to collaborate? Reach out and let's build something
                amazing together.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Contact Details */}
              <div>
                <p>
                  <span className="text-xs tracking-wide text-gray-400 uppercase">
                    Call us
                  </span>
                  <a
                    href="tel:+6281293478458"
                    className="block text-xl font-medium text-white hover:opacity-75 sm:text-2xl transition-all duration-300 hover:text-blue-400"
                  >
                    +62 812-9347-8458
                  </a>
                </p>

                {/* Enhanced Social Links dengan spacing yang lebih kompak */}
                <ul className="mt-6 flex gap-3">
                  {/* GitHub */}
                  <li>
                    <a
                      href="https://github.com/yourusername"
                      rel="noreferrer"
                      target="_blank"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-300 transition-all duration-300 hover:bg-gray-700 hover:text-white hover:scale-110"
                      title="GitHub"
                    >
                      <span className="sr-only">GitHub</span>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>

                  {/* LinkedIn */}
                  <li>
                    <a
                      href="https://www.linkedin.com/in/muhammadibrahimmusyaffa"
                      rel="noreferrer"
                      target="_blank"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-300 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-110"
                      title="LinkedIn"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </li>

                  {/* Instagram */}
                  <li>
                    <a
                      href="https://www.instagram.com/ibrahimusyaffa?igsh=MWsxZHBnbHhuOXE3Ng=="
                      rel="noreferrer"
                      target="_blank"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-300 transition-all duration-300 hover:bg-pink-600 hover:text-white hover:scale-110"
                      title="Instagram"
                    >
                      <span className="sr-only">Instagram</span>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </li>

                  {/* WhatsApp */}
                  <li>
                    <a
                      href="https://wa.me/6285281184943"
                      rel="noreferrer"
                      target="_blank"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-300 transition-all duration-300 hover:bg-green-600 hover:text-white hover:scale-110"
                      title="WhatsApp"
                    >
                      <span className="sr-only">WhatsApp</span>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                    </a>
                  </li>

                  {/* Email */}
                  <li>
                    <a
                      href="mailto:ibrahimusyaffa@gmail.com"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-300 transition-all duration-300 hover:bg-red-600 hover:text-white hover:scale-110"
                      title="Email"
                    >
                      <span className="sr-only">Email</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Quick Contact Form dengan ukuran yang lebih kompak */}
              <div className="bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Quick Message
                </h3>
                <form
                  action="https://formsubmit.co/ibrahimusyaffa@gmail.com"
                  method="POST"
                  className="space-y-3"
                >
                  {/* FormSubmit Configuration */}
                  <input
                    type="hidden"
                    name="_subject"
                    value="New Contact Form Submission from Portfolio"
                  />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input
                    type="hidden"
                    name="_next"
                    value="https://yourdomain.com/thank-you"
                  />

                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={3}
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none text-sm"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-blue-300 text-sm"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Footer dengan margin yang lebih kecil */}
            <div className="mt-8 border-t border-gray-700 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-xs text-gray-400">
                  &copy; 2025 Muhammad Ibrahim Musyaffa. All rights reserved.
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Available for freelance work
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          projectData={projectsData[selectedProject] as ProjectData}
        />
      )}
    </div>
  );
}
