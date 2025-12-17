import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Sir from "/sir.png"


gsap.registerPlugin(ScrollTrigger);


const GetInTouchSection = () => {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const chatBubblesRef = useRef([]);


  // Function to scroll to contact section
  const scrollToContact = (e) => {
    e.preventDefault();
    e.stopPropagation();


    const contactSection = document.getElementById('contact-us');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };


  useEffect(() => {
    if (!containerRef.current || !imageContainerRef.current) return;


    const ctx = gsap.context(() => {
      // Continuous marquee animation for text - Right to Left
      if (marqueeRef.current) {
        const marqueeContent = marqueeRef.current.querySelector('.marquee-content');
        const contentWidth = marqueeContent.offsetWidth;
        
        gsap.to(marqueeContent, {
          x: -contentWidth / 2,
          duration: 30, // Slower animation (increased from 20 to 30)
          ease: "none",
          repeat: -1,
        });
      }


      // Image container appears - WITH SCROLL TRIGGER
      gsap.fromTo(
        imageContainerRef.current,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          duration: 2,
          force3D: true,
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top 95%",
            end: "top 45%",
            scrub: 2.5,
            once: true
          }
        }
      );


      // Image itself reveals - WITH SCROLL TRIGGER
      gsap.fromTo(
        imageRef.current,
        { scale: 1.3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          duration: 2,
          force3D: true,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: 2.5,
            once: true
          }
        }
      );


      // Animate each bubble individually - WITH SCROLL TRIGGER
      const validBubbles = chatBubblesRef.current.filter(el => el !== null);


      validBubbles.forEach((bubble, index) => {
        if (bubble) {
          // Entrance animation with slower scrub
          gsap.fromTo(
            bubble,
            {
              y: 100,
              opacity: 0,
              scale: 0.6
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              ease: "power2.out",
              duration: 2,
              force3D: true,
              scrollTrigger: {
                trigger: bubble,
                start: "top 95%",
                end: "top 35%",
                scrub: 2.5,
                once: true
              }
            }
          );


          // Floating animation (starts after element is visible)
          gsap.to(bubble, {
            y: "+=8",
            duration: 2.5 + (index * 0.3),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.5,
            force3D: true
          });
        }
      });
    }, containerRef);


    const handleResize = () => {
      ScrollTrigger.refresh();
    };


    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);


  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#ffffff] overflow-hidden py-20"
      id="get-in-touch"
    >
      {/* Scrolling Marquee Text Section - Full text with slow right to left animation and slight tilt */}
      <div className="relative w-full overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 py-2 mb-6 -rotate-2">
        <div ref={marqueeRef} className="relative whitespace-nowrap will-change-transform">
          <div className="marquee-content inline-flex items-center">
            {/* Repeat the full text multiple times for seamless loop */}
            {[...Array(3)].map((_, i) => (
              <React.Fragment key={i}>
                <h1 className="text-[clamp(4rem,8vw,10rem)] font-black text-white uppercase tracking-tight mx-6 leading-none" style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '0.02em' }}>
                  GET IN TOUCH WITH NS APPS INNOVATIONS
                </h1>
                <span className="text-[clamp(4rem,8vw,10rem)] font-black text-white mx-8">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4">
        {/* Image Section with Chat Bubbles - Elements moved further apart */}
        <div
          ref={imageContainerRef}
          className="relative flex items-center justify-center px-6"
          style={{ transform: 'translateZ(0)' }}
        >
          <div className="relative flex items-center justify-center w-full max-w-[90rem]">


            {/* Center Image */}
            <img
              ref={imageRef}
              src={Sir}
              alt="Nishant Shakher"
              className="relative w-[420px] h-[480px] sm:w-[500px] sm:h-[560px] md:w-[600px] md:h-[650px] lg:w-[700px] lg:h-[750px] xl:w-[800px] xl:h-[850px] rounded-3xl object-cover object-center"
              style={{ willChange: 'transform', transform: 'translateZ(0)', zIndex: 1 }}
            />


            {/* Left Side - Text Bubbles (moved further) */}
            <div className="absolute left-0 md:left-2 lg:left-4 xl:left-8 top-[15%] space-y-4 max-w-[240px] md:max-w-[280px] lg:max-w-sm hidden md:block z-10">
              {/* Nishant Badge */}
              <div
                ref={el => chatBubblesRef.current[0] = el}
                className="bg-gray-700 text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium shadow-lg w-fit"
                style={{ willChange: 'transform' }}
              >
                Nishant
              </div>


              {/* Text Bubble */}
              <div
                ref={el => chatBubblesRef.current[1] = el}
                className="bg-white text-gray-900 p-4 md:p-6 rounded-2xl shadow-xl border border-gray-100"
                style={{ willChange: 'transform' }}
              >
                <p className="text-sm md:text-base leading-relaxed">
                  Looking to build your next web or mobile app?
                </p>
              </div>


              {/* Subtext */}
              <div
                ref={el => chatBubblesRef.current[2] = el}
                className="text-gray-500 text-xs md:text-sm px-2"
                style={{ willChange: 'transform' }}
              >
                Let's create something amazing together!
              </div>


              {/* Send Message Button */}
              <div
                ref={el => chatBubblesRef.current[3] = el}
                style={{ willChange: 'transform' }}
              >
                <button
                  onClick={scrollToContact}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer relative z-50"
                >
                  SEND MESSAGE
                </button>
              </div>


              {/* Team Badge */}
              <div
                ref={el => chatBubblesRef.current[4] = el}
                className="bg-gray-600 text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium shadow-lg w-fit flex items-center gap-2"
                style={{ willChange: 'transform' }}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                NS Apps Team
              </div>
            </div>


            {/* Right Side - Text Bubbles (moved further) */}
            <div className="absolute right-0 md:right-2 lg:right-4 xl:right-8 top-[15%] space-y-4 max-w-[240px] md:max-w-[280px] lg:max-w-md hidden md:block z-10">
              {/* Developer Badge */}
              <div
                ref={el => chatBubblesRef.current[5] = el}
                className="bg-gray-600 text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium shadow-lg w-fit ml-auto flex items-center gap-2"
                style={{ willChange: 'transform' }}
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                Full Stack Developer
              </div>


              {/* Why Nishant? Section */}
              <div
                ref={el => chatBubblesRef.current[6] = el}
                className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200"
                style={{ willChange: 'transform' }}
              >
                <h3 className="text-gray-900 text-lg md:text-xl font-bold">Why Nishant Shakher?</h3>
                <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                  Specialized in <span className="text-gray-900 font-semibold">React, Node.js, and Android development</span> with expertise in building scalable web and mobile applications.
                </p>
                <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                  From concept to deployment, I deliver modern, performant solutions that drive results.
                </p>
              </div>


              {/* Client Badge */}
              <div
                ref={el => chatBubblesRef.current[7] = el}
                className="bg-gray-900 text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium shadow-lg w-fit ml-auto flex items-center gap-2"
                style={{ willChange: 'transform' }}
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                50+ Projects
              </div>


              {/* Innovation Badge */}
              <div
                ref={el => chatBubblesRef.current[8] = el}
                className="bg-gray-700 text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium shadow-lg w-fit"
                style={{ willChange: 'transform' }}
              >
                Innovation Driven
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default GetInTouchSection;
