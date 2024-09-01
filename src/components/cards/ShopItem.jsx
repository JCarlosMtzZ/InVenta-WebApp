import { useNavigate } from "react-router-dom";

import PriceDisplay from "../PriceDisplay.jsx";
import ShopItemButtons from "../buttons/ShopItemButtons.jsx";

import { bucketURL } from "../../services/util.js";

function ShopItem({ buttonsAnimation, product, showButtons, cart, setCart }) {

  const navigate = useNavigate();
  
  const handleOnClick = (id) => {
    navigate(`/inventory/product/${id}`)
  };

  return (
    <div className={`${product.stock <= 0 && 'opacity-75'} w-[200px] flex flex-col`}>
      <div onClick={() => handleOnClick(product.id)} disabled className="hover:cursor-pointer group w-full h-[300px] flex flex-col justify-evenly rounded-xl shadow-md scale-95 hover:scale-100 transition">
        <div className="flex w-full items-center justify-center">
          <img
            src={bucketURL + product.Images[0].url}
            alt=""
            className="w-full object-cover rounded-t-xl" />
        </div>
        <div className="px-4">
          <PriceDisplay product={product} />
        </div>
        <div className="mb-1 group-hover:text-mag group-hover:font-semibold px-4 text-lg line-clamp-1">
          {product.name}
        </div>
        <div
          className="px-4 text-sm mb-3 opacity-80"
        >
          {`${product.stock + (product.stock === 1 ? ' disponible' : ' disponibles')}`}
        </div>
      </div>
      {showButtons && product.stock > 0 &&
        <div className="scale-95 mt-1">
          <ShopItemButtons
            animationClass={buttonsAnimation}
            product={product}
            cart={cart}
            setCart={setCart}
            isOnCart={false}
          />
        </div>
      }
    </div>
  );
};

export default ShopItem;