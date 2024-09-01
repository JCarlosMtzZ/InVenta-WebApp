import { useState } from "react";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { RiDeleteBin2Line } from "react-icons/ri";

function ShopItemButtons({ setCartItemAnimation, animationClass, product, cart, setCart, isOnCart }) {

  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (isOnCart) {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity < product.stock ? item.quantity + 1 : item.quantity}
          : item
      );
      setCart(updatedCart);
    } else {
      setQuantity(quantity < product.stock ? quantity + 1 : quantity);
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
      if (quantity > 1)
        setQuantity(quantity - 1);
    }
  };

  const handleDeleteFromCart = () => {
    const updatedCart = cart.filter(item => item.id !== product.id);
    setCartItemAnimation('animate-fadeOutRight');
    setTimeout(() => {
      setCart(updatedCart);
      setCartItemAnimation('');
    }, 180);
  };

  const handleAddToCart = () => {
    const obj = cart.find(obj => obj.id === product.id);
    if (obj) {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity < product.stock ? item.quantity + quantity : product.stock }
          : item
      );
      setCart(updatedCart);
    }
    else {
      const newProduct = { ...product, quantity: quantity };
      setCart([
        ...cart,
        newProduct
      ]);
    }
  };

  return (
    <div className={`${animationClass} flex justify-center w-full h-[40px] gap-1`}>
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