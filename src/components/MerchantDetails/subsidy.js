
const getSubsidyAmountForPrice = (price, pricing) => {
  return (price < pricing.discount_cutoff) ? pricing.subsidy : pricing.discount_subsidy;
};

const calculateSubsidy = ({ prices, pricing }) => prices.reduce(
  (acc, nextPrice) => {
    return acc + nextPrice * (getSubsidyAmountForPrice(nextPrice, pricing) / 100);
  },
  0,
);

const arrify = data => Array.isArray(data) ? data : [data];

export const getSubsidy = ({ pricing, prices }) => {
  return calculateSubsidy({pricing, prices: arrify(prices)});
};
