"use client";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../utils/baseURL";

const useGetSettingData = () => {
  return useQuery({
    queryKey: [`/api/v1/setting`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/setting`);
      const data = await res.json();
      return data;
    },
  });
};

export default useGetSettingData;
