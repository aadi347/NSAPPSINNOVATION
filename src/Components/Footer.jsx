import React from "react";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="relative bg-white">
      {/* Footer Container */}
      <footer className="relative w-full min-h-[500px] md:h-auto lg:h-[500px] overflow-hidden flex flex-col items-center justify-end pb-10 lg:pb-0">
        {/* Modern Glass Card */}
        {/* Mobile: Relative (flows naturally), Desktop: Absolute (floats) */}
        <div className="relative lg:absolute lg:top-12 w-[92%] md:w-[90%] lg:w-[85%] z-30 mt-10 lg:mt-0 mb-8 lg:mb-0">
          {/* Outer glass border - Matches Navbar */}
          <div className="absolute inset-0 bg-transparent backdrop-blur-sm rounded-[2rem] border border-white shadow-[0_8px_32px_rgba(255,255,255,0.1)]"></div>

          {/* Inner layer - Matches Navbar */}
          <div className="absolute inset-[6px] bg-white/50 rounded-[1.7rem] shadow-[0_4px_16px_rgba(0,0,0,0.08)]"></div>

          {/* Content Layer */}
          <div className="relative p-6 md:p-10 lg:p-12 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
            {/* Left Section - Enhanced */}
            <div className="w-full md:w-2/5 space-y-6">
              <div className="flex items-center gap-3">
                <img
                  src="/texture.png"
                  alt="Logo"
                  className="size-7 drop-shadow-lg"
                />
                <span className="text-sm md:text-base font-bold text-gray-900">
                  NS APPS INNOVATION LLP
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed max-w-xs">
                Building smart digital solutions with love and innovation.
              </p>

              {/* Social Link */}
              <div className="flex items-center gap-4 pt-1">
                <a
                  href="https://www.linkedin.com/company/ns-apps/posts/?feedView=all"
                  className="group flex items-center gap-2 px-3 py-1.5 bg-gray-900 hover:bg-blue-700 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <IoLogoLinkedin size={14} className="text-white" />
                  <span className="text-[10px] font-semibold text-white">
                    Follow Us
                  </span>
                </a>
              </div>
            </div>

            {/* Links Section - Two Columns */}
            <div className="w-full md:w-3/5 grid grid-cols-2 md:grid-cols-2 gap-8 md:gap-10 text-xs">
              {/* Company Links */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold mb-4 text-gray-900 uppercase tracking-wider">
                  Company
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <Link
                      to=""
                      className="hover:text-gray-900 hover:translate-x-0.5 inline-block transition-all duration-200"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="hover:text-gray-900 hover:translate-x-0.5 inline-block transition-all duration-200"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="hover:text-gray-900 hover:translate-x-0.5 inline-block transition-all duration-200"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="hover:text-gray-900 hover:translate-x-0.5 inline-block transition-all duration-200"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="hover:text-gray-900 hover:translate-x-0.5 inline-block transition-all duration-200"
                    >
                      Projects
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Address */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold mb-4 text-gray-900 uppercase tracking-wider">
                  Address
                </h4>
                <div className="flex gap-2 text-gray-600">
                  <FaMapMarkerAlt
                    className="text-gray-500 mt-0.5 flex-shrink-0"
                    size={12}
                  />
                  <p className="text-xs leading-relaxed">
                    Block A, Bhub 5th Floor
                    <br />
                    Maurya Lok, Patna
                    <br />
                    Bihar, India
                  </p>
                </div>

                {/* Contact Email inside Address col for better mobile stacking */}
                <div className="pt-4">
                  <h4 className="text-xs font-bold mb-2 text-gray-900 uppercase tracking-wider">
                    Contact
                  </h4>
                  <div className="flex gap-2 text-gray-600">
                    <FaMapMarkerAlt
                      className="text-gray-500 mt-0.5 flex-shrink-0 opacity-0" // Spacer icon to align text
                      size={12}
                    />
                    <p className="text-xs leading-relaxed -ml-5">
                      nsappsinnovations@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Removed standalone Contact col to fit in 2 grid cols for mobile */}
          </div>

          {/* Bottom Copyright Bar */}
          <div className="relative px-6 md:px-12 pb-5 pt-4 border-t border-gray-200/60 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[10px] text-gray-500 text-center sm:text-left">
              © 2025{" "}
              <span className="font-semibold text-gray-900">
                NS APPS INNOVATION LLP
              </span>
              . All Rights Reserved.
            </p>

            {/* Made with Love */}
            <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
              <span>Made with</span>
              <FaHeart className="text-red-500 animate-pulse" size={10} />
              <span>
                by{" "}
                <span className="font-semibold text-gray-900">
                  NS APPS Team
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Large NS APPS text - Visible, centered, at bottom */}
        <div
          className="absolute left-0 right-0 bottom-0 flex justify-center items-end z-5 pointer-events-none"
          style={{ height: "280px" }}
        >
          <div
            className="text-gray-500 text-[100px] sm:text-[150px] md:text-[200px] lg:text-[260px] font-black leading-none text-center opacity-30 lg:opacity-100"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
              letterSpacing: "0.1em",
              transform: "translateY(30%)",
            }}
          >
            NS APPS
          </div>
        </div>

        {/* Enhanced bottom fade gradient */}
        <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-white via-white/40 to-transparent z-20 pointer-events-none"></div>
      </footer>
    </div>
  );
};

export default Footer;
