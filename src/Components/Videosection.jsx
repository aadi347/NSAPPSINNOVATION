import React, { useState, useEffect, useRef } from "react";
// import Spline from "@splinetool/react-spline";
import { ArrowRight } from "lucide-react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
} from "framer-motion";
import ConnectPanel from "../Bttons/ConnectPanel";
import PortfolioPanel from "../Bttons/PortfolioPanel";
import "../App.css";

const quotes = [
    {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Design is not just what it looks like and feels like. Design is how it works.",
        author: "Steve Jobs"
    },
    {
        text: "Strive for excellence in every task, however small it may seem.",
        author: "NS Team"
    }
];

const QuoteShowcase = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % quotes.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full max-w-md h-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col justify-center shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg z-10">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V15C14.017 15.5523 13.5693 16 13.017 16H12.017V21H14.017ZM6.017 21L6.017 18C6.017 16.8954 6.91243 16 8.017 16H11.017C11.5693 16 12.017 15.5523 12.017 15V9C12.017 8.44772 11.5693 8 11.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V15C6.017 15.5523 5.56929 16 5.017 16H4.017V21H6.017Z" />
                </svg>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col h-full justify-center"
                >
                    <p className="text-xl md:text-2xl font-medium text-gray-800 italic leading-relaxed mb-6">
                        "{quotes[index].text}"
                    </p>

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-[2px] bg-gray-900"></div>
                        <p className="text-sm font-bold uppercase tracking-widest text-gray-900">
                            {quotes[index].author}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const Hero = () => {
    const [isConnectOpen, setIsConnectOpen] = useState(false);
    const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

    const openConnect = () => setIsConnectOpen(true);
    const closeConnect = () => setIsConnectOpen(false);
    const openPortfolio = () => setIsPortfolioOpen(true);
    const closePortfolio = () => setIsPortfolioOpen(false);

    // Parallax scroll setup
    const { scrollY } = useScroll();
    const heroTextY = useTransform(scrollY, [0, 500], [0, -200]);
    const topElementsY = useTransform(scrollY, [0, 500], [0, -80]);
    const sideElementsY = useTransform(scrollY, [0, 500], [0, -50]);
    const scrollIndicatorY = useTransform(scrollY, [0, 500], [0, -30]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const teamMembers = [
        { id: 1, image: "/Aditya.jpeg", name: "Team Member 1" },
        { id: 2, image: "/Abhishek.jpeg", name: "Team Member 2" },
        { id: 3, image: "/AdityaRaj.jpeg", name: "Team Member 3" },
        { id: 4, image: "/Manish.jpeg", name: "Team Member 4" },
    ];

    const scrollToTeamSection = () => {
        const teamSection = document.getElementById("team-section");
        if (teamSection) {
            teamSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const scrollToNextSection = () => {
        const nextSection = document.getElementById("services-section");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const scrollToGetInTouch = () => {
        const getInTouchSection = document.getElementById("get-in-touch");
        if (getInTouchSection) {
            getInTouchSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const heroVariants = {
        normal: {
            x: 0,
            scale: 1,
            borderRadius: 0,
            transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
            },
        },
        shifted: {
            x: "45%",
            scale: 0.85,
            borderRadius: 20,
            transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    };

    const overlayVariants = {
        hidden: {
            opacity: 0,
            transition: { duration: 0.3 },
        },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: custom * 0.15,
                ease: [0.4, 0, 0.2, 1],
            },
        }),
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: (custom) => ({
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                delay: custom * 0.15,
                ease: [0.4, 0, 0.2, 1],
            },
        }),
    };

    const isAnyPanelOpen = isConnectOpen || isPortfolioOpen;

    const socialLinks = [
        { icon: "instagram", url: "https://instagram.com" },
        { icon: "facebook", url: "https://facebook.com" },
        { icon: "twitter", url: "https://twitter.com" },
        { icon: "linkedin", url: "https://linkedin.com" },
    ];

    return (
        <div
            className="relative h-[100vh] w-full overflow-hidden z-[10]"
            id="hero-section"
        >
            <AnimatePresence>
                {isAnyPanelOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-20 z-40"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={() => {
                            closeConnect();
                            closePortfolio();
                        }}
                    />
                )}
            </AnimatePresence>

            <motion.section
                className="relative w-full h-screen"
                variants={heroVariants}
                animate={isAnyPanelOpen ? "shifted" : "normal"}
                style={{ transformOrigin: "center center" }}
            >
                {/* Vertical Social Media Icons */}
                <motion.div
                    className="absolute right-8 bottom-32 z-[100] hidden lg:flex flex-col gap-4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    style={{ y: sideElementsY }}
                >
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={social.icon}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.8 + index * 0.1 }}
                            whileHover={{ scale: 1.15, x: -5 }}
                        >
                            <div className="relative w-12 h-12 bg-white/40 backdrop-blur-md rounded-full border border-white/50 shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex items-center justify-center group-hover:bg-white/60 transition-all duration-300">
                                {social.icon === "instagram" && (
                                    <svg
                                        className="w-6 h-6 text-gray-700 group-hover:text-pink-600 transition-colors"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                )}
                                {social.icon === "facebook" && (
                                    <svg
                                        className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                )}
                                {social.icon === "twitter" && (
                                    <svg
                                        className="w-6 h-6 text-gray-700 group-hover:text-blue-400 transition-colors"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                )}
                                {social.icon === "linkedin" && (
                                    <svg
                                        className="w-6 h-6 text-gray-700 group-hover:text-blue-700 transition-colors"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                )}
                            </div>

                            <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium capitalize whitespace-nowrap">
                                    {social.icon}
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Main Content Layout Container */}
                <div className="relative z-10 w-full h-full flex items-start pt-32 sm:pt-40 lg:pt-44 px-4 sm:px-12 lg:px-24">
                    <div className="w-full grid lg:grid-cols-2 gap-12 items-start">

                        {/* Left Content - Title */}
                        <motion.div
                            className="flex flex-col items-start relative mt-5"
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            style={{ y: heroTextY, opacity }}
                        >
                            {/* Team Avatar Stack - Relocated to Top Left of Title */}
                            <motion.div
                                className="mb-8"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 2, duration: 0.8 }}
                            >
                                <div
                                    onClick={scrollToTeamSection}
                                    className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-sm cursor-pointer hover:bg-white/20 transition-all"
                                >
                                    <div className="flex -space-x-2">
                                        {teamMembers.map((member) => (
                                            <div key={member.id} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-xs font-bold text-gray-900 tracking-wider">NS TEAM</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="text-left relative"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                                custom={0}
                            >
                                {/* Floating Lightning Icon - Moved closer to title */}
                                <motion.div
                                    className="absolute -top-12 left-11/12 z-20"
                                    animate={{
                                        y: [-10, 10, -10],
                                        rotate: [0, 5, -5, 0],
                                        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                                    }}
                                >
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 rotate-12">
                                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                </motion.div>

                                <PressureText text="NS APPS" className="text-5xl md:text-7xl lg:text-9xl justify-start" />
                            </motion.div>

                            <motion.div
                                className="flex items-center justify-start mb-6"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                                custom={1}
                            >
                                <PressureText
                                    text="INNOVATIONS"
                                    className="text-4xl md:text-6xl lg:text-7xl justify-start"
                                />
                            </motion.div>

                            <motion.p
                                className="text-gray-600 text-base md:text-lg max-w-md mb-8"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                                custom={2}
                            >
                                Crafting digital experiences through innovative code and stunning design.
                            </motion.p>
                        </motion.div>

                        {/* Right Content - Quotes Showcase */}
                        <motion.div
                            className="hidden lg:flex flex-col items-center justify-center mt-20"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8, duration: 1 }}
                        >
                            <QuoteShowcase />
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Banner - Stats & Trusted By */}
                <motion.div
                    className="absolute bottom-0 left-0 w-full bg-white/10 backdrop-blur-xl border-t border-white/20 py-6 z-20"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around items-center gap-8">
                        <div className="text-center group">
                            <div className="text-2xl font-black text-gray-900 group-hover:scale-110 transition-transform">50+</div>
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Projects</div>
                        </div>
                        <div className="text-center group">
                            <div className="text-2xl font-black text-gray-900 group-hover:scale-110 transition-transform">10+</div>
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Years</div>
                        </div>
                        <div className="text-center group">
                            <div className="text-2xl font-black text-gray-900 group-hover:scale-110 transition-transform">24/7</div>
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Support</div>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <div className="flex gap-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 items-center">
                                <span className="font-bold text-gray-400 text-base">Vite</span>
                                <span className="font-bold text-gray-400 text-base">React</span>
                                <span className="font-bold text-gray-400 text-base">Tailwind</span>
                                <span className="font-bold text-gray-400 text-base">GSAP</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
                {/* Custom Scroll Down Trigger */}
                <motion.div
                    className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 lg:hidden"
                    style={{ opacity }}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        onClick={scrollToNextSection}
                        className="cursor-pointer"
                    >
                        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
                            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1 h-1 bg-gray-600 rounded-full" />
                        </div>
                    </motion.div>
                </motion.div>

                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/HeroVideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </motion.section>

            <AnimatePresence>
                <ConnectPanel isOpen={isConnectOpen} onClose={closeConnect} />
                <PortfolioPanel isOpen={isPortfolioOpen} onClose={closePortfolio} />
            </AnimatePresence>
        </div>
    );
};

// PressureText component
const PressureText = ({ text, className }) => {
    const containerRef = useRef(null);
    const spansRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const cursorRef = useRef({ x: 0, y: 0 });

    const chars = text.split("");

    const dist = (a, b) => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            cursorRef.current.x = e.clientX;
            cursorRef.current.y = e.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            const ease = 0.18;
            mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) * ease;
            mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) * ease;

            spansRef.current.forEach((span) => {
                if (!span) return;

                const rect = span.getBoundingClientRect();
                const center = {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                };

                const distance = dist(mouseRef.current, center);
                const maxDist = 160;
                const minDist = 0;

                const ratio = Math.max(
                    0,
                    Math.min(1, (maxDist - distance) / (maxDist - minDist))
                );
                const easedRatio = ratio * ratio * (3 - 2 * ratio);

                const weight = 650 + easedRatio * 250;
                const width = 95 + easedRatio * 15;
                const italic = easedRatio * 4;

                span.style.fontVariationSettings = `"wght" ${weight}, "wdth" ${width}, "ital" ${italic}`;
                span.style.fontWeight = weight;
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <h1
            ref={containerRef}
            className={`${className} font-black leading-tight flex flex-wrap`}
            style={{
                fontVariationSettings: '"wght" 650, "wdth" 100, "ital" 0',
                transition: "font-variation-settings 0.12s ease-out",
            }}
        >
            {chars.map((char, i) => (
                <span
                    key={i}
                    ref={(el) => (spansRef.current[i] = el)}
                    className="inline-block text-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                    style={{
                        fontVariationSettings: '"wght" 650, "wdth" 100, "ital" 0',
                        transition: "font-variation-settings 0.12s ease-out",
                        whiteSpace: char === " " ? "pre" : "normal",
                        willChange: "font-variation-settings",
                        transform: "translateZ(0)",
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </h1>
    );
};

export default Hero;
