"use client"
import { useRef, useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight, FaStar } from "react-icons/fa";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHeader from "../reusable/SectionHeader";

function CustomersSay() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const swiperRef = useRef<any>(null);

  const goNext = () => swiperRef.current?.slideNext();
  const goPrev = () => swiperRef.current?.slidePrev();

  const testimonials = [
    {
      id: 1,
      name: "Mrs. Tan",
      location: "Bedok",
      testimonial: "We got a fantastic helper within 10 days – the process was smooth and stress-free!",
      rating: 5,
      imageUrl: "/profile.png", // Replace with actual image
    },
    {
      id: 2,
      name: "Mr. Goh",
      location: "Bukit Timah",
      testimonial: "Very professional. I could speak with the helper before hiring, which gave me great peace of mind.",
      rating: 5,
      imageUrl: "/profile.png", // Replace with actual image
    },
    {
      id: 3,
      name: "Ms. Fatimah",
      location: "Jurong",
      testimonial: "Their real-time database helped me make a quick decision. Excellent service!",
      rating: 5,
      imageUrl: "/profile.png", // Replace with actual image
    },
    {
      id: 4,
      name: "Mrs. Lim",
      location: "Tampines",
      testimonial: "The agency made finding a reliable helper so much easier. Highly recommended!",
      rating: 5,
      imageUrl: "/profile.png", // Replace with actual image
    },
    {
      id: 5,
      name: "Mr. Wong",
      location: "Woodlands",
      testimonial: "Professional service and excellent candidates. Very satisfied with the process.",
      rating: 5,
      imageUrl: "/profile.png", // Replace with actual image
    },
  ];

  return (
    <div className="py-14 lg:py-[120px] bg-yellow-50">
      <section className="container">
        <div>
          <SectionHeader 
            title="What Our Customers Say" 
            description="Real testimonials from satisfied employers who found their perfect helpers" 
          />
        </div>

        <div className="mt-12">
          <div className="relative">
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center absolute top-1/2 -translate-y-1/2 z-10 w-full ">
              <button onClick={goPrev}>
                <div className="flex items-center group justify-center cursor-pointer 2xl:-ml-16 lg:w-12 lg:h-8 w-8 h-6 sm:w-10 sm:h-8  -ml-3 rounded-sm sm:rounded-md border border-primaryColor hover:bg-primaryColor/80 shadow-lg transition-all">
                  <FaLongArrowAltLeft className="text-primaryColor group-hover:text-whiteColor w-5 h-5" />
                </div>
              </button>
              <button onClick={goNext}>
                <div     className="flex items-center group justify-center  cursor-pointer relative -right-3 2xl:-right-16 lg:w-12 lg:h-8 w-8 h-6 sm:w-10 sm:h-8 rounded-sm sm:rounded-md border-primaryColor border hover:bg-primaryColor/80 shadow-lg transition-all">
                  <FaLongArrowAltRight className="text-primaryColor group-hover:text-whiteColor w-5 h-5" />
                </div>
              </button>
            </div>

            {/* Swiper */}
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              speed={1000}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              modules={[Navigation, Autoplay, Pagination]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex + 1)}
              className="w-full px-16"
              pagination={{
                clickable: true,
                bulletClass: 'testimonial-bullet',
                bulletActiveClass: 'testimonial-bullet-active',
              }}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id} className="h-full">
                  <div className="bg-white rounded-lg p-6 shadow-lg h-full flex flex-col min-h-[260px] justify-between">
                    {/* Profile Section */}
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                          <img
                            src={testimonial.imageUrl}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-headerColor">{testimonial.name}</h4>
                          <p className="text-descriptionColor">{testimonial.location}</p>
                        </div>
                      </div>

                      {/* Testimonial Quote */}
                      <div className="mb-4">
                        <p className="text-descriptionColor leading-[160%] ">
                          "{testimonial.testimonial}"
                        </p>
                      </div>
                    </div>
                    {/* Rating */}
                    <div className="flex gap-1 mt-2">
                      {[...Array(testimonial.rating)].map((_, index) => (
                        <FaStar key={index} className="text-yellow-400 w-4 h-4" />
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <style jsx global>{`
          .testimonial-bullet {
            width: 10px !important;
            height: 4px !important;
            background-color: #e5e7eb !important;
            border-radius: 4px !important;
            transition: all 0.3s ease;
            margin: 0 4px !important;
            margin-top: 20px !important;
            display: inline-block;
            cursor: pointer;
          }

          .testimonial-bullet-active {
            width: 24px !important;
            background-color: #45CCD2 !important;
            border-radius: 4px !important;
          }
        `}</style>
      </section>
    </div>
  );
}

export default CustomersSay;

