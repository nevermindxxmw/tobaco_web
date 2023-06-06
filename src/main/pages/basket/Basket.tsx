import React, { useState } from "react";
import useStore from "./useStore";
import styled from "styled-components";
import TopBar from "../home/topbar/TopBar";
import Modal from "./Modal";
import useProductPurchase from "../../../api/product/useProducrPurchase";

const CartContainer = styled.div`
  margin-top: 100px;
  margin-left: 4%;
`;

const CartTableContainer = styled.table`
  border-collapse: collapse;
  width: 90%;
`;

const ProductImage = styled.img`
  width: 35px;
  height: 30px;
`;

const CartTableHeaderCell = styled.th`
  background-color: #393e46;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  color: #ffffff;
  font-weight: bold;
  padding: 8px;
`;

const CartTableRow = styled.tr`
  background-color: #878787;
`;

const CartTableCell = styled.td`
  border: 1px solid #cccccc;
  padding: 8px;
  text-align: center;
`;

const CartButton = styled.button`
  cursor: pointer;
  text-align: center;
  background-color: white;
  color: black;
  margin-top: 2%;
  width: 80%;
  height: 60%;
  margin-left: 5%;
`;

const CartTotalRow = styled.tr`
  background-color: #393e46;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  color: #ffffff;
  font-weight: bold;
  text-align: center;
`;

type Props = {
  onClick: () => void;
};

interface ProductPurchase {
  id: string;
  count: number;
}
type CartItem = {
  id: string;
  name: string;
  price: number;
  count: number;
  imageLink: string;
};

const RemoveFromCartButton: React.FC<Props> = ({ onClick }) => {
  return <CartButton onClick={onClick}>Убрать</CartButton>;
};

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const total = cartItems.reduce(
    (acc, curr) => acc + curr.count * curr.price,
    0
  );

  const { mutate } = useProductPurchase();

  const handleOpenModal = () => {
    const productPurchases: ProductPurchase[] = cartItems.map(
      (item: CartItem): ProductPurchase => ({
        id: item.id.toString(),
        count: item.count,
      })
    );
    console.log(cartItems);
    mutate(productPurchases);
    setIsModalOpen(true);
    clearCart();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <TopBar />
      <CartContainer>
        <CartTableContainer>
          <thead>
            <tr>
              <CartTableHeaderCell>Название</CartTableHeaderCell>
              <CartTableHeaderCell>Фото</CartTableHeaderCell>
              <CartTableHeaderCell>Цена</CartTableHeaderCell>
              <CartTableHeaderCell>Количество</CartTableHeaderCell>
              <CartTableHeaderCell>Общая сумма</CartTableHeaderCell>
              <CartTableHeaderCell></CartTableHeaderCell>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item) => (
              <CartTableRow key={item.id}>
                <CartTableCell>{item.name}</CartTableCell>
                <CartTableCell>
                  <ProductImage src={item.imageLink} alt={item.name} />
                </CartTableCell>
                <CartTableCell>{item.price}</CartTableCell>
                <CartTableCell>{item.count}</CartTableCell>
                <CartTableCell>{item.count * item.price}</CartTableCell>
                <CartTableCell>
                  <RemoveFromCartButton
                    onClick={() => removeFromCart(item.id)}
                  />
                </CartTableCell>
              </CartTableRow>
            ))}
            <CartTotalRow>
              <CartTableCell colSpan={4}>Общая сумма:</CartTableCell>
              <CartTableCell>{total}</CartTableCell>
              <CartTableCell>
                <CartButton onClick={handleOpenModal}>
                  Оформить заказ
                </CartButton>
              </CartTableCell>
            </CartTotalRow>
          </tbody>
        </CartTableContainer>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      </CartContainer>
    </>
  );
};

export default Cart;
