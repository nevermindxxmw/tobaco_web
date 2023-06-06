import { registerUser } from "../userApi";
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import userRegistrationKeys from "./keys";
import { AxiosError } from "../../../node_modules/axios/index";

type Params = {
  firstName: string;
  surName: string;
  lastName: string;
  phone: string;
  password: string;
}

const useUserAuth = (): UseMutationResult<void,AxiosError,Params> =>{

  return useMutation((data: Params) => registerUser(data),{
    onSuccess: (data) => {
      console.log(data);
    }
  })
}
export default useUserAuth;
