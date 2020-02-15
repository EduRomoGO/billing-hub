import React from 'react';
import { render } from '@testing-library/react';
import BillingHub from './BillingHub.js';
import axios from 'axios';

jest.mock('axios');
jest.mock('../MerchantDetails/MerchantDetails.js', () => () => <div></div>);

afterEach(() => {
  jest.resetAllMocks()
});

describe('Billing hub', () => {
  it('renders correctly', async () => {

    const resp = {
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
    const names = resp.data.map(item => item.name);
    axios.get.mockResolvedValueOnce(resp);

    const { getAllByRole, findByRole } = render(<BillingHub />);

    const titleEl = await findByRole('heading');
    expect(titleEl).toHaveTextContent('Merchants');

    const topicElsText = getAllByRole('listitem').map(el => el.textContent)
    expect(topicElsText).toEqual(names)

    expect(document.querySelector('.b-merchant-list')).toBeInTheDocument();
  });

});
