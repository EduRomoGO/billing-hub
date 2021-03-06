import React from 'react';
import { render, wait, fireEvent, getAllByText } from '@testing-library/react';
import BillingHub from './BillingHub.js';
import axios from 'axios';

jest.mock('axios');

afterEach(() => {
  jest.resetAllMocks()
});

describe('Billing hub', () => {
  it('renders correctly', async () => {

    // ***************
    // Mock api calls
    // ***************
    const respMerchants = {
      data: [
        {
          name: 'reale',
          merchant_id: 1,
        },
        {
          name: 'axa',
          merchant_id: 2,
        },
      ]
    };

    const transactions = [
      {
        "description": "Soft Chips",
        "date": "2019-03-09T13:37:54.146Z",
        "price": 100,
      },
      {
        "description": "Awesome Frozen Chips",
        "date": "2019-03-12T13:37:54.146Z",
        "price": 200,
      },
      {
        "description": "Car",
        "date": "2019-03-23T13:37:54.146Z",
        "price": 300,
      }
    ];
    const respMerchantDetails = {
      data: {
        transactions,
        name: 'reale',
        pricing: {
          "subsidy": 10,
          "discount_subsidy": 5,
          "discount_cutoff": 200
        },
      }
    };
    const names = respMerchants.data.map(item => item.name);

    axios.get.mockResolvedValueOnce(respMerchants)
      .mockResolvedValueOnce(respMerchantDetails)
      .mockResolvedValueOnce({...respMerchantDetails, data: { ...respMerchantDetails.data, name: 'axa'}});
    // ***************



    const { getAllByText, getByText, getAllByRole, findAllByRole } = render(<BillingHub />);



    // ***************
    // Merchants asserts
    // ***************
    expect(axios.get).toHaveBeenCalledTimes(1);

    const titleEl = (await findAllByRole('heading'))[0];
    expect(titleEl).toHaveTextContent('Merchants');

    const topicElsText = getAllByRole('listitem').map(el => el.textContent)
    expect(topicElsText).toEqual(names)

    expect(document.querySelector('.b-merchant-list')).toBeInTheDocument();
    // ***************



    // ***************
    // Merchant details asserts
    // ***************

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(getByText('Transactions')).toBeInTheDocument();

    // Summary asserts
    // The following use of getByText probably should be replaced by getByTestId to be more meaningfull and to avoid false positives just finding any other place where this numbers could be rendered by chance
    const count = getByText('3');
    expect(count).toBeInTheDocument();

    expect(getAllByText('reale').length).toBe(2);

    expect(document.querySelector('.c-merchant-details__name').textContent).toBe('reale');

    const total = getByText('600');
    expect(total).toBeInTheDocument();

    const subsidy = getByText('35');
    expect(subsidy).toBeInTheDocument();



    // Table asserts
    const table = document.querySelector('table');
    expect(table).toBeInTheDocument();

    const tableColumns = document.querySelectorAll('th');
    expect(tableColumns.length).toBe(4);

    const tableRows = document.querySelectorAll('tr');
    expect(tableRows.length).toBe(4);
    // ***************




    // ***************
    // Merchant click load new data
    // ***************

    fireEvent.click(getByText('axa'));
    await wait();

    expect(axios.get).toHaveBeenCalledTimes(3);
    // expect(getAllByText('axa').length).toBe(2);
  });

});
