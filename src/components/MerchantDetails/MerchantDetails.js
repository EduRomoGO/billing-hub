import React from 'react';

const MerchantDetails = ({details}) => {
  return Object.keys(details).length ? <article className='c-merchant-details'>
    {console.log(details)}
  </article> : '';
}

export default MerchantDetails;
