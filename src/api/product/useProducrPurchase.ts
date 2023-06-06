import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { purchase } from "../userApi";

type ProductDto = {
    id: string;
    count: number;
}
const useProductPurchase = (): UseMutationResult<void, AxiosError<unknown, any>, ProductDto[]> => {
        
    return useMutation((data: ProductDto[]) => purchase(data), {
      onSuccess: (data) => {
        console.log(data);
      },
    });
  };
  
  export default useProductPurchase;