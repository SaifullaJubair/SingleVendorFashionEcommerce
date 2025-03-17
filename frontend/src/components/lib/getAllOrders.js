"use client";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../utils/baseURL";

const useGetAllOrders = ({ customer_id, page, limit, searchTerm }) => {
  return useQuery({
    queryKey: [
      `/api/v1/order?customer_id=${customer_id}&page=${page}&limit=${limit}&search=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/order?customer_id=${customer_id}&page=${page}&limit=${limit}&search=${searchTerm}`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(
          `Error: ${res.status} ${res.statusText} - ${errorData}`
        );
      }

      const data = await res.json();
      return data;
    },
  });
};

export default useGetAllOrders;
