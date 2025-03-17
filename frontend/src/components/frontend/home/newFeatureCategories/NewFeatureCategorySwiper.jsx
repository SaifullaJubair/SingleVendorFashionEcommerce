"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const NewFeatureCategorySwiper = ({ featureData }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
      {featureData.map(({ category }) => (
        <div key={category?._id} className="relative group">
          <Link href={`/category/${category.category_slug}`}>
            <div className="relative w-full aspect-[2/3] overflow-hidden shadow-lg">
              {category.category_video ? (
                <video
                  src={category?.category_video}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={category?.category_logo}
                  alt={category?.category_name || "Category Image"}
                  fill
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center bg-black bg-opacity-50 text-white py-2 text-xs sm:text-sm md:text-base lg:text-lg font-semibold">
              {category?.category_name}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NewFeatureCategorySwiper;

// const NewFeatureCategorySwiper = ({ featureData }) => {
//   return (
//     <Swiper
//       slidesPerView={5}
//       spaceBetween={30}
//       pagination={{ clickable: true }}
//       modules={[Pagination, Autoplay]}
//       className="mySwiper"
//       breakpoints={{
//         320: { slidesPerView: 1, spaceBetween: 10 }, // Mobile
//         640: { slidesPerView: 2, spaceBetween: 20 }, // Tablets
//         1024: { slidesPerView: 4, spaceBetween: 30 }, // Small desktops
//         1280: { slidesPerView: 5, spaceBetween: 30 }, // Large screens
//       }}
//       autoplay={{
//         delay: 4000,
//         disableOnInteraction: false,
//         reverseDirection: true,
//       }}
//       loop={true}
//     >
//       {featureData.map(({ category }) => (
//         <SwiperSlide key={category._id} className="relative group">
//           <Link href={`/category/${category.category_slug}`}>
//             <div className="w-full h-[460px] overflow-hidden  shadow-lg">
//               {category.category_video ? (
//                 <video
//                   src={category?.category_video}
//                   autoPlay
//                   loop
//                   muted
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <img
//                   src={category?.category_logo}
//                   alt={category?.category_name}
//                   className="w-full h-full object-cover"
//                 />
//               )}
//             </div>
//             <div className="absolute bottom-4 left-0 right-0 text-center bg-black bg-opacity-50 text-white py-2 text-lg font-semibold">
//               {category?.category_name}
//             </div>
//           </Link>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default NewFeatureCategorySwiper;
