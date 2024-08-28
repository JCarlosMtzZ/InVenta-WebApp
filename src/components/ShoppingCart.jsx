import { useState, useEffect } from "react";

import ShopItemButtons from "./buttons/ShopItemButtons.jsx";
import FormSubmitButton from "./buttons/FormSubmitButton.jsx";
import CommonButton from "./buttons/CommonButton.jsx";
import CloseButton from "./buttons/CloseButton.jsx";

import { bucketURL } from "../services/util.js";
import { getSubtotal, getTotal, getFinalPrice } from "../utilities/discounts.jsx";

function ShoppingCart({
  cart,
  setCart,
  handleClose,
  handleSubmit,
  isWaitingResponse }) {

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setSubtotal(getSubtotal(cart));
    setTotal(getTotal(cart));
  }, [cart]);

  const handleEmptyCart = () => {
    setCart([]);
  };

  return (
    <div className="absolute z-20 w-full h-full bg-black/70">
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
        <div className="flex flex-col w-full overflow-auto flex-grow">
          {cart.length > 0 &&
            cart.map((cartItem) => (
              <div
                key={cartItem.id}
                className='px-2 py-4 w-full flex items-center justify-evenly shadow-md'
              >
                <img
                  src={bucketURL + cartItem.Images[0].url}
                  alt=""
                  className='shadow-lg object-cover w-[50px] h-[50px] rounded-[50%]'
                />
                <div className="flex flex-col">
                  <p className='line-clamp-1 ml-[9px]'>
                    {cartItem.name}
                  </p>
                  <div className="scale-90">
                    <ShopItemButtons
                      product={cartItem}
                      cart={cart}
                      setCart={setCart}
                      isOnCart={true}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  {cartItem.unitPrice.toFixed(2) != getFinalPrice(cartItem).finalPrice &&
                    <p className="line-through opacity-60 text-md">
                      {'$ ' + (cartItem.unitPrice * cartItem.quantity).toFixed(2)}
                    </p>
                  }
                  <p className="font-semibold text-lg">
                    {'$ ' + (getFinalPrice(cartItem).finalPrice * cartItem.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
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