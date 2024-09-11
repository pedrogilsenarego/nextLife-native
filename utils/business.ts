export const getStatusColor = (balance: number): string => {
  switch (true) {
    case balance < -1000:
      return "red";
    case balance >= -1000 && balance < 0:
      return "orange";
    case balance >= 0 && balance <= 1000:
      return "yellow";
    case balance > 1000:
      return "green";
    default:
      return "unknown"; // Optional default case if balance doesn't fall into any specified range
  }
};
