import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaLock, FaTimes } from "react-icons/fa";

const CouponSection = ({
  userInfo,
  handleApplyCoupon,
  handleRemoveCoupon,
  handleShowCouponInput,
  panelOwnerIds,
  setCouponCode,
  couponData,
  shopProduct,
  isApplyingCoupon,
  shopSubtotals,
  shopGrandTotals,
}) => {
  return (
    <div className="p-2">
      {/* Apply Coupon */}
      <div>
        {userInfo?.data?._id ? (
          <div className="max-w-sm ml-auto sm:mr-8 mr-4">
            {Array.isArray(couponData) &&
            couponData?.some(
              (coupon) => coupon?.panel_owner_id === shopProduct?.panel_owner_id
            ) ? (
              <div className="flex justify-between items-center mt-4 p-4 bg-red-50   shadow-md">
                <div className="flex items-center">
                  <p className="text-text-Lighter font-semibold mr-2 text-sm sm:text-base">
                    Coupon Code:
                  </p>
                  <span className="bg-primary text-white px-2   ">
                    {
                      couponData?.find(
                        (coupon) =>
                          coupon?.panel_owner_id === shopProduct?.panel_owner_id
                      )?.coupon_code
                    }
                  </span>
                </div>
                <button
                  className="text-red-500 hover:underline flex items-center text-sm sm:text-base"
                  onClick={() =>
                    handleRemoveCoupon(shopProduct?.panel_owner_id)
                  }
                >
                  <FaTimes className="mr-1" />
                  Remove
                </button>
              </div>
            ) : (
              <>
                {" "}
                <div className="flex justify-between items-center mt-4">
                  <p className="text-text-Lighter">Apply Coupon</p>
                  <button
                    className="text-primary hover:underline"
                    onClick={() =>
                      handleShowCouponInput(shopProduct?.panel_owner_id)
                    }
                  >
                    {panelOwnerIds === shopProduct?.panel_owner_id
                      ? "Cancel"
                      : "Enter Your Coupon"}
                  </button>
                </div>
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    panelOwnerIds === shopProduct?.panel_owner_id
                      ? "max-h-40 mt-2"
                      : "max-h-0"
                  }`}
                >
                  {panelOwnerIds === shopProduct?.panel_owner_id && (
                    <div className="flex items-center mt-2">
                      <input
                        type="text"
                        className="border   p-2 w-full"
                        placeholder="Enter coupon code"
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button
                        size="lg"
                        className="bg-primary   text-white p-2 ml-2"
                        onClick={() =>
                          handleApplyCoupon(shopProduct?.panel_owner_id)
                        }
                        disabled={isApplyingCoupon}
                      >
                        {isApplyingCoupon ? "Applying..." : "Apply"}
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-end text-text-Lightest mr-16">
              <Link href={"/sign-in"}>
                <Button
                  size="sm"
                  variant="link"
                  className="text-text-Lighter text-base hover:text-blue-500"
                >
                  <FaLock /> Login
                </Button>
              </Link>
              <p> for Apply Coupon</p>
            </div>
          </div>
        )}
      </div>
      {/* Shop subtotal And GrandTotal */}
      {Array.isArray(couponData) &&
      couponData?.some(
        (coupon) => coupon?.panel_owner_id === shopProduct?.panel_owner_id
      ) ? (
        <div>
          <div className="max-w-sm ml-auto sm:mr-8 mr-4">
            <div className="flex justify-between items-center mt-4">
              <p className="text-text-Lighter">Shop SubTotal: </p>
              <p className="text-text-Lighter">
                ৳ {shopSubtotals[shopProduct?.panel_owner_id] || 0}
              </p>
            </div>
          </div>
          <div className="max-w-sm ml-auto sm:mr-8 mr-4">
            <div className="flex justify-between items-center mt-4">
              <p className="text-text-Lighter">Shop Discount Amount: </p>
              <p className="text-text-Lighter">
                ৳ -{" "}
                {shopSubtotals[shopProduct?.panel_owner_id] -
                  shopGrandTotals[shopProduct?.panel_owner_id]}
              </p>
            </div>
          </div>
          <div className="max-w-sm ml-auto sm:mr-8 mr-4">
            <div className="flex justify-between items-center mt-4">
              <p className="text-text-Lighter">Shop Grandtotal: </p>
              <p className="text-text-Lighter">
                ৳ {shopGrandTotals[shopProduct?.panel_owner_id] || 0}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="max-w-sm ml-auto sm:mr-8 mr-4">
            <div className="flex justify-between items-center mt-4">
              <p className="text-text-Lighter">Shop SubTotal: </p>
              <p className="text-text-Lighter">
                ৳ {shopSubtotals[shopProduct?.panel_owner_id] || 0}
              </p>
            </div>
          </div>
          <div className="max-w-sm ml-auto sm:mr-8 mr-4">
            <div className="flex justify-between items-center mt-4">
              <p className="text-text-Lighter">Shop Discount Amount: </p>
              <p className="text-text-Lighter">৳ - 0</p>
            </div>
          </div>
          <div className="max-w-sm ml-auto sm:mr-8 mr-4">
            <div className="flex justify-between items-center mt-4">
              <p className="text-text-Lighter">Shop Grandtotal: </p>
              <p className="text-text-Lighter">
                ৳ {shopGrandTotals[shopProduct?.panel_owner_id]}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponSection;
