import { Link } from "react-router-dom";
import Pagination from "../common/pagination/Pagination";

import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { BASE_URL } from "../../utils/baseURL";
import { toast } from "react-toastify";

const OrderTable = ({
  ordersData,
  limit,
  page,
  setPage,
  setLimit,
  isLoading,
  totalData,
  user,
  loading,
  refetch,
}) => {
  const [serialNumber, setSerialNumber] = useState();

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  //   handle order status
  const handleOrderStatus = async (order_status, _id, order_products) => {
    try {
      const sendData = {
        _id: _id,
        order_status: order_status,
        order_updated_by: user?._id,
      };
      if (order_status === "processing") {
        const today =
          new Date().toISOString().split("T")[0] +
          " " +
          new Date().toLocaleTimeString();
        sendData.processing_time = today;
      }
      if (order_status === "shipped") {
        const today =
          new Date().toISOString().split("T")[0] +
          " " +
          new Date().toLocaleTimeString();
        sendData.shipped_time = today;
      }
      if (order_status === "delivered") {
        const today =
          new Date().toISOString().split("T")[0] +
          " " +
          new Date().toLocaleTimeString();
        sendData.delivered_time = today;
      }
      if (order_status === "cancel") {
        const today =
          new Date().toISOString().split("T")[0] +
          " " +
          new Date().toLocaleTimeString();
        sendData.cancel_time = today;
        sendData.order_products = order_products;
      }
      if (order_status === "return") {
        const today =
          new Date().toISOString().split("T")[0] +
          " " +
          new Date().toLocaleTimeString();
        sendData.return_time = today;
      }
      const response = await fetch(`${BASE_URL}/order`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message ? result?.message : "Status Update successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
        refetch();
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 1000,
      });
      refetch();
    } finally {
      refetch();
    }
  };

  if (loading) {
    return <TableLoadingSkeleton />;
  }

  return (
    <>
      {isLoading || loading ? (
        <TableLoadingSkeleton />
      ) : (
        <div className="">
          {/* Make the table wrapper horizontally scrollable */}
          <div className="mt-5 overflow-x-auto rounded ">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border rounded">
              <thead className="bg-[#fff9ee]">
                <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                  <td className="whitespace-nowrap p-4 ">SL No</td>

                  <td className="whitespace-nowrap p-4 ">Invoice No</td>
                  <td className="whitespace-nowrap p-4 ">Customer Name</td>
                  <td className="whitespace-nowrap p-4 ">Customer Phone</td>
                  {user?.role_id?.order_update === true && (
                    <td className="whitespace-nowrap p-4 ">Order Status</td>
                  )}

                  <td className="whitespace-nowrap p-4 ">Total Amount</td>
                  <td className="whitespace-nowrap p-4 ">Discount Amount</td>
                  <td className="whitespace-nowrap p-4 ">Shipping Cost</td>
                  <td className="whitespace-nowrap p-4 ">Grand Total Amount</td>
                  <td className="whitespace-nowrap p-4 ">Shipping Location</td>
                  <td className="whitespace-nowrap p-4 ">State</td>
                  <td className="whitespace-nowrap p-4 ">City</td>
                  <td className="whitespace-nowrap p-4 ">Address</td>
                  <td className="whitespace-nowrap p-4 ">View Details</td>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-center">
                {ordersData?.map((order, index) => (
                  <tr
                    key={order?._id}
                    className={`divide-x divide-gray-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                    }`}
                  >
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {serialNumber + index + 1}
                    </td>

                    <td className="whitespace-nowrap p-4">
                      <Link
                        to={`/all-order-info/${order?._id}`}
                        className="underline font-medium text-blue-600"
                      >
                        {order?.invoice_id}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.customer_id?.user_name}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.customer_phone}
                    </td>
                    {/* <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.order_status}
                    </td> */}
                    {user?.role_id?.order_update === true && (
                      <td className="whitespace-nowrap p-1">
                        <select
                          onChange={(e) =>
                            handleOrderStatus(
                              e.target.value,
                              order?._id,
                              order?.order_products
                            )
                          }
                          id="order_status"
                          className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl cursor-pointer"
                        >
                          <option selected value={order?.order_status}>
                            {order?.order_status}
                          </option>
                          {order?.order_status !== "pending" &&
                            order?.order_status !== "processing" &&
                            order?.order_status !== "shipped" &&
                            order?.order_status !== "delivered" &&
                            order?.order_status !== "cancel" &&
                            order?.order_status !== "return" && (
                              <option value="pending">Pending</option>
                            )}
                          {order?.order_status == "pending" && (
                            <option value="processing">Processing</option>
                          )}
                          {order?.order_status == "processing" && (
                            <option value="shipped">Shipped</option>
                          )}
                          {order?.order_status == "shipped" && (
                            <option value="delivered">Delivered</option>
                          )}
                          {order?.order_status !== "cancel" &&
                            order?.order_status !== "return" &&
                            order?.order_status !== "delivered" && (
                              <option value="cancel">Cancel</option>
                            )}
                          {order?.order_status == "delivered" && (
                            <option value="return">Return</option>
                          )}
                        </select>
                      </td>
                    )}

                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.sub_total_amount}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.discount_amount}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.shipping_cost}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.grand_total_amount}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.shipping_location}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.billing_state}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.billing_city}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.billing_address}
                    </td>

                    <td className="whitespace-nowrap p-4 flex justify-center">
                      <Link
                        to={`/all-order-info/${order?._id}`}
                        className=" text-gray-500 hover:text-gray-900"
                      >
                        <FaRegEye size={23} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* pagination */}
          {totalData > 10 && (
            <Pagination
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              totalData={totalData}
            />
          )}
        </div>
      )}
    </>
  );
};

export default OrderTable;
