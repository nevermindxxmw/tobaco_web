import { useQuery, useQueryClient } from "react-query";

import { getUser } from "../userApi";

import userKey from "./keys";

const useProductCategories = () => {

  return useQuery([userKey.user], () => getUser());
};

export default useProductCategories;
