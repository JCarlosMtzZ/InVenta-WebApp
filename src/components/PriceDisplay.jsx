 import { getFinalPrice } from "../utilities/discounts";

 function PriceDisplay({ product }) {

  const productResult = getFinalPrice(product);

  return (
    <div className="px-0 py-4 flex flex-col justify-center w-full h-[90px]">
      {productResult.hasDiscount ? (
        <div className="flex flex-col justify-between">
          <div className="text-mag text-md font-semibold flex items-center">
            {productResult.isPercentage ? productResult.discount.percentage * 100 + '%' : '$ ' + productResult.discount.amount}&nbsp;Descuento
          </div>
          <div className="line-through opacity-60 text-md">
            ${' ' + productResult.unitPrice}
          </div>
          <div className="text-xl font-semibold">
            ${' ' + productResult.finalPrice}
          </div>
        </div>
      ) : (
        <div className="text-xl font-semibold" >
          ${' ' + productResult.finalPrice}
        </div>
      )}
    </div>
  );
 };

 export default PriceDisplay;