"use client";
import Contain from "@/components/common/Contain";
import useGetSettingData from "@/components/lib/getSettingData";

import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const Footer = ({ menuData }) => {
  const { data: settingsData, isLoading } = useGetSettingData();

  const footerData = settingsData?.data[0];

  const exploreData = menuData?.data?.filter(
    (item) => item?.category?.explore_category_show === true
  );
  if (isLoading) {
    return null;
  }

  return (
    <div className="bg-blackVariant-oilBlack border-t-2 border-primary mt-10 md:pb-0 pb-16">
      <Contain>
        <footer>
          <div className="mx-auto  px-4 pb-6 pt-16 sm:px-6 lg:px-8 ">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div>
                <div className="flex justify-center text-primary sm:justify-start">
                  <div className="flex gap-1 items-center">
                    <img src={footerData?.logo} className="h-28" alt="" />
                  </div>
                </div>

                <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
                  {footerData?.facebook && (
                    <li>
                      <a
                        href={footerData?.facebook}
                        rel="noreferrer"
                        target="_blank"
                        className="text-primaryVariant-600 transition hover:text-primaryVariant-600/75"
                      >
                        <span className="sr-only">Facebook</span>
                        <FaFacebook className="h-6 w-6" />
                      </a>
                    </li>
                  )}
                  {footerData?.instagram && (
                    <li>
                      <a
                        href={footerData?.instagram}
                        rel="noreferrer"
                        target="_blank"
                        className="text-primaryVariant-600 transition hover:text-primaryVariant-600/75"
                      >
                        <span className="sr-only">Instagram</span>
                        <FaInstagram className="h-6 w-6" />
                      </a>
                    </li>
                  )}
                  {footerData?.twitter && (
                    <li>
                      <a
                        href={footerData?.twitter}
                        rel="noreferrer"
                        target="_blank"
                        className="text-primaryVariant-600 transition hover:text-primaryVariant-600/75"
                      >
                        <span className="sr-only">Twitter</span>
                        <FaTwitter className="h-6 w-6" />
                      </a>
                    </li>
                  )}
                  {footerData?.watsapp && (
                    <li>
                      <a
                        href={footerData?.watsapp}
                        rel="noreferrer"
                        target="_blank"
                        className="text-primaryVariant-600 transition hover:text-primaryVariant-600/75"
                      >
                        <span className="sr-only">WhatsApp</span>
                        <FaWhatsapp className="h-6 w-6" />
                      </a>
                    </li>
                  )}

                  {footerData?.you_tube && (
                    <li>
                      <a
                        href={footerData?.you_tube}
                        rel="noreferrer"
                        target="_blank"
                        className="text-primaryVariant-600 transition hover:text-primaryVariant-600/75"
                      >
                        <span className="sr-only">YouTube</span>
                        <FaYoutube className="h-6 w-6" />
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
                <div className="">
                  <p className="text-lg font-medium text-primaryVariant-100">
                    Helpful Link
                  </p>

                  <ul className="mt-8 space-y-4 text-sm">
                    <li>
                      <a
                        className="text-gray-200 transition hover:text-gray-200/75"
                        href="/about-us"
                      >
                        About Us
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-gray-200 transition hover:text-gray-200/75"
                        href="/shipping-information"
                      >
                        Shipping Information
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="">
                  <p className="text-lg font-medium text-primaryVariant-100">
                    Our Policy
                  </p>

                  <ul className="mt-8 space-y-4 text-sm">
                    <li>
                      <a
                        className="text-gray-200 transition hover:text-gray-200/75"
                        href="/privacy-policy"
                      >
                        Privacy Policy
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-gray-200 transition hover:text-gray-200/75"
                        href="/refund-policy"
                      >
                        Refund Policy
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-gray-200 transition hover:text-gray-200/75"
                        href="/cancel-policy"
                      >
                        Cancellation Policy
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-gray-200 transition hover:text-gray-200/75"
                        href="/return-policy"
                      >
                        Return Policy
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="">
                  <p className="text-lg font-medium text-primaryVariant-100">
                    Explore Category
                  </p>

                  <ul className="mt-8 space-y-4 text-sm">
                    {exploreData?.length > 0 &&
                      exploreData?.map((category) => (
                        <li key={category?._id}>
                          <a
                            className="text-gray-200 transition hover:text-gray-200/75"
                            href={`/category/${category?.category?.category_slug}`}
                          >
                            {category?.category?.category_name}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="">
                  <p className="text-lg font-medium text-primaryVariant-100">
                    Contact Us
                  </p>

                  <ul className="mt-8 space-y-4 text-sm">
                    <li>
                      <a
                        className="flex items-center justify-center gap-2 "
                        href={`mailto:${footerData?.email}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-5 shrink-0 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>

                        <span className="flex-1 text-gray-200">
                          {footerData?.email}
                        </span>
                      </a>
                    </li>

                    <li>
                      <a
                        className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                        href="#"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-5 shrink-0 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>

                        <span className="flex-1 text-gray-200">
                          {" "}
                          {footerData?.contact}
                        </span>
                      </a>
                    </li>

                    <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 shrink-0 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>

                      <address className="-mt-0.5 flex-1 not-italic text-gray-200">
                        {footerData?.address}
                      </address>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-gray-300 pt-6">
              <div className="text-center sm:flex sm:justify-between sm:text-left">
                <p className="text-sm text-gray-500">
                  <span className="block sm:inline">All rights reserved.</span>

                  <a
                    className="font-bold inline-block text-primaryVariant-100 underline transition hover:text-primary/75 ml-2"
                    href="/terms-condition"
                  >
                    Terms & Conditions
                  </a>
                </p>

                <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
                  &copy; 2025 Classic IT & Sky Mart Ltd
                </p>
              </div>
            </div>
          </div>
        </footer>
      </Contain>
    </div>
  );
};

export default Footer;
