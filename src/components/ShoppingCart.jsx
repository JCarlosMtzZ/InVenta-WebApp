import { useState, useEffect } from "react";

import FormSubmitButton from "./buttons/FormSubmitButton.jsx";
import CommonButton from "./buttons/CommonButton.jsx";
import CloseButton from "./buttons/CloseButton.jsx";
import CartItem from "./cards/CartItem.jsx";

import { getSubtotal, getTotal } from "../utilities/discounts.jsx";

function ShoppingCart({
  animationClass,
  cart,
  setCart,
  handleClose,
  handleSubmit,
  isWaitingResponse }) {

  const [cartListAnimation, setCartListAnimation] = useState('');

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setSubtotal(getSubtotal(cart));
    setTotal(getTotal(cart));
  }, [cart]);

  const handleEmptyCart = () => {
    setCartListAnimation('animate-fadeOutRight');
    setTimeout(() => {
      setCart([]);
    }, 180);
  };

  return (
    <div className={`${animationClass} absolute z-20 w-full h-full bg-black/70`}>
      <div className="bg-white flex flex-col sm:rounded-lg h-full w-full sm:w-[500px]">
        <div className="px-4 py-4 flex justify-between items-center shadow-lg">
          <div className="flex flex-col">
            <p className="text-sm">
              {cart.length + (cart.length != 1 ? ' productos agregados' : ' producto agregado')}
            </p>
            <p className="text-xl font-semibold">
              {cart.length > 0 ? 'Carrito de venta' : 'Carrito vacío'}
            </p>
          </div>
          <CloseButton
            onClick={handleClose}
          />
        </div>
        <div className={`${cartListAnimation} flex flex-col w-full overflow-y-auto overflow-x-hidden flex-grow`}>
          {cart.length > 0 &&
            cart.map((cartItem) => (
              <CartItem
                key={cartItem.id}
                data={cartItem}
                cart={cart}
                setCart={setCart}
              />
            ))
          }
        </div>
        <div className="bg-purp-dark/5 p-4 flex flex-col w-full gap-2">
          <div className="opacity-60 text-xl flex items-center justify-between">
            <p>Subtotal</p>
            <p className="font-semibold">{`$ ${subtotal}`}</p>
          </div>
          <div className="text-2xl flex items-center justify-between">
            <p>Total</p>
            <p className="font-semibold">{`$ ${total}`}</p>
          </div>
          <div className="mt-1 flex gap-2">
            <FormSubmitButton
              isWaitingResponse={isWaitingResponse}
              handleSubmit={handleSubmit}
              text='Confirmar venta'
              width='w-[150px]'
            />
            <CommonButton
              onClick={handleEmptyCart}
              width='w-[150px]'
              text='Vaciar carrito'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;