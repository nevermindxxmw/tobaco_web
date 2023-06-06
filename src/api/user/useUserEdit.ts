import { useMutation, UseMutationResult } from "react-query";
import { AxiosError } from "axios";
import { editUser } from "../userApi";

type Params = {
  phone: string;
  password: string;
  firstName: string;
  surName: string;
  lastName:string;
};

const useUserEdit = (): UseMutationResult<string, AxiosError, Params> => {
  return useMutation((data: Params) => editUser(data), {
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export default useUserEdit;
