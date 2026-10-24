export const formattedAmount = (amount) => {
  const value = Number(amount);

  if (Number.isNaN(value)) {
    return "0.00";
  }

  return value.toFixed(2);
};

export const toNumber = (n) => Number(n) || 0;
