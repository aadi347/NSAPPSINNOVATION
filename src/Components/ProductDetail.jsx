import React, { useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Github, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import productsData from '../data/products.json';

gsap.registerPlugin(ScrollTrigger);

const ProductDetail = () => {
    const { id } = useParams();
    const product = productsData.find(p => p.id === id);
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // --- 1. Cards Fly In From Right (Hero) ---
            // Simulate the "stack" arriving
            tl.from(".hero-card", {
                x: "150%", // Start off-screen right
                rotation: 30, // Tilted
                opacity: 0,
                duration: 1.8,
                stagger: 0.15, // Delay between cards
                ease: "power3.out"
            });

            // --- 2. Text Reveal (Left Side) ---
            tl.from(".hero-text-mask", {
                yPercent: 120,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out"
            }, "-=1.4"); // Overlap with card animation

            // --- 3. Floating Team Avatars ---
            // Subtle floating animation loop
            gsap.to(".team-floater", {
                y: -15,
                duration: 2,
                stagger: 0.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // --- 4. Infinite Marquee Animation ---
            // Duplicated text strip scrolling endlessly
            gsap.to(".marquee-inner", {
                xPercent: -50,
                repeat: -1,
                duration: 20,
                ease: "linear"
            });

            // --- 5. Bento Grid 3D Reveal ---
            const cards = gsap.utils.toArray(".bento-card");
            ScrollTrigger.batch(cards, {
                start: "top 90%",
                onEnter: batch => gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    stagger: 0.15,
                    duration: 1,
                    ease: "power3.out"
                })
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (!product) return <div className="min-h-screen flex items-center justify-center text-xl font-medium text-gray-500">Product not found</div>;

    // Helper to determine bento grid classes based on index
    const getBentoClass = (index) => {
        const pattern = [
            "md:col-span-2 md:row-span-2",
            "md:col-span-1 md:row-span-1",
            "md:col-span-1 md:row-span-1",
            "md:col-span-2 md:row-span-1",
            "md:col-span-1 md:row-span-2",
        ];
        return pattern[index % pattern.length] || "md:col-span-1 md:row-span-1";
    };

    // Images for the card stack
    const stackImages = product.images && product.images.length >= 3
        ? product.images.slice(0, 3)
        : [product.img, product.img, product.img];

    // Marquee content repeated for seamless loop
    const marqueeText = " CREATIVE • INNOVATIVE • DIGITAL • EXPERIENCE • FUTURE • DESIGN • ";

    return (
        <div ref={containerRef} className="min-h-screen bg-[#f3f4f6] text-gray-900 font-sans selection:bg-black selection:text-white relative overflow-hidden">



            {/* --- HERO SECTION (Redesigned) --- */}
            <header className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-24 min-h-[90vh] flex flex-col lg:flex-row items-center justify-between gap-12 z-10">

                {/* Left: Typography */}
                <div className="flex-1 max-w-2xl relative z-20">
                    <div className="overflow-hidden mb-6">
                        <div className="hero-text-mask inline-block">
                            <span className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase flex items-center gap-3">
                                Create Your Own
                            </span>
                        </div>
                    </div>

                    <div className="overflow-hidden">
                        <h1 className="hero-text-mask text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] text-gray-900 mb-6">
                            {product.title}
                        </h1>
                    </div>

                    <div className="overflow-hidden mb-8">
                        <p className="hero-text-mask text-2xl md:text-3xl font-light text-gray-600 leading-snug">
                            {product.category} <span className="font-bold text-gray-900">Experience</span>
                        </p>
                    </div>

                    <div className="overflow-hidden mb-12">
                        <p className="hero-text-mask text-lg text-gray-500 max-w-lg leading-relaxed">
                            {product.desc}
                        </p>
                    </div>

                    <div className="overflow-hidden">
                        <div className="hero-text-mask flex gap-4 pl-4">
                            <button className="px-10 py-5 bg-black text-white rounded-full font-bold text-sm tracking-wide hover:scale-105 transition-transform shadow-xl">
                                VIEW PROJECT
                            </button>
                        </div>
                    </div>

                    {/* Partners / Tags row */}
                    <div className="mt-16 flex gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        {product.tags && product.tags.slice(0, 4).map((tag, i) => (
                            <span key={i} className="text-sm font-bold uppercase tracking-wider">{tag}</span>
                        ))}
                    </div>
                </div>

                {/* Right: Fanned Card Stack & Decorations */}
                <div className="flex-1 w-full relative h-[600px] flex items-center justify-center lg:justify-end perspective-1000">

                    {/* Card 3 (Back) */}
                    <div className="hero-card absolute top-10 right-0 w-[60%] md:w-[450px] aspect-[1.6] bg-gray-200 rounded-3xl shadow-2xl border-4 border-white transform rotate-[-8deg] translate-y-[-40px] z-10 overflow-hidden">
                        <img src={stackImages[2] || product.img} alt="Card 3" className="w-full h-full object-cover opacity-80" />
                    </div>

                    {/* Card 2 (Middle) */}
                    <div className="hero-card absolute top-24 right-12 w-[60%] md:w-[450px] aspect-[1.6] bg-gray-100 rounded-3xl shadow-2xl border-4 border-white transform rotate-[5deg] translate-y-[-20px] z-20 overflow-hidden">
                        <img src={stackImages[1] || product.img} alt="Card 2" className="w-full h-full object-cover opacity-90" />
                    </div>

                    {/* Card 1 (Front) */}
                    <div className="hero-card absolute top-40 right-24 w-[60%] md:w-[450px] aspect-[1.6] bg-white rounded-3xl shadow-2xl border-4 border-white transform rotate-[-12deg] z-30 overflow-hidden">
                        <img src={stackImages[0] || product.img} alt="Card 1" className="w-full h-full object-cover" />
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none mix-blend-overlay" />
                    </div>

                    {/* Floating Avatar Pills (Decorations) */}
                    {product.team && (
                        <div className="absolute bottom-0 right-10 z-40 flex flex-col gap-4 items-end pointer-events-none">
                            {product.team.map((member, i) => (
                                <div key={i} className={`team-floater flex items-center gap-3 bg-white/90 backdrop-blur-md p-2 pl-4 pr-2 rounded-full shadow-lg border border-gray-100 ${i % 2 === 0 ? "mr-12" : ""}`}>
                                    <div className="text-right">
                                        <div className="text-xs font-bold text-gray-900 leading-tight">{member.name}</div>
                                        <div className="text-[10px] text-gray-500 font-medium">$9,450.00</div>
                                    </div>
                                    <img
                                        src={member.image || `https://ui-avatars.com/api/?name=${member.name}&background=random`}
                                        alt={member.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            {/* --- CREATIVE SEPARATOR: INFINITE MARQUEE --- */}
            <div className="relative py-10 bg-black -rotate-2 scale-105 z-20 mb-20 shadow-2xl border-y-4 border-white">
                <div className="marquee-inner flex whitespace-nowrap">
                    {/* Repeat text enough times to fill width */}
                    {[...Array(8)].map((_, i) => (
                        <span key={i} className="text-4xl md:text-6xl font-black text-white px-4 tracking-tighter">
                            {marqueeText}
                        </span>
                    ))}
                </div>
            </div>


            {/* --- EXISTING SECTIONS (Polished) --- */}



            {/* Content & Gallery */}
            <section className="max-w-7xl mx-auto px-6 pb-40 relative z-10">
                <div className="grid md:grid-cols-[1fr_2fr] gap-20">

                    {/* Sticky Sidebar */}
                    <div className="sidebar-container space-y-12 h-fit md:sticky md:top-32">
                        <div className="sidebar-item p-8 bg-white/60 backdrop-blur-xl rounded-3xl border border-gray-200 shadow-sm">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                                Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {product.tags.map((tag, i) => (
                                    <span key={i} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="sidebar-item space-y-4">
                            <button className="w-full group flex items-center justify-between px-8 py-5 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95">
                                <span>Visit Live Site</span>
                                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                            </button>

                        </div>
                    </div>

                    {/* Description & Gallery */}
                    <div className="space-y-24">
                        <div className="prose prose-lg prose-gray max-w-none">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-gray-900"></span>
                                Project Overview
                            </h2>
                            <p className="sidebar-item text-xl leading-relaxed text-gray-600 font-light translate-y-4 opacity-0 transition-all duration-700" style={{ opacity: 1, transform: 'none' }}>
                                {product.fullDescription}
                            </p>
                        </div>

                        <div className="space-y-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-gray-900"></span>
                                Visual Assets
                            </h2>

                            {/* Bento Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                                {product.images && product.images.map((img, i) => (
                                    <div
                                        key={i}
                                        className={`bento-card rounded-3xl overflow-hidden border border-white/60 bg-white/40 backdrop-blur-md shadow-sm transition-all duration-500 group relative opacity-0 translate-y-12 rotate-x-6 origin-bottom perspective-1000 hover:bg-white/60 hover:shadow-xl hover:border-white/80 ${getBentoClass(i)}`}
                                    >
                                        <div className="w-full h-full p-2">
                                            <div className="w-full h-full rounded-2xl overflow-hidden relative">
                                                <img
                                                    src={img}
                                                    alt={`Gallery ${i + 1}`}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />

                                                {/* Hover Overlay Info */}
                                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/30 backdrop-blur-md border-t border-white/40 text-gray-900">
                                                    <span className="text-sm font-bold tracking-wider uppercase">Asset 0{i + 1}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ProductDetail;