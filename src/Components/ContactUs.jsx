import React, { useState, useRef, useEffect } from 'react';
import { FaLinkedin, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const socialRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const animations = [];

    // Header animation
    if (titleRef.current) {
      const headerAnim = gsap.fromTo(
        titleRef.current,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse"
          }
        }
      );
      animations.push(headerAnim);
    }

    // Form inputs animation
    const formInputs = sectionRef.current.querySelectorAll('.form-field');
    if (formInputs.length > 0) {
      const formAnim = gsap.fromTo(
        formInputs,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formInputs[0],
            start: "top 75%",
            end: "top 40%",
            toggleActions: "play none none reverse"
          }
        }
      );
      animations.push(formAnim);
    }

    // Social icons animation
    if (socialRef.current) {
      const socialIcons = socialRef.current.querySelectorAll('.social-icon');
      if (socialIcons.length > 0) {
        const socialAnim = gsap.fromTo(
          socialIcons,
          { scale: 0, opacity: 0, rotation: -180 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: socialRef.current,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse"
            }
          }
        );
        animations.push(socialAnim);
      }
    }

    // Submit button animation
    if (buttonRef.current) {
      const buttonAnim = gsap.fromTo(
        buttonRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 90%",
            end: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
      animations.push(buttonAnim);
    }

    // Cleanup function
    return () => {
      animations.forEach(anim => {
        if (anim.scrollTrigger) anim.scrollTrigger.kill();
        anim.kill();
      });
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setFormData({ fullName: '', email: '', message: '' });
      alert('Message sent successfully!');
    }, 2000);
  };

  const socialLinks = [
    { icon: FaLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaFacebookF, url: 'https://facebook.com', label: 'Facebook' },
    { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-white overflow-hidden z-10" 
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div ref={titleRef} className="mb-16">
          <h2 className="text-6xl md:text-8xl font-bold text-black tracking-tight mb-8">
            CONTACT
          </h2>
        </div>

        {/* Form Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-32">
          {/* Left Side - Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Full Name Input */}
            <div className="relative form-field">
              <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b-2 border-gray-300 py-3 px-0 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors duration-300"
                placeholder="Your name"
              />
            </div>

            {/* Email Input */}
            <div className="relative form-field">
              <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b-2 border-gray-300 py-3 px-0 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors duration-300"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Message Textarea */}
            <div className="relative form-field">
              <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full bg-transparent border-b-2 border-gray-300 py-3 px-0 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors duration-300 resize-none"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>
          </form>

          {/* Right Side - Social Links */}
          <div
            ref={socialRef}
            className="flex justify-end items-start pt-12"
          >
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-14 h-14 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 hover:scale-110 hover:-translate-y-2 transition-all duration-300 shadow-lg"
                  aria-label={social.label}
                >
                  <social.icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mb-20">
          <button
            ref={buttonRef}
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="group relative w-20 h-20 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 hover:scale-110 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg
                className="w-8 h-8 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
