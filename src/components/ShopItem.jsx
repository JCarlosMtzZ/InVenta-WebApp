import { CiShoppingCart } from "react-icons/ci";

function ShopItem({ product }) {

  const unitPrice = product.unitPrice;
  const hasDiscount = product.Discounts.length > 0;
  let isPercentage;
  let discount;
  let finalPrice;

  if (hasDiscount) {
    discount = product.Discounts[0];
    if ((discount.amount && discount.percentage) || discount.percentage) {
      isPercentage = true;
      finalPrice = unitPrice * (1 - discount.percentage);
    } else {
      isPercentage = false;
      finalPrice = unitPrice - discount.amount;
    }
  } else {
    finalPrice = unitPrice;
  }



  return (
    <div className="w-[200px] h-[250px] flex flex-col rounded-xl shadow-md scale-95 hover:scale-100 transition">
      <div className="flex w-full items-center justify-center">
        <CiShoppingCart size='8rem' />
      </div>
      <div className="p-4 flex flex-col justify-center w-full h-[60px]">
        {hasDiscount ? (
          <div className="flex flex-col">
            <div className="line-through opacity-60 text-md">
              ${' ' + unitPrice}
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-2xl font-semibold">
                ${' ' + finalPrice}
              </div>
              <div className="text-mag text-md font-semibold p-1 flex justify-center items-center">
                {isPercentage ? discount.percentage * 100 + '%' : '$ ' + discount.amount}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-2xl font-semibold" >
            ${' ' + finalPrice}
          </div>
        )}
      </div>
      <div className="px-4 py-2 text-lg line-clamp-1">
        {product.name}
      </div>
    </div>
  );
};

export default ShopItem;