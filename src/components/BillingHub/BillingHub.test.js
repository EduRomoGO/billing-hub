import React from 'react';
import { wait, render } from '@testing-library/react';
import BillingHub from './BillingHub.js';
import axios from 'axios';

jest.mock('axios');
// jest.mock('../MerchantDetails/MerchantDetails.js', () => () => <div></div>);

afterEach(() => {
  jest.resetAllMocks()
});

describe('Billing hub', () => {
  it('renders correctly', async () => {
    // const { getByText } =

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
    // axios.get.mockImplementation(() => Promise.resolve(resp))

    // const res = await axios.get();
    // console.log(res);

    // let getAllByRole
    // act(() => {
      const { getAllByRole, findByRole } = render(<BillingHub />);

    // });
    // const linkElement = getByText(/learn react/i);

    // expect(axios.get).toHaveBeenCalledTimes(1);
    const titleEl = await findByRole('heading');
    expect(titleEl).toHaveTextContent('hola');
    // console.log(getAllByRole('listitem'));

    // const topicElsText = document.querySelectorAll('.b-merchant-list__item').map(el => el.textContent);
    // // getAllByRole('listitem')
    // expect(topicElsText).toEqual(names);
    // await wait(() => {
      const topicElsText = getAllByRole('listitem').map(el => el.textContent)
      expect(topicElsText).toEqual(names)
      // console.log(document.querySelectorAll('.b-merchant-list__item'));
    // });

    expect(document.querySelector('.b-merchant-list')).toBeInTheDocument();
  });

});
