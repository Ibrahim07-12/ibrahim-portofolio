"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  Users,
  CheckCircle,
} from "lucide-react";
import { ProjectData } from "../../data/projects";

// Add this helper function to detect video files
const isVideo = (file: string) => {
  return file.toLowerCase().endsWith('.mp4') || file.toLowerCase().endsWith('.webm') || 
         file.toLowerCase().endsWith('.mov') || file.toLowerCase().endsWith('.avi');
};

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectData: ProjectData;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  projectData,
}) => {
  if (!projectData) {
    console.log("❌ ProjectModal: No project data provided");
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.3,
            }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          >
            <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-700">
              {/* Header */}
              <div className="relative">
                {/* Cover Image */}
                {projectData.images && projectData.images[0] && (
                  <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
                    <img
                      src={projectData.images[0]}
                      alt={projectData.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors duration-200 backdrop-blur-sm"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                      {projectData.category}
                    </span>
                    <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {projectData.status}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {projectData.title}
                  </h2>
                  <p className="text-gray-300">{projectData.description}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[calc(90vh-12rem)] overflow-y-auto">
                {/* Project Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Duration: {projectData.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">
                      Team: {projectData.teamSize}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {projectData.githubUrl && (
                      <a
                        href={projectData.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm">Code</span>
                      </a>
                    )}
                    {projectData.liveUrl && (
                      <a
                        href={projectData.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">Live</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    About This Project
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {projectData.longDescription}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {projectData.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {projectData.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-gray-300"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* My Tasks - NEW SECTION */}
                {projectData.myTasks && projectData.myTasks.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      My Contributions
                    </h3>
                    <ul className="space-y-2">
                      {projectData.myTasks.map((task, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-300"
                        >
                          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Gallery */}
                {projectData.images && projectData.images.length > 1 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Project Gallery
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {projectData.images.slice(1).map((media, index) => (
                        <div
                          key={index}
                          className="rounded-lg overflow-hidden bg-gray-800"
                        >
                          {isVideo(media) ? (
                            <video
                              src={media}
                              controls
                              className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                              poster={projectData.images[0]}
                            />
                          ) : (
                            <img
                              src={media}
                              alt={`${projectData.title} - Image ${index + 2}`}
                              className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
