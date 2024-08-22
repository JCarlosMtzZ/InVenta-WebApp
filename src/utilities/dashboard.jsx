import { Sector } from "recharts";

export const formatDatesToYearMonth = (items, yearFormat, monthFormat) => {
  return items.map(item => {
    const date = new Date(item.month);
    const formattedDate = date.toLocaleString(
      'es-ES', 
      { 
          year: yearFormat, // 'numeric'
          month: monthFormat // 'short'
      }
    );
    return {
      ...item,
      month: formattedDate
    };
  });
};

export const formatDateToYearMonthDay = (date) => {
  date.setDate(date.getDate() + 1);
  return date.toLocaleString(
    'es-ES', 
    { 
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
  );
};

export const roundToK = (number) => {
  if (Math.floor(number / 1000) >= 1)
    return Math.floor(number / 1000);
  return number;
};

export const getRandomHexColor = () => {
  const r = Math.floor(Math.random() * 128) + 96;
  const g = Math.floor(Math.random() * 128) + 96;
  const b = Math.floor(Math.random() * 128) + 96;
  return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
};
