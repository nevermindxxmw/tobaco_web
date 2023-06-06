import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { loginUser } from "../userApi";

type Params = { phone: string; password: string };

const useUserAuth = (): UseMutationResult<void, AxiosError, Params> => {
  return useMutation((data: Params) => loginUser(data.phone, data.password), {
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default useUserAuth;