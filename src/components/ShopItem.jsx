import { CiShoppingCart } from "react-icons/ci";
import PriceDisplay from "./PriceDisplay";

function ShopItem({ product, onClick }) {

  const handleOnClick = () => {
    onClick(product.id);
  }

  return (
    <div onClick={handleOnClick} className="hover:cursor-pointer group w-[200px] h-[270px] flex flex-col justify-evenly rounded-xl shadow-md scale-95 hover:scale-100 transition">
      <div className="flex w-full items-center justify-center">
        <CiShoppingCart size='8rem' />
      </div>
      <PriceDisplay product={product} />
      <div className="mb-3 group-hover:text-mag group-hover:font-semibold px-4 text-lg line-clamp-1">
        {product.name}
      </div>
    </div>
  );
};

export default ShopItem;