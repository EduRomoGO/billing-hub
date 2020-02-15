import React from 'react';

const getTotal = ({transactions}) => transactions.reduce((acc, next) => acc + next.price, 0);
const getSubsidyAmountForPrice = (price, pricing) => {
  return (price < pricing.discount_cutoff) ? pricing.subsidy : pricing.discount_subsidy;
};
const getSubsidy = ({transactions, pricing}) => transactions.reduce(
  (acc, next) => {
    return acc + next.price * (getSubsidyAmountForPrice(next.price, pricing) / 100);
  },
  0,
);

const MerchantDetails = ({ name, transactions, pricing }) => {

  return <article className='c-merchant-details'>
    <div className='c-merchant-details__name'>{name}</div>
    <div className='c-merchant-details__total'>{transactions ? getTotal({transactions}) : ''}</div>
    <div className='c-merchant-details__subsidy'>{transactions ? getSubsidy({transactions, pricing}) : ''}</div>
    <div className='c-merchant-details__count'>{transactions ? transactions.length : ''}</div>
  </article>;
}

export default MerchantDetails;
