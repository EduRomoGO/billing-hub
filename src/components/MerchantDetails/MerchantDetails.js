import React from 'react';
import './MerchantDetails.css';
import { getSubsidy } from './subsidy.js';

const getTotal = ({ transactions }) => transactions.reduce((acc, next) => acc + next.price, 0);

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
    <div className='c-merchant-details__subsidy'>{transactions ? getSubsidy({ prices: transactions.map(item => item.price), pricing }) : ''}</div>
    <div className='c-merchant-details__count'>{transactions ? transactions.length : ''}</div>
    {transactions ? renderTable(transactions) : ''}
  </article>;
}

export default MerchantDetails;
