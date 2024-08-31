import { useState } from "react";

import ShopItemButtons from "../buttons/ShopItemButtons.jsx";

import { getFinalPrice } from "../../utilities/discounts.jsx";

import { bucketURL } from "../../services/util.js";

function CartItem({ data, cart, setCart }) {

  const [animationClass, setAnimationClass] = useState('');

  return (
    <div
      className={`${animationClass} px-2 py-4 w-full flex items-center justify-evenly shadow-md`}
    >
      <img
        src={bucketURL + data.Images[0].url}
        alt=""
        className='shadow-lg object-cover w-[50px] h-[50px] rounded-[50%]'
      />
      <div className="flex flex-col">
        <p className='line-clamp-1 ml-[9px]'>
          {data.name}
        </p>
        <div className="scale-90">
          <ShopItemButtons
            setCartItemAnimation={setAnimationClass}
            product={data}
            cart={cart}
            setCart={setCart}
            isOnCart={true}
          />
        </div>
      </div>
      <div className="flex flex-col">
        {data.unitPrice.toFixed(2) != getFinalPrice(data).finalPrice &&
          <p className="line-through opacity-60 text-md">
            {'$ ' + (data.unitPrice * data.quantity).toFixed(2)}
          </p>
        }
        <p className="font-semibold text-lg">
          {'$ ' + (getFinalPrice(data).finalPrice * data.quantity).toFixed(2)}
        </p>
      </div>
    </div>

  );
};

export default CartItem;