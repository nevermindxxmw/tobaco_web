import { useQuery, useQueryClient } from "react-query";

import { getCategories } from "../userApi";

import productKey from "./keys";

const useProductCategories = () => {
  const queryClient = useQueryClient();

  return useQuery([productKey.product], () => getCategories());
};

export default useProductCategories;
