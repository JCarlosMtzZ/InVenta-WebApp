 

 function PriceDisplay({ product }) {

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
  finalPrice = finalPrice.toFixed(2);

  return (
    <div className="px-0 py-4 flex flex-col justify-center w-full h-[90px]">
      {hasDiscount ? (
        <div className="flex flex-col justify-between">
          <div className="text-mag text-md font-semibold flex items-center">
            {isPercentage ? discount.percentage * 100 + '%' : '$ ' + discount.amount}&nbsp;Descuento
          </div>
          <div className="line-through opacity-60 text-md">
            ${' ' + unitPrice}
          </div>
          <div className="text-xl font-semibold">
            ${' ' + finalPrice}
          </div>
        </div>
      ) : (
        <div className="text-xl font-semibold" >
          ${' ' + finalPrice}
        </div>
      )}
    </div>
  );
 };

 export default PriceDisplay;