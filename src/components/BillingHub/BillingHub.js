import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BillingHub.css';



// http://interview.dekopay.com.s3.eu-west-2.amazonaws.com/merchants/A1201.json

const BillingHub = () => {
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    axios.get('http://interview.dekopay.com.s3.eu-west-2.amazonaws.com/merchants.json')
      .then(data => setMerchants(data.data))
      .catch(err => { throw new Error(err) });

  }, []);

  return <section className='c-billing-hub'>
    <article className='c-billing-hub__aside'>
      <nav className='c-billing-hub__nav'>
        <ul className='b-merchant-list'>
          {merchants.slice(0, 6).map(({ name, merchant_id }) => <li className='b-merchant-list__item' key={merchant_id}>{name}</li>)}
        </ul>
      </nav>
    </article>
  </section>
};

export default BillingHub;
