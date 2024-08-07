import { useState } from "react";
import PriceDisplay from "./PriceDisplay.jsx";
import ShopItemButtons from "./ShopItemButtons.jsx";

function ShopItem({ product, onClick, showButtons, cart, setCart }) {

  const uri = "https://axi88wcqsfqf.objectstorage.mx-queretaro-1.oci.customer-oci.com/n/axi88wcqsfqf/b/bucket-catalog-web-app/o/";

  const handleOnClick = () => {
    onClick(product.id);
  }

  return (
    <div className="w-[200px] flex flex-col">
      <div onClick={handleOnClick} className="hover:cursor-pointer group w-full h-[270px] flex flex-col justify-evenly rounded-xl shadow-md scale-95 hover:scale-100 transition">
        <div className="flex w-full items-center justify-center">
          <img
            src={uri + product.Images[0].url}
            alt=""
            className="object-cover rounded-t-xl" />
        </div>
        <PriceDisplay product={product} />
        <div className="mb-3 group-hover:text-mag group-hover:font-semibold px-4 text-lg line-clamp-1">
          {product.name}
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