import { useQuery } from "react-query";

import { getProducts } from "../userApi";

import producstKey from "./keys";

const useProducts = (categoryName: string) => {
  return useQuery(categoryName, () => getProducts(categoryName));
};

export default useProducts;
