"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image"; // Next.js Image Component
import { Button } from "@/components/ui/button";
import { images } from "@/components/utils/ImageImport";
import { Suspense, useEffect, useState } from "react";
import ProductSectionSkeleton from "@/components/shared/loader/ProductSectionSkeleton";

const BannerSwiperLeft = ({ oddBanner }) => {
  // State to store filtered banners based on screen size
  const [filteredBanners, setFilteredBanners] = useState(oddBanner);
  // useEffect(() => {
  //   // Function to determine screen size and filter banners
  //   const filterBanners = () => {
  //     const width = window.innerWidth;

  //     if (width <= 640) {
  //       // Mobile (banner_serial between 11-15)
  //       setFilteredBanners(
  //         oddBanner.filter(
  //           (banner) =>
  //             banner?.banner_serial >= 11 && banner?.banner_serial <= 15
  //         )
  //       );
  //     } else if (width <= 1024) {
  //       // Tablet (banner_serial between 6-10)
  //       setFilteredBanners(
  //         oddBanner.filter(
  //           (banner) =>
  //             banner?.banner_serial >= 6 && banner?.banner_serial <= 10
  //         )
  //       );
  //     } else {
  //       // Large Screen (banner_serial between 1-5)
  //       setFilteredBanners(
  //         oddBanner.filter(
  //           (banner) => banner?.banner_serial >= 1 && banner?.banner_serial <= 5
  //         )
  //       );
  //     }
  //   };

  //   // Filter banners on initial render
  //   filterBanners();

  //   // Add event listener to handle window resize
  //   window.addEventListener("resize", filterBanners);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", filterBanners);
  //   };
  // }, [oddBanner]); // Re-run the effect when `oddBanner` changes

  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={10}
        slidesPerView={1}
        className="w-full"
      >
        <Suspense fallback={<ProductSectionSkeleton />}></Suspense>
        {oddBanner?.map((banner, i) => {
          // Define aspect ratio classes based on banner_serial
          // let bannerSizeClass = "lg:h-[440px] xl:h-[700px]"; // Default (large screen)

          // if (banner?.banner_serial >= 6 && banner?.banner_serial <= 10) {
          //   bannerSizeClass = "lg:h-[350px] xl:h-[500px]"; // Medium screen
          // } else if (
          //   banner?.banner_serial >= 11 &&
          //   banner?.banner_serial <= 15
          // ) {
          //   bannerSizeClass = "h-[250px] lg:h-[300px]"; // Mobile view
          // }

          return (
            <SwiperSlide key={banner?._id || i}>
              <div
                className={`relative w-full h-[300px] md:h-[440px] lg:h-[500px] xl:h-[700px]`}
              >
                {/* Next.js Image component for optimized images */}
                <Image
                  src={banner?.banner_image} // Fallback for missing image
                  alt={`Banner ${i}`}
                  fill
                  className="w-full h-full "
                  placeholder="blur"
                  property
                  blurDataURL={images.loadingProductImg}
                />
                {/* Banner Title positioned above the Shop Now button */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-white bg-black bg-opacity-50 px-4 py-2 rounded-md">
                  <h2 className="text-sm sm:text-lg  md:text-xl lg:text-2xl text-slate-300 font-bold">
                    {banner?.banner_title || "Made for creating tasty memories"}
                  </h2>
                </div>
                {/* Shop Now button */}
                <Button className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <a
                    href={banner?.banner_path || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Shop Now
                  </a>
                </Button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default BannerSwiperLeft;
