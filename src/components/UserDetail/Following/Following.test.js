import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import mockAxios from 'axios-jsonp-pro'
import { renderWithRouter } from '../../../helpers'
import Following from './Following'
import { clientID } from '../../../constants'

afterEach(cleanup)

const following = [
  {
    id: 12345,
    url: 'http://example.com/',
    display_name: 'Bryan Paronto',
    images: {
      50: 'http://example.com/follower_photo_12345.jpg'
    }
  },
]

const user = {
  username: 'bparonto'
}

afterEach(cleanup)

describe('<Following />', () => {
  it('renders', async () => {

    mockAxios.jsonp.mockImplementationOnce(() => Promise.resolve({
      following
    }))

    const { getByTestId } = renderWithRouter(
      <Following />,
      {
        route: `/detail?user=${user.username}`
      }
    )

    // It Renders the loader...
    expect(getByTestId('loader')).toBeTruthy()

    // It then renders the content
    await waitForElement(() => getByTestId('following-list'))
    expect(getByTestId('following-list')).toBeTruthy()

    expect(mockAxios.jsonp).toHaveBeenCalled()
    expect(mockAxios.jsonp).toHaveBeenCalledWith(`https://api.behance.net/v2/users/${user.username}/following?client_id=${clientID}`)
  })

})
