import React from 'react';
import './MerchantDetails.css';

const getTotal = ({ transactions }) => transactions.reduce((acc, next) => acc + next.price, 0);
const getSubsidyAmountForPrice = (price, pricing) => {
  return (price < pricing.discount_cutoff) ? pricing.subsidy : pricing.discount_subsidy;
};
const getSubsidy = ({ transactions, pricing }) => transactions.reduce(
  (acc, next) => {
    return acc + next.price * (getSubsidyAmountForPrice(next.price, pricing) / 100);
  },
  0,
);

const renderTableHeader = transactions => {
  return <thead>
    <tr>
      {Object.keys(transactions[0]).map(category => <th key={category}>{category}</th>)}
      <th>Subsidy</th>
    </tr>
  </thead>;
};

const renderTableRow = (item, id) => {
  return <tr key={id}>
    {Object.keys(item).map(category => <td key={category}>{item[category]}</td>)}
  </tr>;
};

const renderTableBody = transactions => {
  return <tbody>
    {transactions.map((item, id) => renderTableRow(item, id))}
  </tbody>
}

const renderTable = transactions => {
  return <table>
    {renderTableHeader(transactions)}
    {renderTableBody(transactions)}
  </table>;
}


const MerchantDetails = ({ name, transactions, pricing }) => {
  return <article className='c-merchant-details'>
    <div className='c-merchant-details__name'>{name}</div>
    <div className='c-merchant-details__total'>{transactions ? getTotal({ transactions }) : ''}</div>
    <div className='c-merchant-details__subsidy'>{transactions ? getSubsidy({ transactions, pricing }) : ''}</div>
    <div className='c-merchant-details__count'>{transactions ? transactions.length : ''}</div>
    {transactions ? renderTable(transactions) : ''}
  </article>;
}

export default MerchantDetails;
