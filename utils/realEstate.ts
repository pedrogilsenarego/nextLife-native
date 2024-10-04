export const calculateIMI = (equityValue: number): number => {
  if (equityValue <= 0 || isNaN(equityValue)) {
    throw new Error("Invalid equity value");
  }
  const value = 0.003 * equityValue;
  return Math.round(value);
};

export const calculateIMISchedule = (totalIMI: number) => {
  if (totalIMI <= 0 || isNaN(totalIMI)) {
    throw new Error("Invalid IMI value");
  }

  let payments = [];
  if (totalIMI < 100) {
    payments.push({ month: "May", value: totalIMI });
  } else if (totalIMI < 500) {
    const half = Math.round(totalIMI / 2);
    payments.push({ month: "May", value: half });
    payments.push({ month: "Nov", value: half });
  } else {
    const third = Math.round(totalIMI / 3);
    payments.push({ month: "May", value: third });
    payments.push({ month: "Aug", value: third });
    payments.push({ month: "Nov", value: third });
  }

  return payments;
};
