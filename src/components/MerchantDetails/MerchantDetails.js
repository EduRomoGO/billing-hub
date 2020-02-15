import React from 'react';

const MerchantDetails = ({ details }) => {
  return Object.keys(details).length ? <article className='c-merchant-details'>
    {console.log(details)}
    <div className='c-merchant-details__count'>{details.length}</div>
  </article> : '';
}

export default MerchantDetails;
