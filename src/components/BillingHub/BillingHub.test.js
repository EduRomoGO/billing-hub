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
        "price": 2923,
      },
      {
        "description": "Awesome Frozen Chips",
        "price": 1958,
      },
      {
        "description": "Car",
        "price": 566,
      }
    ];
    const respMerchantDetails = { data: {
      transactions,
      name: 'reale',
      pricing: {
        "subsidy": 9,
        "discount_subsidy": 6,
        "discount_cutoff": 600
      },
    } };
    const names = respMerchants.data.map(item => item.name);

    axios.get.mockResolvedValueOnce(respMerchants)
      .mockResolvedValueOnce(respMerchantDetails);

    const { getAllByText, getByText, getAllByRole, findByRole } = render(<BillingHub />);

    expect(axios.get).toHaveBeenCalledTimes(1);

    const titleEl = await findByRole('heading');
    expect(titleEl).toHaveTextContent('Merchants');

    const topicElsText = getAllByRole('listitem').map(el => el.textContent)
    expect(topicElsText).toEqual(names)

    expect(document.querySelector('.b-merchant-list')).toBeInTheDocument();

    fireEvent.click(getByText('reale'));
    await wait();

    expect(axios.get).toHaveBeenCalledTimes(2);

    const count = getByText('3');
    expect(count).toBeInTheDocument();

    expect(getAllByText('reale').length).toBe(2);

    expect(document.querySelector('.c-merchant-details__name').textContent).toBe('reale');

    // count, total, subsidy
  });

});
