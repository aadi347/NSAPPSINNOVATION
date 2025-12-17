import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import productsData from "../data/products.json";
import servicesData from "../data/services.json";

const ProductSection = () => {
  const swiperRef = useRef(null);
  const [activeTab, setActiveTab] = useState("projects");
  const [isAnimating, setIsAnimating] = useState(false);

  const allProducts = [...productsData];
  const allServices = [...servicesData];

  const displayData = activeTab === "projects" ? allProducts : allServices;
  const displayTitle =
    activeTab === "projects" ? "Our Projects" : "Our Services";
  const displayDescription =
    activeTab === "projects"
      ? "A showcase of our technical expertise and government collaborations driving innovation."
      : "Comprehensive solutions tailored to meet your business needs and objectives.";

  const handleTabSwitch = (tab) => {
    if (tab !== activeTab) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveTab(tab);
        setTimeout(() => setIsAnimating(false), 50);
      }, 300);
    }
  };

  return (
    <div className="">
      <div
        id="projects-section"
        className="relative w-full  min-h-screen bg-[#f9fafb] overflow-hidden flex flex-col justify-center py-16 md:py-20"
      >
        {/* Main Container with Padding */}
        <div className="container mx-auto px-6 md:px-10 lg:px-14 xl:px-16">
          {/* Section Header with Navigation */}
          <div className="mb-8 md:mb-10 z-10 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              {/* Left: Toggle, Title & Description */}
              <div className="max-w-2xl">
                {/* Toggle Switch */}
               
                <div className="inline-flex items-center bg-white rounded-full p-1 shadow-md mb-4">
                  <button
                    onClick={() => handleTabSwitch("projects")}
                    className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                      activeTab === "projects"
                        ? "bg-gray-900 text-white shadow-md"
                        : "text-gray-600 h over:text-gray-900"
                    }`}
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => handleTabSwitch("services")}
                    className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                      activeTab === "services"
                        ? "bg-gray-900 text-white shadow-md"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Services
                  </button>
             
                </div>
                {/* Animated Title & Description */}
                <div
                  className={`transition-all duration-500 ${
                    isAnimating
                      ? "opacity-0 translate-y-4 blur-sm"
                      : "opacity-100 translate-y-0 blur-0"
                  }`}
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-3 leading-tight">
                    {displayTitle}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl">
                    {displayDescription}
                  </p>
                </div>
              </div>

              {/* Right: Custom Navigation Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="swiper-button-prev-custom group w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-gray-900 hover:border-gray-900"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700 group-hover:text-white transition-colors" />
                </button>
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="swiper-button-next-custom group w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-900 shadow-lg hover:shadow-xl border border-gray-900 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:border-blue-600"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white transition-colors" />
                </button>
              </div>
            </div>
          </div>

          {/* Swiper Container with Animation */}
          <div
            className={`relative z-10 transition-all duration-500 ${
              isAnimating
                ? "opacity-0 scale-95 blur-sm"
                : "opacity-100 scale-100 blur-0"
            }`}
            key={activeTab}
          >
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[Pagination, Autoplay, Navigation]}
              grabCursor={true}
              centeredSlides={false}
              spaceBetween={20}
              loop={true}
              speed={800}
              watchSlidesProgress={false}
              watchSlidesVisibility={false}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 14,
                },
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 2.5,
                  spaceBetween: 22,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              className="!pb-14 !pt-3"
            >
              {displayData.map((item) => (
                <SwiperSlide key={item.id} className="!h-auto !opacity-100">
                  {/* Product/Service Card */}
                  <div className="group relative w-full h-[340px] md:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    {/* Image Background */}
                    <div className="absolute inset-0 w-full h-full">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                      {/* Top: Category Tag */}
                      <div className="flex justify-start">
                        <span className="inline-block px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wider border border-white/20">
                          {item.category}
                        </span>
                      </div>

                      {/* Bottom: Title & Button */}
                      <div className="space-y-4">
                        <h3 className="text-xl md:text-2xl font-bold leading-tight">
                          {item.title}
                        </h3>

                        <Link
                          to={`/${
                            activeTab === "projects" ? "product" : "service"
                          }/${item.id}`}
                          className="inline-flex items-center gap-2 group/btn"
                        >
                          <span className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-black transition-all duration-300 group-hover/btn:bg-blue-600 group-hover/btn:text-white">
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                          <span className="text-sm font-medium">
                            View{" "}
                            {activeTab === "projects" ? "Project" : "Service"}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Custom Pagination Styling */}
        <style>{`
        .swiper-slide {
          opacity: 1 !important;
        }
        
        .swiper-pagination-bullet {
          background: #d1d5db !important;
          opacity: 1 !important;
          width: 7px !important;
          height: 7px !important;
          transition: all 0.3s ease !important;
        }
        
        .swiper-pagination-bullet-active {
          background: #111827 !important;
          width: 28px !important;
          border-radius: 6px !important;
        }

        .swiper-pagination {
          bottom: 0 !important;
        }
      `}</style>
      </div>
    </div>
  );
};

export default ProductSection;
