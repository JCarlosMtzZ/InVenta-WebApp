import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { RiDeleteBin2Line } from "react-icons/ri";

function ShopItemButtons({ product, cart, setCart, isOnCart }) {

  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (isOnCart) {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      const currentQuantity = quantity;
      setQuantity(currentQuantity + 1);
    }
  };

  const handleRemove = () => {
    if (isOnCart) {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1}
          : item
      );
      setCart(updatedCart);
    } else {
      const currentQuantity = quantity;
      if (currentQuantity > 1)
        setQuantity(currentQuantity - 1);
    }
  };

  const handleDeleteFromCart = () => {
    const updatedCart = cart.filter(item => item.id !== product.id);
    setCart(updatedCart);
  };

  const handleAddToCart = () => {
    const currentQuantity = quantity;
    const obj = cart.find(obj => obj.id === product.id);
    if (obj) {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + currentQuantity }
          : item
      );
      setCart(updatedCart);
    }
    else {
      const newProduct = { ...product, quantity: currentQuantity };
      setCart([
        ...cart,
        newProduct
      ]);
    }
  };

  return (
    <div className="flex justify-center w-full h-[40px] gap-1">
      <button
        type="button"
        onClick={handleRemove}
        className="flex items-center justify-center rounded-lg w-[40px] border border-purp-dark hover:bg-black/5"
      >
        <FaMinus color="#605399" size='0.75rem' />
      </button>
      <p
        className="flex items-center justify-center rounded-lg w-[70px] border border-purp-dark"
      >
        {isOnCart ? product.quantity : quantity}
      </p>
      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center justify-center rounded-lg w-[40px] border border-purp-dark hover:bg-black/5"
      >
        <FaPlus color="#605399" size='0.75rem' />
      </button>
      <button
        type="button"
        onClick={isOnCart ? handleDeleteFromCart : handleAddToCart}
        className="flex items-center justify-center rounded-lg w-[40px] bg-purp-dark hover:bg-purp-dark/80 transition"
      >
        {isOnCart ? (
          <RiDeleteBin2Line size='1.4rem' color="white" />
        ) : (
          <RiShoppingCartLine size='1.25rem' color="white" />
        )}
      </button>
    </div>
  );
};

export default ShopItemButtons;