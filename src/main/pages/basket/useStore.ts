import create from "zustand";

type Product = {
  id: string;
  name: string;
  price: number;
  count: number;
  imageLink: string;
};
type CartStore = {
  cartItems: Product[];
  totalPrice: number;
  addToCart: (product: Product, count: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};


const useStore = create<CartStore>((set) => ({
  cartItems: [],
  totalPrice: 0,
  addToCart: (product, count) => {
    set((state) => {
      const itemInCartIndex = state.cartItems.findIndex(
        (item) => item.id === product.id
      );
      const newCartItems = [...state.cartItems];
      if (itemInCartIndex >= 0) {
        newCartItems[itemInCartIndex].count += count;
      } else {
        newCartItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          count: count,
          imageLink: product.imageLink,
        });
      }
      const newTotalPrice = state.totalPrice + product.price * count;
      console.log(`added ${product.id}`);
      return { cartItems: newCartItems, totalPrice: newTotalPrice };
    });
  },
  removeFromCart: (id) => {
    set((state) => {
      const itemInCartIndex = state.cartItems.findIndex(
        (item) => item.id === id
      );
      if (itemInCartIndex >= 0) {
        const itemToRemove = state.cartItems[itemInCartIndex];
        const newCartItems = [
          ...state.cartItems.slice(0, itemInCartIndex),
          ...state.cartItems.slice(itemInCartIndex + 1),
        ];
        const newTotalPrice =
          state.totalPrice - itemToRemove.price * itemToRemove.count;
        console.log(`removed ${itemToRemove.id}`);
        return { cartItems: newCartItems, totalPrice: newTotalPrice };
      } else {
        console.log(`item ${id} not in cart`);
        return state;
      }
    });
  },
  clearCart: () => {
    
    set(() => (
        {
      cartItems: [],
      totalPrice: 0,
    }));
  },
}));

export default useStore;
