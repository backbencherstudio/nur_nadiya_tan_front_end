"use client";
import { useRef, useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import WatchVideo from "../maids/WatchVideo";

function Serve() {
    const swiperRef = useRef<any>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const videoList = [
        {
            id: "vid-001",
            video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            poster: "/maids/poster.jpg",
            title: "Pediatric Consultation Session"
        },
        {
            id: "vid-002",
            video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            poster: "/maids/poster.jpg",
            title: "Child Nutrition Guidelines"
        },
        {
            id: "vid-003",
            video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            poster: "/maids/poster.jpg",
            title: "Newborn Baby Care Basics"
        },
        {
            id: "vid-004",
            video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            poster: "/maids/poster.jpg",
            title: "Common Childhood Illnesses"
        }
    ];

    const goNext = () => {
        if (swiperRef.current) swiperRef.current.slideNext();
    };

    const goPrev = () => {
        if (swiperRef.current) swiperRef.current.slidePrev();
    };

    return (
        <section className="py-12 bg-secondBg lg:py-24 relative overflow-hidden">
            <div className="w-full  relative">
                {/* Inner container with large max-width */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <button onClick={goPrev} className="absolute cursor-pointer z-10 top-1/2 -translate-y-1/2 left-4 md:left-12">
                        <div className="flex group items-center justify-center lg:w-12 lg:h-8 w-8 h-6 sm:w-10 sm:h-8 -ml-3 rounded-sm sm:rounded-md border border-primaryColor hover:bg-primaryColor/80 shadow-lg transition-all">
                             <FaLongArrowAltLeft className="text-primaryColor group-hover:text-whiteColor text-sm sm:text-lg md:text-xl" />
                        </div>
                    </button>

                    <button onClick={goNext} className="absolute cursor-pointer z-10 top-1/2 -translate-y-1/2 right-4 md:right-12">
                        <div className="flex group items-center justify-center lg:w-12 lg:h-8 w-8 h-6 sm:w-10 sm:h-8  -ml-3 rounded-sm sm:rounded-md border border-primaryColor hover:bg-primaryColor/80 shadow-lg transition-all ">
                             <FaLongArrowAltRight className="text-primaryColor group-hover:text-whiteColor text-sm sm:text-lg md:text-xl" />
                        </div>
                    </button>

                    {/* Swiper Slider */}
                    <Swiper
                        slidesPerView={1.2}
                        centeredSlides={true}
                        spaceBetween={15}
                        loop={true}
                        speed={800}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false
                        }}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
                        breakpoints={{
                            768: {
                                slidesPerView: 1.2,
                                centeredSlides: true,
                                spaceBetween: 30
                            },
                            1024: {
                                slidesPerView: 1.2,
                                centeredSlides: true,
                                 spaceBetween: 30
                            },
                            1220: {
                                slidesPerView: 1.2,
                                centeredSlides: true,
                                 spaceBetween: 30,
                            }
                        }}
                        className="w-full"
                    >
                        {videoList.map((item) => (
                            <SwiperSlide key={item.id} className="flex justify-center">
                                <WatchVideo
                                    poster={item.poster}
                                    src={item.video}
                                    title={item.title}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default Serve;
