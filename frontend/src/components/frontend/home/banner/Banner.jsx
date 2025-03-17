import { getBanner } from "@/components/lib/getBanner";
import BannerSwiperLeft from "./BannerSwiperLeft";
// import { BASE_URL } from "@/components/utils/baseURL";

const Banner = async () => {
  const data = await getBanner();
  const bannerData = data?.data;

  return (
    <div className="">
      {/* Grid Layout */}
      <div className="grid grid-cols-1   gap-5">
        {/* Left Banner Image - spans 5 columns */}
        <div>
          <BannerSwiperLeft oddBanner={bannerData} />
          {/* <TopNavbar /> */}
        </div>

        {/* <div className="md:hidden block">
          <MobileBanner bannerData={bannerData} />
        </div> */}
      </div>
    </div>
  );
};

export default Banner;
