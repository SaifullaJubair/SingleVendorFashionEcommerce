"use client";
// Loader/SkeletonLoader.js
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const ProductSectionSkeleton = ({ count = 10 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="   shadow-md   ">
          <Skeleton className=" h-[260px] sm:h-[350px] xl:h-[420px]" />

          <div className="p-1 m-2 flex flex-col  ">
            {" "}
            <Skeleton height={20} className="mb-4" width="80%" />
            <Skeleton height={15} width="60%" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSectionSkeleton;
