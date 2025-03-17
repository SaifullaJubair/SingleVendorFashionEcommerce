"use client";
import Contain from "@/components/common/Contain";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MdOutlineHome } from "react-icons/md";
import { TbJewishStar } from "react-icons/tb";
import { BiPurchaseTag } from "react-icons/bi";
import { GiFlame } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";

import Dashboard from "./Dashboard";
import PurchaseHistory from "./PurchaseHistory";
import UserDashboardWishList from "./UserDashboardWishList";
import Cookies from "js-cookie";
import ShowProfileDetails from "./ShowProfileDetails";
import { useUserInfoQuery } from "@/redux/feature/auth/authApi";
import { LoaderOverlay } from "@/components/shared/loader/LoaderOverlay";
import Link from "next/link";
import OfferHistory from "./OfferHistory";
import { SlUserFollowing } from "react-icons/sl";
import DashBoardReview from "./ReviewDashBoard";
import { FaRegUser } from "react-icons/fa";
import { PhotoProvider, PhotoView } from "react-photo-view";
import useGetSettingData from "@/components/lib/getSettingData";
const UserProfile = () => {
  const [activeNavButton, setActiveNavButton] = useState("dashboard");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [actionButtonActive, setActionButtonActive] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".modal-container")) {
        setActionButtonActive(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveNavButton(tab);
    }
  }, [searchParams]);

  const {
    data: userInfo,
    isLoading: userGetLoading,
    refetch,
  } = useUserInfoQuery();

  const handleLogOut = () => {
    // Remove the token from cookies
    Cookies.remove("rousan_ecom_token");

    // Redirect to the home page
    router.push("/");
    window.location.reload();
  };
  useEffect(() => {
    // Check if the user info is undefined or null
    if (!userInfo && !userGetLoading) {
      router.push("/sign-in"); // Redirect to the sign-in page
    }
  }, [userInfo, userGetLoading, router]);
  if (userGetLoading) {
    return <LoaderOverlay />;
  }

  return (
    <PhotoProvider>
      <Contain>
        <div className="lg:grid lg:grid-cols-4 xl:grid-cols-5  gap-4 mt-6">
          {/* Left Sidebar */}
          <div className="border px-4 hidden lg:block h-[650px] lg:sticky lg:top-0 bg-white mb-6">
            <div className="flex flex-col items-center mt-6">
              {userInfo?.data?.user_image ? (
                <PhotoView src={userInfo?.data?.user_image}>
                  <img
                    src={userInfo?.data?.user_image}
                    alt=""
                    className="size-16 object-cover "
                  />{" "}
                </PhotoView>
              ) : (
                <div className="size-16 bg-gray-300 flex items-center justify-center">
                  <span className="text-3xl font-semibold text-gray-700">
                    {userInfo?.data?.user_name?.charAt(0) || <FaRegUser />}
                  </span>
                </div>
              )}
              {userInfo?.data?.user_name ? (
                <h4 className="font-bold mt-3">{userInfo?.data?.user_name}</h4>
              ) : (
                <h4 className="font-bold mt-3">{userInfo?.data?.user_phone}</h4>
              )}
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-4 mb-10">
              {[
                { name: "dashboard", icon: MdOutlineHome, label: "Dashboard" },
                { name: "wishlist", icon: TbJewishStar, label: "WishList" },
                {
                  name: "purchase-history",
                  icon: BiPurchaseTag,
                  label: "Purchase History",
                },
                // {
                //   name: "offer-history",
                //   icon: GiFlame,
                //   label: "Offer History",
                // },

                { name: "review", icon: SlUserFollowing, label: "Review" },
                {
                  name: "profile-setting",
                  icon: IoSettingsOutline,
                  label: "Profile Setting",
                },
              ].map((item) => (
                <Link
                  key={item.name}
                  className={`hover:bg-primaryVariant-500/90 hover:text-white flex items-center gap-3 font-medium py-2 px-4 w-full  ${
                    activeNavButton === item.name ? "bg-primary text-white" : ""
                  }`}
                  href={`?tab=${item.name}`}
                >
                  <span className="flex items-center justify-center w-8 h-8">
                    <item.icon size={25} />
                  </span>
                  <span className="flex-1 text-left capitalize">
                    {item.label}
                  </span>
                </Link>
              ))}
              <hr className="my-4" />
              <button
                className="flex items-center bg-secondary justify-center font-medium text-xl py-2 px-4 w-full  text-white"
                type="button"
                onClick={handleLogOut}
              >
                Sign Out
              </button>
            </div>
          </div>
          {/* <div>
          <MobileNavBarUserDashBoard />
        </div> */}
          {/* Mobile nav Section */}

          {/* Content Section */}
          <div className="lg:col-span-3 xl:col-span-4 lg:overflow-y-auto lg:scrollbar-thin mb-6">
            {activeNavButton === "dashboard" && <Dashboard />}
            {activeNavButton === "purchase-history" && <PurchaseHistory />}
            {activeNavButton === "wishlist" && <UserDashboardWishList />}
            {activeNavButton === "offer-history" && <OfferHistory />}
            {activeNavButton === "review" && (
              <DashBoardReview userInfo={userInfo} />
            )}
            {activeNavButton === "profile-setting" && (
              <ShowProfileDetails userInfo={userInfo} refetch={refetch} />
            )}
          </div>
        </div>
      </Contain>
    </PhotoProvider>
  );
};

// export default UserProfile;

export default function Page() {
  return (
    <Suspense fallback={<LoaderOverlay />}>
      <UserProfile />
    </Suspense>
  );
}
