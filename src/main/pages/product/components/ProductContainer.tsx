import styled from "styled-components";
import React, { useContext, useRef, useState } from "react";
import useProducts from "../../../../api/product/useProducts";
import { useLocation } from "react-router-dom";
import userStore from "../../basket/useStore";
import useStore from "../../basket/useStore";

const ProductTableContainer = styled.table`
  margin-top: 100px;
  border-collapse: collapse;
  width: 90%;
  margin-left: 4%;
`;

const ProductTableHeaderCell = styled.th`
  background-color: #393e46;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  color: #ffffff;
  font-weight: bold;
  padding: 8px;
`;

const ProductImage = styled.img`
  width: 35px;
  height: 30px;
`;
const ProductCountInput = styled.input`
  width: 60px;
`;

const ProductTableRow = styled.tr`
  background-color: #878787;
`;

const ProductTableCell = styled.td`
  border: 1px solid #cccccc;
  padding: 8px;
  text-align: center;
`;

const ProductButton = styled.button`
  cursor: pointer;
  text-align: center;
  background-color: white;
  color: black;
  margin-top: 2%;
  width: 60%;
  height: 60%;
  margin-left: 20%;
`;

const ProductContainer = () => {

  const location = useLocation();

  const categoryName = decodeURI(location.pathname).substring(1);
  console.log({categoryName});
  
  const { data } = useProducts(categoryName);
  console.log(data);
  const [counts, setCounts] = useState(data ? Array(data.length).fill(0) : []);
  const { addToCart } = useStore();
  if (!data) {
    return null;
  }

  return (
    <ProductTableContainer>
      <thead>
        <tr>
          <ProductTableHeaderCell>Название</ProductTableHeaderCell>
          <ProductTableHeaderCell>Фото</ProductTableHeaderCell>
          <ProductTableHeaderCell>Цена</ProductTableHeaderCell>
          <ProductTableHeaderCell>Количество</ProductTableHeaderCell>
          <ProductTableHeaderCell>Купить</ProductTableHeaderCell>
        </tr>
      </thead>

      <tbody>
        {data.map((product, index) => {
          const handleCountChange = (event) => {
            const value = event.target.valueAsNumber;
            setCounts((prevCounts) => {
              const newCounts = [...prevCounts];
              newCounts[index] = value;
              return newCounts;
            });
          };

          const handleButtonClick = () => {
            console.log("Количество добавленных продуктов: ", counts[index]);
            if(counts[index] > product.count){
              alert(`Превышение колисетва товаров можно купить не больше ${product.count}`)
              return;
            }
            if(product.count == 0){
              alert("Извините товар закончился")
              return;
            }
            addToCart(
              {
                id: product.id,
                name: product.name,
                price: product.price,
                imageLink: product.imageLink,
                count: 0
              },
              counts[index]
            );

            setCounts((prevCounts) => {
              const newCounts = [...prevCounts];
              newCounts[index] = 0;
              return newCounts;
            });
          };

          return (
            <ProductTableRow key={product.id}>
              <ProductTableCell>{product.name}</ProductTableCell>
              <ProductTableCell>
                <ProductImage src={product.imageLink} alt={product.name} />
              </ProductTableCell>
              <ProductTableCell>{product.price}</ProductTableCell>
              <ProductTableCell>
                <ProductCountInput
                  type="number"
                  min={0}
                  max={product.count}
                  value={counts[index]}
                  onChange={handleCountChange}
                />
              </ProductTableCell>
              <ProductTableCell>
                <ProductButton onClick={handleButtonClick}>
                  Добавить в корзину
                </ProductButton>
              </ProductTableCell>
            </ProductTableRow>
          );
        })}
      </tbody>
    </ProductTableContainer>
  );
};

export default ProductContainer;
