export function formatDiscount  (discount){
    if (typeof discount !== "number") return discount;

    if (discount >= 10 && discount < 100) {
      const firstDigit = Math.floor(discount / 10);
      const secondDigit = discount % 10;

      if (secondDigit === 0) {
        return `${firstDigit}`;
      } else {
        return `${firstDigit}.${secondDigit}`;
      }
    }

    return discount.toString();
  };