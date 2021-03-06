import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BillingHub.css';
import MerchantDetails from '../MerchantDetails/MerchantDetails.js';

const BillingHub = () => {
  const [merchants, setMerchants] = useState([]);
  const [merchantDetails, setMerchantDetails] = useState({});
  const [merchantSelected, setMerchantSelected] = useState(undefined);

  useEffect(() => {
    axios.get('http://interview.dekopay.com.s3.eu-west-2.amazonaws.com/merchants.json')
      .then(({ data }) => {
        setMerchants(data);
        return data;
      })
      .then(data => {
        requestMerchantDetail(data[0].merchant_id);
        setMerchantSelected(data[0].merchant_id);
      })
      .catch(err => { throw new Error(err) });

  }, []);

  const requestMerchantDetail = merchant_id => {
    axios.get(`http://interview.dekopay.com.s3.eu-west-2.amazonaws.com/merchants/${merchant_id}.json`)
    .then(({ data }) => {
      setMerchantDetails(data);
    })
    .catch(err => { throw new Error(err) });
  };

  const handleMerchantClick = (merchant_id, e) => {
    requestMerchantDetail(merchant_id);
    setMerchantSelected(merchant_id);
  }

  const renderMerchantList = merchants => {
    const getClassName = (merchant_id, merchantSelected) => {
      return `b-merchant-list__item ${(merchantSelected === merchant_id) ? 'selected' : ''}`;
    }

    return merchants.map(({ name, merchant_id }) => <li className={getClassName(merchant_id, merchantSelected)} onClick={e => handleMerchantClick(merchant_id, e)} key={merchant_id}>{name}</li>);
  }

  return <section className='c-billing-hub'>
    <article className='c-billing-hub__aside'>
      <section className='b-merchants'>
        <header>
          <h1 className='b-merchants__title h1'>Merchants</h1>
        </header>
        <nav className='c-billing-hub__nav'>
          <ul className='b-merchant-list'>
            {renderMerchantList(merchants)}
          </ul>
        </nav>
      </section>
    </article>
    <section className='c-billing-hub__main'>
      <MerchantDetails transactions={merchantDetails.transactions} name={merchantDetails.name} pricing={merchantDetails.pricing} />
    </section>
  </section>
};

export default BillingHub;
