"use client";
import { useEffect, useState } from "react";
import Stepper from "./Stepper";
import { EnglishDateLong } from "../utils/EnglishDateLong";
import { EnglishDateWithTimeShort } from "../utils/EnglishDateWithTimeShort";

const MyOrderTracking = ({ order, productOrder }) => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate total price for each product
    const calculateTotalPrice = (quantity, product_price) =>
      quantity * product_price;

    // Calculate overall total price for all products
    const calculateOverallTotal = () => {
      return productOrder?.reduce((total, product) => {
        const productTotal = calculateTotalPrice(
          product.product_quantity,
          product.product_unit_final_price
        );
        return total + productTotal;
      }, 0);
    };
    setTotalAmount(calculateOverallTotal());
  }, [productOrder]);

  return (
    <div className="my-5">
      <p className="my-5 text-center text-2xl font-semibold text-primary underline mt-8">
        My Order Status
      </p>
      <section className="bg-white py-5   shadow overflow-x-auto overflow-hidden">
        <Stepper order={order} />
      </section>
      <section className="bg-white mt-5 md:px-10 p-1 lg:p-5  ">
        <div className="py-12">
          <div className="grid gap-4 mx-4 sm:grid-cols-12">
            <div className="col-span-12 sm:col-span-3">
              <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:  before:mx-auto sm:before:mx-0 before:bg-primary">
                <h3 className="text-3xl font-medium">Invoice no.</h3>
                <span className="text-sm font-bold tracking-normal uppercase text-gray-600">
                  {order?.invoice_id}
                </span>
              </div>
            </div>
            <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
              <div className="col-span-12 space-y-5 relative px-4 sm:col-span-8 sm:space-y-8 before:absolute before:top-2 before:bottom-0 before:w-0.5 before:-left-3 before:bg-primary">
                {order?.pending_time && (
                  <div className="flex flex-col relative before:absolute before:top-1 before:w-4 before:h-4 before: before:left-[-30px] before:z-[1] before:bg-primary">
                    <h3 className="text-lg font-medium tracking-normal">
                      Delivery status: Pending
                    </h3>
                    <time className="text-xs tracking-normal uppercase text-gray-600">
                      {EnglishDateWithTimeShort(order?.pending_time)}
                    </time>
                  </div>
                )}
                {order?.processing_time && (
                  <div className="flex flex-col relative before:absolute before:top-2 before:w-4 before:h-4 before: before:left-[-30px] before:z-[1] before:bg-primary">
                    <h3 className="text-lg font-medium tracking-normal">
                      Delivery status: Processing
                    </h3>
                    <time className="text-xs tracking-normal uppercase text-gray-600">
                      {EnglishDateWithTimeShort(order?.processing_time)}
                    </time>
                  </div>
                )}
                {order?.shipped_time && (
                  <div className="flex flex-col relative before:absolute before:top-2 before:w-4 before:h-4 before: before:left-[-30px] before:z-[1] before:bg-primary">
                    <h3 className="text-lg font-medium tracking-normal">
                      Delivery status: Shipped
                    </h3>
                    <time className="text-xs tracking-normal uppercase text-gray-600">
                      {EnglishDateWithTimeShort(order?.shipped_time)}
                    </time>
                  </div>
                )}
                {order?.delivered_time && (
                  <div className="flex flex-col relative before:absolute before:top-2 before:w-4 before:h-4 before: before:left-[-30px] before:z-[1] before:bg-primary">
                    <h3 className="text-lg font-medium tracking-normal">
                      Delivery status: Delivered
                    </h3>
                    <time className="text-xs tracking-normal uppercase text-gray-600">
                      {EnglishDateWithTimeShort(order?.delivered_time)}
                    </time>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white md:px-10 p-1 lg:p-5   shadow mt-5">
        <div className="space-y-2">
          <details
            open
            className="border group [&_summary::-webkit-details-marker]:hidden mb-5"
          >
            <summary className="bg-bgray-300 py-2.5 px-4 flex justify-between cursor-pointer">
              <h6 className="mb-0">Order Summary</h6>
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
            {productOrder?.map((product, i) => (
              <div
                className="flex items-center gap-2 border-b bg-white py-2 px-4"
                key={i}
              >
                <div className="w-[70px] h-[70px] border mr-3">
                  <img
                    src={
                      product?.variation_id
                        ? product?.variation_id?.variation_image
                        : product?.product_id?.main_image
                    }
                    alt={product?.product_id?.product_name}
                    className="object-fill w-[100px] h-[70px]"
                  />
                </div>
                <div className="flex flex-col flex-1 space-y-2">
                  <h2 className="text-[15px] tracking-normalng-tight leading-5 mb-0 font-normal">
                    {product?.product_id?.product_name}
                  </h2>
                  <div className="flex justify-between items-center mr-2">
                    <p className="text-base mb-0 font-medium">
                      {product?.product_quantity} X{" "}
                      {product?.product_unit_final_price}৳
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </details>
          <div className="border   mb-7">
            <div className="bg-bgray-300 py-2.5 px-4 flex justify-between">
              <h6 className="mb-0 font-normal">Price Details</h6>
            </div>
            <div className="overflow-x-auto bg-white border py-1">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-1 font-medium text-gray-900">
                      Total
                    </td>
                    <td className="px-4 py-1 text-right font-medium">
                      {totalAmount}৳
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyOrderTracking;
