import { useState } from "react";
import PriceDisplay from "../PriceDisplay.jsx";
import ShopItemButtons from "../ShopItemButtons.jsx";

function ShopItem({ product, onClick, showButtons, cart, setCart }) {

  const uri = "https://axi88wcqsfqf.objectstorage.mx-queretaro-1.oci.customer-oci.com/n/axi88wcqsfqf/b/bucket-catalog-web-app/o/";

  const handleOnClick = () => {
    onClick(product.id);
  }

  return (
    <div className="w-[200px] flex flex-col">
      <div onClick={handleOnClick} className="hover:cursor-pointer group w-full h-[300px] flex flex-col justify-evenly rounded-xl shadow-md scale-95 hover:scale-100 transition">
        <div className="flex w-full items-center justify-center">
          <img
            src={uri + product.Images[0].url}
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
          className="px-4 text-sm mb-3 opacity-60"
        >
          {`${product.stock + (product.stock === 1 ? ' disponible' : ' disponibles')}`}
        </div>
      </div>
      {showButtons &&
        <div className="scale-95 mt-1">
          <ShopItemButtons
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