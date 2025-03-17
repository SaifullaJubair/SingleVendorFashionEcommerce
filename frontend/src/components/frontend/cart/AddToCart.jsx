"use client";

import Link from "next/link";
import CartTable from "./CartTable";
import { toast } from "react-toastify";
import CartSummary from "./CartSummary";
import { useDispatch, useSelector } from "react-redux";
import Contain from "../../common/Contain";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { BASE_URL } from "@/components/utils/baseURL";
import { fetchCartDetails } from "@/utils/fetchCartDetails";
import { useUserInfoQuery } from "@/redux/feature/auth/authApi";
import useGetSettingData from "@/components/lib/getSettingData";
import DeliveryInformation from "../checkout/DeliveryInformation";
import { useForm } from "react-hook-form";
import { districts } from "@/data/districts";
import { productPrice } from "@/utils/helper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  allRemoveFromCart,
  removeFromCart,
} from "@/redux/feature/cart/cartSlice";
import PhoneInput, {
  formatPhoneNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import CartTableSkeleton from "@/components/shared/loader/CartTableSkeleton";
import DeliveryInformationSkeleton from "@/components/shared/loader/DeliveryInformationSkeleton";
import CartSummarySkeleton from "@/components/shared/loader/CartSummarySkeleton";

const AddToCart = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: userInfo, isLoading: userGetLoading } = useUserInfoQuery();
  const { data: settingData } = useGetSettingData();
  const [districtsData, setDistrictsData] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [division, setDivision] = useState(userInfo?.data?.user_division);
  const [district, setDistrict] = useState(userInfo?.data?.user_district);
  const [isOpenDistrict, setIsOpenDistrict] = useState(true);
  const [couponData, setCouponData] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [shouldFetch, setShouldFetch] = useState(true);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [shopSubtotals, setShopSubtotals] = useState(0);
  const [panelOwnerIds, setPanelOwnerIds] = useState(null);
  const [shopGrandTotals, setShopGrandTotals] = useState(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [adjustedPrices, setAdjustedPrices] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  const { products } = useSelector((state) => state.cart);
  const [cartList, setCartList] = useState([]);
  const dispatch = useDispatch();
  const [customer_phone, setUserPhone] = useState(
    userInfo?.data?.user_phone?.slice(3, 14)
  );
  const [userPhoneLogin, setUserPhoneLogin] = useState(false);
  useEffect(() => {
    if (userInfo?.data?.user_phone) {
      setUserPhone(userInfo?.data?.user_phone?.slice(3, 14));
    }
  }, [userInfo?.data?.user_phone]);

  // ✅ Load cart from Redux store into local state
  useEffect(() => {
    setCartList(products);
  }, [products]);

  useEffect(() => {
    if (userInfo?.data) {
      setDivision(userInfo?.data?.user_division);
      setDistrict(userInfo?.data?.user_district);
    }
  }, [userInfo]);

  useEffect(() => {
    if (districtId) {
      const districtData = districts.filter(
        (district) => district?.division_id === districtId
      );
      setDistrictsData(districtData);
    }
  }, [districtId]);
  // Fetch Cart Details

  const {
    data: cartData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["/api/v1/product/cart_product"],
    queryFn: async () => (await fetchCartDetails(cartList))?.data,
    // enabled: shouldFetch && cartList.length > 0,
    onSuccess: () => setShouldFetch(false),
  });

  // console.log(cartData);s
  useEffect(() => {
    if (cartData && cartData?.length > 0) {
      const updatedCart = products.filter((item) =>
        cartData?.some((cartItem) => {
          if (item.variation_product_id) {
            return (
              cartItem._id === item.productId &&
              cartItem.variations?._id === item.variation_product_id
            );
          } else {
            return cartItem._id === item.productId;
          }
        })
      );

      // ✅ Dispatch remove action for each missing product
      products?.forEach((item) => {
        const existsInCart = updatedCart.some(
          (updatedItem) =>
            updatedItem.productId === item.productId &&
            updatedItem.variation_product_id === item.variation_product_id
        );

        if (!existsInCart) {
          dispatch(
            removeFromCart({
              productId: item.productId,
              variation_product_id: item.variation_product_id,
              product_quantity: item.quantity,
            })
          );
        }
      });

      // console.log("Updated Cart List:", updatedCart);
    }
  }, [cartData, products, dispatch]);

  const calculateSubtotal = (product) => {
    const price = productPrice(product);

    const quantity = products?.find(
      (item) =>
        item?.productId === product?._id &&
        (product?.variations?._id
          ? item?.variation_product_id === product?.variations?._id
          : true)
    )?.quantity;

    return price * (quantity || 1);
  };
  // this subtotal for All product in the cart for right side
  const calculateShopSubtotals = () => {
    const subTotal = (Array.isArray(cartData) ? cartData : [])?.reduce(
      (acc, product) => acc + calculateSubtotal(product),
      0
    );
    return subTotal;
  };

  // this function for All product in the cart calculate grand total for right side
  const calculateShopGrandTotals = (subtotals) => {
    let grandTotals = 0;
    grandTotals = calculateShopSubtotalUsingCoupon(subtotals);

    return grandTotals;
  };

  // Coupon Type Specific Calculation
  const calculationCouponProductPrice = (price) => {
    if (
      couponData?.coupon_product_type === "specific" &&
      couponData?.coupon_type === "percentage"
    ) {
      const discountPrice = Math.round(
        (price * couponData?.coupon_amount) / 100
      );
      if (discountPrice > couponData?.coupon_max_amount) {
        if (couponData?.coupon_max_amount > price) {
          return 0;
        } else {
          return price - couponData?.coupon_max_amount;
        }
      }
      return price - discountPrice;
    } else if (
      couponData?.coupon_product_type === "specific" &&
      couponData?.coupon_type === "fixed"
    ) {
      if (couponData?.coupon_amount > price) {
        return 0;
      } else {
        return price - couponData?.coupon_amount;
      }
    }
    return price;
  };

  // this subtotal for product table product single product quantity * price
  const calculateProductSubtotal = (product) => {
    const price =
      couponData?.coupon_product_type === "specific" &&
      couponData?.coupon_specific_product?.some(
        (item) => item?.product_id === product?._id
      )
        ? calculationCouponProductPrice(productPrice(product))
        : productPrice(product);

    const quantity = products?.find(
      (item) =>
        item?.productId === product?._id &&
        (product?.variations?._id
          ? item?.variation_product_id === product?.variations?._id
          : true)
    )?.quantity;

    return price * (quantity || 1);
  };

  // this function for All product in the cart calculate Coupon subtotal for right side
  const calculateShopSubtotalUsingCoupon = (subTotal) => {
    if (!couponData) {
      return subTotal;
    }

    if (
      couponData?.coupon_product_type === "all" &&
      couponData?.coupon_type === "percent"
    ) {
      const discountAmount = Math.round(
        (subTotal * couponData?.coupon_amount) / 100
      );
      if (discountAmount > couponData?.coupon_max_amount) {
        return subTotal - couponData?.coupon_max_amount;
      }
      return subTotal - discountAmount;
    } else if (
      couponData?.coupon_product_type === "all" &&
      couponData?.coupon_type === "fixed"
    ) {
      if (subTotal - couponData?.coupon_amount < 0) {
        return 0;
      }

      return subTotal - couponData?.coupon_amount;
    }

    return subTotal;
  };

  const calculateProductShopSubtotals = () => {
    const subTotal = (Array.isArray(cartData) ? cartData : [])?.reduce(
      (acc, product) => acc + calculateProductSubtotal(product),
      0
    );

    return subTotal;
  };

  const shippingCharge =
    division === "Dhaka"
      ? settingData?.data?.[0]?.inside_dhaka_shipping_charge || 0
      : settingData?.data?.[0]?.outside_dhaka_shipping_charge || 0;

  // ------**********-----------//
  useEffect(() => {
    if (cartData && cartData?.length > 0) {
      const subtotals = calculateShopSubtotals(couponData);

      const hasSpecificCoupon = couponData?.coupon_product_type === "specific";
      const grandTotals = hasSpecificCoupon
        ? calculateShopGrandTotals(calculateProductShopSubtotals())
        : calculateShopGrandTotals(subtotals);

      // Avoid unnecessary state updates to prevent infinite loops
      if (shopSubtotals !== subtotals) {
        setShopSubtotals(subtotals);
      }
      if (shopGrandTotals !== grandTotals + shippingCharge) {
        setShopGrandTotals(grandTotals + shippingCharge);
      }
      if (totalDiscount !== shopSubtotals - grandTotals) {
        setTotalDiscount(shopSubtotals - grandTotals);
      }
      // Calculate adjusted prices for coupon products
      const newAdjustedPrices = {};

      cartData?.forEach((product) => {
        const price = productPrice(product);
        newAdjustedPrices[product._id] = calculationCouponProductPrice(price);
      });

      if (
        JSON.stringify(adjustedPrices) !== JSON.stringify(newAdjustedPrices)
      ) {
        setAdjustedPrices(newAdjustedPrices);
      }
    }
  }, [couponData, shippingCharge, products, shopSubtotals, cartData]);
  // }, [couponData, shippingCharge, cartData]);
  // useEffect(() => {
  //   console.log("useEffect triggered", { cartData, couponData, shippingCharge });
  // Your logic here
  // }, [cartData, couponData, shippingCharge]);
  // Set Coupon Data from Session Storage
  // useEffect(() => {
  //   const sessionCouponData = JSON.parse(
  //     sessionStorage.getItem("sessionCouponData")
  //   );

  //   const sessionDate = sessionStorage.getItem("sessionDate");
  //   const currentDate = new Date().toISOString().split("T")[0];
  //   if (sessionDate !== currentDate) {
  //     sessionStorage.removeItem("sessionCouponData");
  //     sessionStorage.removeItem("sessionDate");
  //     sessionStorage.removeItem("order_info");
  //   } else {
  //     setCouponData(sessionCouponData);
  //   }
  // }, []);

  // Toggle Input
  const handleShowCouponInput = (id) => {
    setPanelOwnerIds((prevPanelOwnerId) =>
      prevPanelOwnerId === id ? null : id
    );
  };
  const handleRemoveCoupon = () => {
    // Clear the coupon data from sessionStorage and state
    // sessionStorage.removeItem("sessionCouponData");
    setCouponCode("");
    setCouponData(null);
    toast.success("Coupon removed successfully!");
  };

  // Apply Coupon Post Request
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a valid coupon code.");
      return;
    }

    setIsApplyingCoupon(true);
    try {
      const response = await fetch(`${BASE_URL}/coupon/check_coupon`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coupon_code: couponCode,
          customer_id: userInfo?.data?._id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Coupon applied successfully!");
        // console.log(data);

        // sessionStorage.setItem("sessionCouponData", JSON.stringify(data?.data));
        // sessionStorage.setItem(
        //   "sessionDate",
        //   new Date().toISOString().split("T")[0]
        // );
        setCouponData(data?.data);
      } else {
        toast.error(data.message || "Failed to apply coupon.");
      }
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleOrderProduct = async (data) => {
    if (userPhoneLogin == false) {
      if (customer_phone) {
        console.log("Customer Phone:", customer_phone);
        const formatPhoneNumberValueCheck = formatPhoneNumber(customer_phone);
        const isPossiblePhoneNumberValueCheck =
          isPossiblePhoneNumber(customer_phone);
        const isValidPhoneNumberValueCheck = isValidPhoneNumber(customer_phone);
        if (formatPhoneNumberValueCheck == false) {
          toast.error("Mobile number not valid !", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }
        if (isPossiblePhoneNumberValueCheck == false) {
          toast.error("Mobile number not valid !", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }
        if (isValidPhoneNumberValueCheck == false) {
          toast.error("Mobile number not valid !", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }
      }
    }

    if (!customer_phone) {
      toast.error("Phone is required !", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    // console.log(data);
    const today =
      new Date().toISOString().split("T")[0] +
      " " +
      new Date().toLocaleTimeString();
    if (!district || !division)
      return toast.error("Please select a district and division.");
    const sendData = {
      order_status: "pending",
      pending_time: today,
      customer_id: userInfo?.data?._id,
      customer_name: data?.customer_name || userInfo?.data?.user_name,
      customer_phone: customer_phone ? customer_phone : data?.customer_phone,
      billing_country: "Bangladesh",
      billing_city: district || userInfo?.data?.user_district,
      billing_state: division || userInfo?.data?.user_division,
      billing_address: data?.address || userInfo?.data?.user_address,
      shipping_location:
        division === "Dhaka"
          ? ` Inside Dhaka, ${settingData?.data[0]?.inside_dhaka_shipping_days} Days`
          : `Outside Dhaka, ${settingData?.data[0]?.outside_dhaka_shipping_days} Days`,
      sub_total_amount: shopSubtotals ? shopSubtotals : 0,
      discount_amount: totalDiscount || 0,
      shipping_cost: shippingCharge || 0,
      grand_total_amount: shopGrandTotals ? shopGrandTotals : 0,
      coupon_id: couponData?._id || null,
      need_user_create: userInfo?.data?.user_phone ? false : true,

      order_products: cartData?.map((product) => {
        const originalPrice = product?.is_variation
          ? product?.variations?.variation_price
          : product?.product_price;

        const originalDiscountPrice = product?.is_variation
          ? product?.variations?.variation_discount_price
          : product?.product_discount_price;

        const productQuantity = products?.find(
          (item) =>
            item?.productId === product?._id &&
            (product?.variations?._id
              ? item?.variation_product_id === product?.variations?._id
              : true)
        )?.quantity;

        return {
          product_id: product._id,
          variation_id: product.variations?._id || null,
          product_main_price: originalPrice,
          product_main_discount_price: originalDiscountPrice || 0,
          product_unit_price: productPrice(product),
          product_unit_final_price:
            couponData?.coupon_product_type === "specific" &&
            couponData?.coupon_specific_product?.some(
              (item) => item?.product_id === product?._id
            )
              ? adjustedPrices[product?._id]
              : productPrice(product),
          product_quantity: productQuantity,
          product_grand_total_price:
            couponData?.coupon_product_type === "specific" &&
            couponData?.coupon_specific_product?.some(
              (item) => item?.product_id === product?._id
            )
              ? adjustedPrices[product?._id] * productQuantity
              : productPrice(product) * productQuantity,
          campaign_id: product?.campaign_details?._id || null,
        };
      }),
    };

    // console.log(sendData);
    // return;

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const result = await response.json();

      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message ? result?.message : "Order created successfully",
          {
            autoClose: 1000,
          }
        );
        dispatch(allRemoveFromCart());
        navigate.push("/orders/order-success");
        // localStorage.removeItem("cart");
        setLoading(false);
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error posting data:", error);
      setLoading(false);
    }
  };

  // if (isLoading || settingLoading || userGetLoading) return <CustomLoader />;

  // console.log(subtotal);

  if (!products?.length && !cartData?.length && !isLoading) {
    return (
      <div className="text-center max-w-md mx-auto mt-2 bg-white p-6   shadow-lg">
        <img
          src="/assets/images/empty/Empty-cuate.png"
          alt="Empty cart"
          className="mx-auto mb-2 w-80"
        />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Your cart is empty!
        </h3>
        <p className="text-gray-600 mb-6">
          Looks like you haven’t added anything to your cart yet.
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Link href="/">
            <Button className="w-full">Go Home</Button>
          </Link>

          <Link href="/all-products">
            <Button variant="secondary" className="w-full">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-[#F4F4F4]/50">
      <form onSubmit={handleSubmit(handleOrderProduct)}>
        <Contain>
          <div>
            <div className="pt-6">
              <h1 className="font-thin text-text-default">Your Cart</h1>
              <p className="font-thin text-text-default">
                There are {products?.length} products in this list
              </p>
            </div>
          </div>
          <div className="grid md:gap-4 lg:gap-4 grid-cols-1 md:grid-cols-5 lg:grid-cols-4">
            <div className="flex gap-6 md:col-span-3 mt-4 overflow-x-auto pb-6">
              <div className="w-full  ">
                <div className="w-full space-y-6">
                  <div className="my-3 py-2 bg-white  w-full">
                    <div className="overflow-x-auto  mx-4">
                      {isLoading ? (
                        <CartTableSkeleton />
                      ) : (
                        <CartTable
                          refetch={refetch}
                          products={products}
                          couponData={couponData}
                          shopProduct={cartData}
                          adjustedPrices={adjustedPrices}
                          calculateProductSubtotal={calculateProductSubtotal}
                        />
                      )}
                    </div>
                    {/* Coupon section & shop subtotal and grand total  part */}
                  </div>
                  {userGetLoading ? (
                    <DeliveryInformationSkeleton />
                  ) : (
                    <DeliveryInformation
                      register={register}
                      userInfo={userInfo}
                      errors={errors}
                      setDivision={setDivision}
                      setDistrictId={setDistrictId}
                      setDistrict={setDistrict}
                      setIsOpenDistrict={setIsOpenDistrict}
                      isOpenDistrict={isOpenDistrict}
                      districtsData={districtsData}
                      division={division}
                      district={district}
                      setUserPhoneLogin={setUserPhoneLogin}
                      customer_phone={customer_phone}
                      setUserPhone={setUserPhone}
                    />
                  )}
                </div>
              </div>
            </div>
            {/*All shop  subtotal and grand total  part right side cart summary */}
            <div className="md:col-span-2 space-y-6 lg:col-span-1">
              {" "}
              {isLoading || userGetLoading ? (
                <CartSummarySkeleton />
              ) : (
                <CartSummary
                  userInfo={userInfo}
                  totalDiscount={totalDiscount}
                  shippingCharge={shippingCharge}
                  userGetLoading={userGetLoading}
                  handleOrderProduct={handleOrderProduct}
                  couponData={couponData}
                  shopProduct={cartData}
                  setCouponCode={setCouponCode}
                  panelOwnerIds={panelOwnerIds}
                  shopSubtotals={shopSubtotals}
                  shopGrandTotals={shopGrandTotals}
                  isApplyingCoupon={isApplyingCoupon}
                  handleApplyCoupon={handleApplyCoupon}
                  handleRemoveCoupon={handleRemoveCoupon}
                  handleShowCouponInput={handleShowCouponInput}
                  division={division}
                  loading={loading}
                />
              )}
            </div>
          </div>
        </Contain>
      </form>
    </div>
  );
};

export default AddToCart;
