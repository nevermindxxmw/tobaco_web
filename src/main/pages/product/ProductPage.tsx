import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ProductContainer from "./components/ProductContainer";
import TopBar from "../home/topbar/TopBar";

const ProductPage = () => {
  
  return (
    <>
      <TopBar />
      <ProductContainer/>
    </>
  );
};

export default ProductPage;
