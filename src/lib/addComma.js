export const addComma = (total) => {
  return total ? total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : total;
};
