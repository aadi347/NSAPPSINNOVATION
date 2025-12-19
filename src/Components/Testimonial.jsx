import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Sri Pranav Kumar, IAS",
    role: "Secretary",
    company: "Home Dept. Govt. of Bihar",
    quote:
      "NS Apps Innovations LLP delivered high-quality mobile applications such as the Shravani Mela App and Samaksh App, benefiting thousands of users. The Samaksh App significantly improved school monitoring, increasing school opening punctuality to 96% within one year, demonstrating strong efficiency and measurable positive outcomes.",
    image: "/Pranav.png",
    rating: 5,
  },
  {
    id: 2,
    name: "Sri Vaibhav Srivastava, IAS",
    role: "District Magistrate",
    company: "Saran",
    quote:
      "NS Apps Innovations LLP showcased exceptional technical expertise by presenting immersive Virtual Reality–based 3D video content during Bihar Diwas 2025. Their innovative approach and professional execution significantly enhanced public engagement and demonstrated strong commitment to quality digital communication.",
    image: "/vaibhav.png",
    rating: 5,
  },
  {
    id: 3,
    name: "Sri Shekhar Anand, IAS",
    role: "District Magistrate",
    company: "Sheikhpura",
    quote:
      "Under the leadership of Nishant Shekhar, NS Apps Innovations developed impactful solutions like the ASPIRE App and Kishanganj Hariyali App. These applications improved attendance tracking, enabled carbon footprint assessment, and delivered efficient, user-friendly digital governance tools with measurable positive results.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    id: 4,
    name: "Sri Deepak Kumar Mishra, IAS",
    role: "Muncipal Commissioner",
    company: "Bihar Sharif",
    quote:
      "NS Apps Innovations LLP, led by Nishant Shekhar, delivered impactful digital solutions including the Asia Women's Hockey Championship 2024 App and Khelo India Youth Games modules. Their platforms enhanced live engagement, grievance redressal, and accommodation coordination, significantly improving the overall event experience. Their professionalism and innovation greatly supported successful district-level sporting events.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
];

const TestimonialCard = ({ t }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const maxLength = 150;
  const shouldTruncate = t.quote.length > maxLength;

  const toggleReadMore = () => setIsExpanded(!isExpanded);

  return (
    <div className="group h-full bg-white rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col relative">
      <div className="absolute top-6 left-6 text-gray-100 group-hover:text-blue-50 transition-colors duration-300">
        <Quote className="w-10 h-10 md:w-12 md:h-12 fill-current opacity-50" />
      </div>

      <div className="flex-grow mb-8 pt-6 relative z-10">
        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
          {isExpanded ? t.quote : `${t.quote.slice(0, maxLength)}${shouldTruncate ? "..." : ""}`}
        </p>
        {shouldTruncate && (
          <button
            onClick={toggleReadMore}
            className="text-gray-900 hover:text-gray-700 font-semibold text-xs mt-3 focus:outline-none inline-flex items-center"
          >
            {isExpanded ? "Show Less" : "Read More"}
            <span className="ml-1">{isExpanded ? "↑" : "→"}</span>
          </button>
        )}
      </div>

      <div className="absolute bottom-24 right-6 text-gray-100 group-hover:text-blue-50 transition-colors duration-300 rotate-180">
        <Quote className="w-10 h-10 md:w-12 md:h-12 fill-current opacity-50" />
      </div>

      <div className="flex items-center gap-4 pt-6 border-t border-gray-100 mt-auto relative z-10">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
          <img
            src={t.image}
            alt={t.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://ui-avatars.com/api/?name=" +
                t.name +
                "&background=random";
            }}
          />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-xs md:text-sm mb-1">
            {t.name}
          </h4>
          <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed">
            {t.role}, {t.company}
          </p>
        </div>
      </div>
    </div>
  );
};

const TestimonialCarousel = () => {
  const swiperRef = useRef(null);

  return (
    <section className="bg-gray-50 py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-6 lg:px-8 xl:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 mb-3 ">
              Testimonials
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Trusted by industry leaders and government departments for delivering impactful digital solutions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-gray-900 hover:border-gray-900 group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-900 shadow-lg hover:shadow-xl border border-gray-900 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-gray-900 hover:border-gray-900"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white transition-colors" />
            </button>
          </div>
        </div>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          speed={800}
          watchSlidesProgress={false}
          watchSlidesVisibility={false}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 28,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          className="!pb-14 !pt-3"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id} className="!h-auto !opacity-100">
              <TestimonialCard t={t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

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
    </section>
  );
};

export default TestimonialCarousel;
