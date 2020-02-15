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
    <article className='b-merchant-list'>
      {merchants.map(({name, merchant_id}) => <li key={merchant_id}>{name}</li>)}
    </article>
  </section>
};

export default BillingHub;
