import axios, { AxiosResponse } from "axios";

interface UserData {
  firstName: string;
  surName: string;
  lastName: string;
  phone: string;
  password: string;
}

interface ResponseUserData{
  id: number;
  firstName: string;
  surName: string;
  lastName: string;
  bonus: number;
  phone: string;
  password: string;
  token: string;
}

interface CategoryDTO {
  id: string;
  name: string;
  title: string;
}
interface Product {
  id: string;
  name: string;
  imageLink: string;
  price: number;
  count: number;
  categoryId: string;
}
interface ProductPurchase {
  id: string;
  count: number;
}

export async function purchase(purchaseData: ProductPurchase[]): Promise<void> {
  console.log(purchaseData);
  const body = {
    products: purchaseData,
  };
  try {
    const response: AxiosResponse<ResponseUserData> = await axios.post(
      "http://0.0.0.0:3200/purchase",
      body,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.token);
  } catch (error: any) {
    console.error(error);
  }
}

export async function loginUser(
  phone: string,
  password: string
): Promise<void> {
  try {
    const body = { phone, password };
    const response: AxiosResponse<ResponseUserData> = await axios.post(
      "http://0.0.0.0:3200/login",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setAuthHeader(response.data.token);
    console.log(response.data.token);
  } catch (error: any) {
    console.error(error);
    return;
  }
}

export async function editUser(userData: UserData): Promise<string> {
  console.log(userData);
  try {
    const response: AxiosResponse<string> = await axios.post(
      "http://0.0.0.0:3200/user",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    console.log(response.data);
    setAuthHeader(response.data);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return "";
  }
}

export async function registerUser(userData: UserData): Promise<void> {
  console.log(userData);
  try {
    const response: AxiosResponse<ResponseUserData> = await axios.post(
      "http://0.0.0.0:3200/register",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setAuthHeader(response.data.token);
    console.log(response.data.token);
  } catch (error: any) {
    console.error(error);
    return;
  }
}

export async function getCategories(): Promise<CategoryDTO[]> {
  try {
    const response: AxiosResponse<CategoryDTO[]> = await axios.get<
      CategoryDTO[]
    >("http://0.0.0.0:3200/category/all", {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getUser(): Promise<ResponseUserData | undefined> {
  try {
    const response: AxiosResponse<ResponseUserData> = await axios.get<
    ResponseUserData
    >("http://0.0.0.0:3200/account", {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getProducts(categoryName: string): Promise<Product[]> {
  try {
    const response: AxiosResponse<Product[]> = await axios.get<Product[]>(
      `http://0.0.0.0:3200/product/category/${categoryName}`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

export const setAuthHeader = (token) => {
  window.localStorage.setItem("auth_token", token);
};