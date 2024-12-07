export const currencyDecimal = (amount: number) =>
  (Math.round(amount * 100) / 100).toFixed(2);
