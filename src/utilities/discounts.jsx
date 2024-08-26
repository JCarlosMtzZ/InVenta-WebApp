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