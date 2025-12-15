import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Lottie from 'lottie-react';
// import CurveSVGManipulation from './Svgmanupulation'; 

const CARD_TILT_MAX = 12; // degrees

// 3D tilt hook
const useTilt = () => {
  const ref = useRef(null);

  const handleMouseMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -CARD_TILT_MAX;
    const rotateY = ((x - centerX) / centerX) * CARD_TILT_MAX;

    ref.current.style.setProperty('--rotateX', `${rotateX}deg`);
    ref.current.style.setProperty('--rotateY', `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty('--rotateX', `0deg`);
    ref.current.style.setProperty('--rotateY', `0deg`);
  };

  return { ref, handleMouseMove, handleMouseLeave };
};

// Shared Lottie wrapper: big size, no bg divs around (only this container)
const BigLottie = ({ jsonUrl }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(jsonUrl)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => {
        console.error(`Failed to load ${jsonUrl}`, err);
      });
  }, [jsonUrl]);

  if (!animationData) {
    return (
      <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
        Loading animation...
      </div>
    );
  }

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <Lottie
        animationData={animationData}
        loop
        autoplay
        className="w-[550px] h-[550px] md:w-[650px] md:h-[650px] -mt-16 drop-shadow-2xl"
      />
    </motion.div>
  );
};

// Lottie for each section (from public)
const WebDevLottie = () => <BigLottie jsonUrl="/WebDevDesign.json" />;
const MobileAppLottie = () => <BigLottie jsonUrl="/MobileAppShowcase.json" />;
const AILottie = () => <BigLottie jsonUrl="/Man and robot with computers sitting together in workplace.json" />;

// Focus Scroll Item Component
const FocusScrollItem = ({ children, isActive, isNeighbor }) => {
  return (
    <motion.div
      className={`py-4 transition-all duration-1000 ease-out ${isActive
        ? 'opacity-100 blur-0 scale-100 translate-x-4 text-gray-800'
        : isNeighbor
          ? 'opacity-40 blur-[1px] scale-95 translate-x-0 text-gray-400'
          : 'opacity-10 blur-[2px] scale-90 translate-x-0 text-gray-300'
        }`}
    >
      {children}
    </motion.div>
  );
};

// Extracted Component to handle mounting/unmounting state reset automatically
const WhoWeAreView = ({ isWhoWeAreInView, whoWeAreRef }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const { ref: tiltRef, handleMouseMove, handleMouseLeave } = useTilt();

  const achievements = [
    <p className="text-sm font-light tracking-wide text-gray-600 leading-relaxed">We are <span className="font-semibold text-gray-900">NS Apps Innovations</span>.<br />And we are the team behind <span className="font-semibold text-gray-900">Bihar’s most ambitious digital transformations</span>.</p>,
    <p className="text-sm font-light tracking-wide text-gray-600 leading-relaxed">We are the tech team behind the <span className="font-semibold text-gray-900">Asia Hockey Men’s & Women’s Championship, Rajgir</span> — delivering live match updates, dynamic schedules, athlete insights, and a world-class event website trusted by thousands.</p>,
    <p className="text-sm font-light tracking-wide text-gray-600 leading-relaxed">We are the ones behind the <span className="font-semibold text-gray-900">Startup Bihar Portal</span> — the digital gateway empowering thousands of founders and shaping Bihar’s entrepreneurial rise.</p>,
    <p className="text-sm font-light tracking-wide text-gray-600 leading-relaxed">We engineered the <span className="font-semibold text-gray-900">Buddha Samyak Darshan Museum Ticketing System</span>, seamlessly handling 2+ lakh visitors every month with unmatched speed, reliability, and scale.</p>,
    <p className="text-sm font-light tracking-wide text-gray-600 leading-relaxed">We built the <span className="font-semibold text-gray-900">Bihar Film</span> and <span className="font-semibold text-gray-900">Bihar Heritage</span> websites — welcoming filmmakers, preserving culture, and showcasing the marvels of the state in modern digital form.</p>,
    <p className="text-sm font-light tracking-wide text-gray-600 leading-relaxed">We authenticate thousands of <span className="font-semibold text-gray-900">MMUY & Bihar Laghu Udyami Yojna</span> beneficiary attendances across all districts — ensuring secure verification, transparent monitoring, and real-time insights statewide.</p>,
    <p className="text-sm font-light tracking-wide text-gray-600 leading-relaxed">Our <span className="font-semibold text-gray-900">LITMAN system</span> — Bihar’s Litigation Management & Compliance Tracking platform — helps departments manage and monitor court cases with precision. Its flagship implementation, the <span className="font-semibold text-gray-900">ViSha Portal</span>, has transformed how legal workflows operate across the state.</p>,
    <p className="text-sm font-light tracking-wide text-gray-600 leading-relaxed">We track <span className="font-semibold text-gray-900">Awas Yojna</span> progress through GPS-accurate inspections and photo-verified audits, bringing accountability directly to the ground.</p>,
    <p className="text-sm font-light tracking-wide text-gray-600 leading-relaxed">We developed <span className="font-semibold text-gray-900">Bihar’s first AI-powered government chatbot</span>, and we are the design consultants behind the new, modern <span className="font-semibold text-gray-900">Bihar State Government website</span>.</p>,
    <p className="text-sm font-light tracking-wide text-gray-600 leading-relaxed">We captured Bihar’s greatest monuments in <span className="font-semibold text-gray-900">360° VR</span>, bringing the state’s heritage and architecture to virtual reality.</p>,
    <p className="text-sm font-light tracking-wide text-gray-600 leading-relaxed">We built the <span className="font-semibold text-gray-900">NRIS – Injury Report Information System</span>, a revolutionary legal-tech solution enabling injury reports in record time — now paving the way for national-level deployment.</p>,
    <p className="text-sm font-light tracking-wide text-gray-600 leading-relaxed">We developed the <span className="font-semibold text-gray-900">Shravani Mela App</span>, serving millions of devotees traveling from Sultanganj to BabaDham with virtual aarti, route guidance, and real-time facilities.</p>,
    <p className="text-sm font-light tracking-wide text-gray-600 leading-relaxed">We supported the <span className="font-semibold text-gray-900">Khelo India Youth Games</span> grievance system in Nalanda, solving athlete and event issues with fast, streamlined resolution workflows.</p>,
    <p className="text-sm font-light tracking-wide text-gray-600 leading-relaxed">We built the <span className="font-semibold text-gray-900">Khelo India Bhagalpur Ticket Booking Platform</span>, ensuring smooth, digital, QR-based entry for thousands of spectators.</p>,
    <p className="text-sm font-light tracking-wide text-gray-600 leading-relaxed">We are among the <span className="font-semibold text-gray-900">earliest tech startups of Bihar</span>, leading the frontier of <span className="font-semibold text-gray-900">AI, VR, cloud engineering</span>, and next-generation governance systems.</p>,
    <p className="text-sm font-light tracking-wide text-gray-600 leading-relaxed">We are scaling our platforms to national level, with a larger vision — to make Bihar a global soft power in technology. A state that builds world-class software for India and serves the world.</p>,
    <p className="text-sm font-light tracking-wide text-gray-600 leading-relaxed">We are <span className="font-semibold text-gray-900">NS Apps Innovations</span> — the unseen force behind Digital Innovations in Bihar. We build. We design. We innovate.</p>,
  ];

  // Auto-advance timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % achievements.length);
    }, 6000); // 6 seconds

    return () => clearInterval(interval);
  }, [achievements.length]);

  // Scroll to active item (Container only)
  useEffect(() => {
    const container = listRef.current;
    const activeItem = itemRefs.current[currentIndex];

    if (container && activeItem) {
      const containerHeight = container.clientHeight;
      const itemTop = activeItem.offsetTop;
      const itemHeight = activeItem.clientHeight;
      const scrollTo = itemTop - (containerHeight / 2) + (itemHeight / 2);

      container.scrollTo({
        top: scrollTo,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <motion.div
      key="who-we-are"
      ref={whoWeAreRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 items-start h-[600px]"
    >
      {/* Left Content - AUTO SCROLL MOVIE STYLE */}
      <div ref={listRef} className="h-full  overflow-hidden mask-gradient-vertical relative bg-white/50  rounded-3xl ">
        <div className="space-y-0 py-[50%]">
          {achievements.map((item, index) => (
            <div
              key={index}
              ref={el => itemRefs.current[index] = el}
            >
              <FocusScrollItem
                isActive={index === currentIndex}
                isNeighbor={Math.abs(index - currentIndex) === 1}
              >
                {item}
              </FocusScrollItem>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - 3D PNG Logo */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isWhoWeAreInView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        <div
          ref={tiltRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="bg-[#f8f9fa] rounded-2xl flex items-center justify-center min-h-[400px] transition-transform duration-150"
          style={{
            transform: 'perspective(1000px) rotateX(var(--rotateX, 0deg)) rotateY(var(--rotateY, 0deg))',
            transformStyle: 'preserve-3d'
          }}
        >
          <div
            className="relative text-center"
            style={{ transform: 'translateZ(40px)' }}
          >
            <img
              src="/texture.png"
              alt="NS Apps Innovations"
              className="w-48 h-48 mx-auto object-contain select-none pointer-events-none"
              draggable="false"
            />

            <p className="mt-8 text-2xl font-bold text-gray-900">
              NS Apps Innovations
            </p>
            <p className="mt-2 text-sm text-gray-500 uppercase tracking-wider">
              Building the Future
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


const AboutUsSection = () => {
  const [activeTab, setActiveTab] = useState('who-we-are');
  const [activeSection, setActiveSection] = useState('web-development');

  // Refs for scroll animations
  const whoWeAreRef = useRef(null);
  const isWhoWeAreInView = useInView(whoWeAreRef, { once: true, amount: 0.3 });

  // ... (sections definition remains same)
  const sections = [
    {
      id: 'web-development',
      title: 'Modern Web Development',
      description: 'We craft beautiful, interactive websites using React, Vite, and Tailwind CSS. From animated landing pages to complex dashboards, we build fast, responsive, and user-friendly web applications that make an impact.',
      services: ['Landing Pages & Websites', 'Interactive UI/UX Design', 'Dashboard Development']
    },
    {
      id: 'mobile-apps',
      title: 'Android App Development',
      description: 'We develop native Android applications that deliver seamless user experiences. Our apps are built with performance, security, and scalability in mind, ensuring they work flawlessly across all devices.',
      services: ['Native Android Apps', 'App UI/UX Design', 'Firebase Integration']
    },
    {
      id: 'ai-tools',
      title: 'AI & Innovation',
      description: 'We harness the power of artificial intelligence to create smart tools and solutions. From chatbots to automation, we integrate cutting-edge AI technologies to solve real-world problems and enhance user experiences.',
      services: ['AI-Powered Tools', 'Automation Solutions', 'Smart Integrations']
    }
  ];

  const currentSection = sections.find(section => section.id === activeSection);


  return (
    <section className="relative bg-gray-50 py-20 px-4 z-[10]" id='about-section'>
      <div className="max-w-6xl mx-auto">
        {/* Tab Navigation with Animated Underlines */}
        <motion.div
          className="text-left mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-12">
            {/* WHO WE ARE Tab */}
            <button
              onClick={() => setActiveTab('who-we-are')}
              className="relative group"
            >
              <h3 className={`text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${activeTab === 'who-we-are' ? 'text-gray-900' : 'text-gray-400'
                } group-hover:text-gray-900`}>
                WHO WE ARE
              </h3>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-indigo-500"
                initial={false}
                animate={{
                  scaleX: activeTab === 'who-we-are' ? 1 : 0,
                  originX: 0
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }}
              />
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gray-300"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: activeTab === 'who-we-are' ? 0 : 1 }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1]
                }}
                style={{ originX: 0 }}
              />
            </button>

            {/* WHAT WE DO Tab */}
            <button
              onClick={() => setActiveTab('what-we-do')}
              className="relative group"
            >
              <h3 className={`text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${activeTab === 'what-we-do' ? 'text-gray-900' : 'text-gray-400'
                } group-hover:text-gray-900`}>
                WHAT WE DO
              </h3>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-indigo-500"
                initial={false}
                animate={{
                  scaleX: activeTab === 'what-we-do' ? 1 : 0,
                  originX: 0
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }}
              />
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gray-300"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: activeTab === 'what-we-do' ? 0 : 1 }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1]
                }}
                style={{ originX: 0 }}
              />
            </button>
          </div>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {/* WHO WE ARE CONTENT */}
          {activeTab === 'who-we-are' && (
            <WhoWeAreView isWhoWeAreInView={isWhoWeAreInView} whoWeAreRef={whoWeAreRef} />
          )}

          {/* WHAT WE DO CONTENT */}
          {activeTab === 'what-we-do' && (
            <motion.div
              key="what-we-do"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-16 items-start"
            >
              {/* Left Content - FIXED HEIGHT */}
              <motion.div className="space-y-8 min-h-[500px] flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className="flex-grow"
                  >
                    <h2 className="text-5xl md:text-6xl font-normal text-black mb-8 leading-tight">
                      {currentSection.title}
                    </h2>
                    <p className="text-base text-gray-500 leading-relaxed max-w-md">
                      {currentSection.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Service Navigation */}
                <div className="space-y-6 pt-8">
                  {sections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      className={`font-normal text-base cursor-pointer transition-colors duration-300 ${activeSection === section.id ? 'text-indigo-600' : 'text-gray-400 hover:text-indigo-600'
                        }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      onClick={() => setActiveSection(section.id)}
                    >
                      {section.title}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right visual area - FIXED HEIGHT */}
              <div className="relative h-[500px]">
                <motion.div
                  className=""
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="h-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        {activeSection === 'web-development' && <WebDevLottie />}
                        {activeSection === 'mobile-apps' && <MobileAppLottie />}
                        {activeSection === 'ai-tools' && <AILottie />}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* <div className="absolute left-0 bottom-0 top-8/9 w-full z-0">
        <CurveSVGManipulation />
      </div> */}
    </section>
  );
};

export default AboutUsSection;
