import React from 'react';
import './MerchantDetails.css';
import { getSubsidy } from './subsidy.js';
import { ReactComponent as PieSvg } from './Pie.svg';


const getTotal = ({ transactions }) => transactions.reduce((acc, next) => acc + next.price, 0);

const renderTableHeader = transactions => {
  return <thead>
    <tr>
      {Object.keys(transactions[0]).map(category => <th key={category}>{category}</th>)}
      <th>Subsidy</th>
    </tr>
  </thead>;
};

const renderTableRow = (item, id, pricing) => {
  return <tr key={id}>
    {Object.keys(item).map(category => <td key={category}>{item[category]}</td>)}
    <td>{getSubsidy({ prices: [item.price], pricing })}</td>
  </tr>;
};

const renderTableBody = (transactions, pricing) => {
  return <tbody>
    {transactions.map((item, id) => renderTableRow(item, id, pricing))}
  </tbody>
}

const renderTable = (transactions, pricing) => {
  return <table>
    {renderTableHeader(transactions)}
    {renderTableBody(transactions, pricing)}
  </table>;
}


const getPieSvgStyle = (total, subsidy) => {
  const radius = 29;
  const circumference = radius * 2 * Math.PI;

  const getStrokeDashoffset = () => {
    let strokeDashoffset;
    const subsidyPerc = (subsidy / total + subsidy) * 100;

    strokeDashoffset = circumference - (subsidyPerc / 100) * circumference;

    return strokeDashoffset;
  }

  return {
    strokeDasharray: `${circumference} ${circumference}`,
    strokeDashoffset: getStrokeDashoffset(),
  };
};

const renderPie = (transactions, pricing) => {
  if (transactions && pricing) {
    return <>
      <PieSvg style={getPieSvgStyle(getTotal({ transactions }), getSubsidy({ prices: transactions.map(item => item.price), pricing }))} tabIndex='0' />
    </>
  }
}

const MerchantDetails = ({ name, transactions, pricing }) => {
  return <article className='c-merchant-details'>
    <section className='c-merchant-details__summary'>
      <div className='c-merchant-details__summary-overview-wrapper'>
        <header>
          <h1 className='h1'>Transactions</h1>
        </header>
        <div className='c-merchant-details__name'>
          <div className='c-merchant-details__name-text'>{name}</div>
        </div>
        <section className='c-merchant-details__overview'>
          <article className='c-merchant-details__count'>
            <div>Count</div>
            <div className='c-merchant-details__count-value'>{transactions ? transactions.length : ''}</div>
          </article>
          <article className='c-merchant-details__total'>
            <div>Total</div>
            <div className='c-merchant-details__total-value'>{transactions ? getTotal({ transactions }) : ''}</div>
          </article>
          <article className='c-merchant-details__subsidy'>
            <div>Subsidy</div>
            <div className='c-merchant-details__subsidy-value'>{transactions ? getSubsidy({ prices: transactions.map(item => item.price), pricing }) : ''}</div>
          </article>
        </section>
      </div>
      <div className='c-merchant-details__summary-pie'>
        {renderPie(transactions, pricing)}
      </div>
    </section>
    <div className='c-merchant-details__table-wrapper'>
      {transactions ? renderTable(transactions, pricing) : ''}
    </div>
  </article>;
}

export default MerchantDetails;
