import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TopNavbar = () => {
  const [activeTab, setActiveTab] = useState("hero-section");
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll hide/show effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Close menu on scroll down
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const targetPosition =
        element.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
      setActiveTab(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    {
      name: "Home",
      id: "hero-section",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      name: "Services",
      id: "service",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          />
        </svg>
      ),
    },
    {
      name: "Projects",
      id: "projects-section",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
          />
        </svg>
      ),
    },
    {
      name: "Team",
      id: "team-section",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
      ),
    },
    {
      name: "About",
      id: "about-section",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
      ),
    },
    {
      name: "Contact",
      id: "get-in-touch",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* 1. Left Logo - Independent */}
      <motion.div
        className="fixed top-5 left-5 md:left-12 z-[500]"
        initial={{ opacity: 0, x: -50 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          x: isVisible ? 0 : -50,
          y: isVisible ? 0 : -100,
        }}
        transition={{ duration: 0.3 }}
      >
        <img
          src="/texture.png"
          alt="NS Apps Innovations"
          className="h-8 md:h-14 w-auto drop-shadow-lg cursor-pointer"
          onClick={() => scrollToSection("hero-section")}
        />
      </motion.div>

      {/* 2. Center Navbar - Independent */}
      <motion.div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[500] transition-all duration-300 ${
          isMobileMenuOpen ? "w-[90%] md:w-auto" : "w-auto"
        }`}
        animate={{
          y: isVisible ? 0 : -120,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          {/* Outer glass border */}
          <div className="absolute inset-0 bg-transparent backdrop-blur-sm rounded-[2rem] border border-white shadow-[0_8px_32px_rgba(255,255,255,0.1)]"></div>

          {/* Inner layer */}
          <div className="absolute inset-[6px] bg-white/50 rounded-[1.7rem] shadow-[0_4px_16px_rgba(0,0,0,0.08)]"></div>

          {/* Navbar content */}
          <div className="relative px-2 py-2 flex flex-col items-center justify-center transition-all duration-300">
            {/* Mobile Toggle & Active Tab (When collapsed) */}
            <div className="flex items-center justify-between w-full md:w-auto md:hidden">
              {!isMobileMenuOpen && (
                <div className="flex items-center px-4 py-2 space-x-2">
                  <div className="p-1.5 bg-white/40 rounded-full">
                    {navItems.find((item) => item.id === activeTab)?.icon}
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {navItems.find((item) => item.id === activeTab)?.name ||
                      "Menu"}
                  </span>
                </div>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-full transition-colors ${
                  isMobileMenuOpen ? "ml-auto" : ""
                } hover:bg-white/30`}
              >
                <div
                  className={`w-6 h-6 flex flex-col justify-center gap-[5px] transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-90" : ""
                  }`}
                >
                  {isMobileMenuOpen ? (
                    <svg
                      className="w-6 h-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  )}
                </div>
              </button>
            </div>

            {/* Nav Items Container */}
            <div
              className={`${
                isMobileMenuOpen
                  ? "flex flex-col w-full mt-2 space-y-2 opacity-100 max-h-[500px]"
                  : "hidden opacity-0 max-h-0"
              } md:flex md:flex-row md:items-center md:space-x-4 md:mt-0 md:opacity-100 md:max-h-none md:w-auto overflow-hidden transition-all duration-500 ease-in-out`}
            >
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative flex md:flex-col items-center justify-start md:justify-center px-4 md:px-2.5 py-3 md:py-1.5 w-full md:w-auto md:min-w-[55px] rounded-xl md:rounded-none hover:bg-white/40 md:hover:bg-transparent transition-all duration-300 ease-out group ${
                    activeTab === item.id
                      ? "bg-white/60 md:bg-transparent text-gray-800"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <div
                    className={`transition-all duration-300 mr-3 md:mr-0 ${
                      activeTab === item.id
                        ? "scale-105 drop-shadow-sm"
                        : "group-hover:scale-105 group-hover:drop-shadow-sm"
                    }`}
                  >
                    {React.cloneElement(item.icon, {
                      strokeWidth: activeTab === item.id ? 2 : 1.5,
                      className: `w-5 h-5 transition-all duration-300`,
                    })}
                  </div>
                  <span
                    className={`text-sm md:text-[10px] font-medium mt-0 md:mt-0.5 transition-all duration-300 ${
                      activeTab === item.id
                        ? "opacity-100 font-semibold"
                        : "opacity-60 group-hover:opacity-90 group-hover:font-medium"
                    }`}
                  >
                    {item.name}
                  </span>
                  {activeTab === item.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gray-800 rounded-r-full md:hidden" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. Right Connect Button - Independent */}
      <motion.div
        className="fixed top-5 right-5 md:right-8 z-[500]"
        initial={{ opacity: 0, x: 50 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          x: isVisible ? 0 : 50,
          y: isVisible ? 0 : -100,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          onClick={() => scrollToSection("contact")} // Changed to 'contact' assuming ID match
          className="relative group block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Outer transparent layer with border */}
          <div className="absolute -inset-1 bg-white/5 backdrop-blur-md rounded-full border-1 border-white shadow-[0_8px_32px_rgba(255,255,255,0.1)] group-hover:border-white/50 transition-all duration-300"></div>

          {/* Inner layer with white background */}
          <div className="absolute inset-[2px] bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1)] group-hover:bg-white/95 transition-all duration-300"></div>

          {/* Content */}
          <span className="relative z-10 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium text-gray-600 group-hover:text-gray-900 flex items-center space-x-2 transition-colors duration-300">
            <svg
              className="w-4 h-4 hidden md:block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m0-3.839l.707-.707a4 4 0 105.656-5.656l-4 4z"
              />
            </svg>
            <span>Connect</span>
          </span>
        </motion.button>
      </motion.div>
    </>
  );
};

export default TopNavbar;
