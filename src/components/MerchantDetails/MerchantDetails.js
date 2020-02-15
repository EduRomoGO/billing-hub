import React from 'react';

const MerchantDetails = ({ name, transactions, pricing }) => {
  return <article className='c-merchant-details'>
    <div className='c-merchant-details__name'>{name}</div>
    <div className='c-merchant-details__count'>{transactions ? transactions.length : ''}</div>
  </article>;
}

export default MerchantDetails;
