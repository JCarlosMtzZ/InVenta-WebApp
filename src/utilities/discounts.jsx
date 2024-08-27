export const getSubtotal = (items) => {
  let subtotal = 0;
  for (let item of items)
    subtotal = subtotal + (item.unitPrice * item.quantity);
  return subtotal.toFixed(2);
};

export const getTotal = (items) => {
  let total = 0;
  for (let item of items)
    total = total + (getFinalPrice(item).finalPrice * item.quantity);
  return total.toFixed(2);
};

export const getFinalPrice = (item) => {
  const unitPrice = item.unitPrice;
  const hasDiscount = item.Discounts.length > 0;
  let isPercentage;
  let discount;
  let finalPrice;

  if (hasDiscount) {
    discount = item.Discounts[0];
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
  return {
    hasDiscount: hasDiscount,
    isPercentage: isPercentage,
    discount: discount,
    unitPrice: unitPrice,
    finalPrice: finalPrice
  };
};

export const getDiscountValue = (discount) => {
  let isPercentage;
  if ((discount.percentage && discount.amount) || (discount.percentage && !discount.amount))
    isPercentage = true;
  else
    isPercentage = false;
  if (isPercentage)
    return discount.percentage * 100 + '%';
  else
    return '$' + discount.amount;
};

export const formatDatetime = (datetime) => {
  return datetime.toLocaleString(
    'es-ES',
    {
      day: '2-digit',
      month: 'short',
      year: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
  );
};

export const isoToDateTimeLocal = (isoString) => {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}