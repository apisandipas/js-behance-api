import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Loader from './Loader'

afterEach(cleanup)

describe('<Loader />', () => {

  it('renders', () => {
    const { getByTestId } = render(<Loader />)
    expect(getByTestId('loader')).toBeTruthy()
  })

})
