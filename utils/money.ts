export const formatAmount = (amount: string) => {
  const numericAmount = parseFloat(amount);

  if (isNaN(numericAmount)) {
    throw new Error("Invalid amount");
  }

  if (numericAmount > 999) {
    return `${(numericAmount / 1000).toFixed(1)}k`;
  } else {
    return amount;
  }
};
