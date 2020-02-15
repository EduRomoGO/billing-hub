import { getSubsidy } from './subsidy.js';

describe('getSubsidy', () => {
  it('returns the subsidy for the array of prices given taking into account the pricing scheme', () => {
    let prices;
    let pricing;

    prices = [200, 400, 300, 700];
    pricing = {
      "subsidy": 10,
      "discount_subsidy": 5,
      "discount_cutoff": 400,
    };

    expect(getSubsidy({pricing, prices})).toBe(20 + 20 + 30 + 35);

    prices = [100, 300, 600, 240];
    pricing = {
      "subsidy": 6,
      "discount_subsidy": 4,
      "discount_cutoff": 180,
    };

    expect(getSubsidy({pricing, prices})).toBe(6 + 12 + 24 + 9.6);
  });
});
