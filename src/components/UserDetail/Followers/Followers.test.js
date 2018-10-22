import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import mockAxios from 'axios-jsonp-pro'
import { renderWithRouter } from '../../../helpers'
import Followers from './Followers'
import { clientID } from '../../../constants'

afterEach(cleanup)

const followers = [
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

describe('<Followers />', () => {
  it('renders', async () => {

    mockAxios.jsonp.mockImplementationOnce(() => Promise.resolve({
      followers
    }))

    const { getByTestId } = renderWithRouter(
      <Followers />,
      {
        route: `/detail?user=${user.username}`
      }
    )

    // It Renders the loader...
    expect(getByTestId('loader')).toBeTruthy()

    // It then renders the content
    await waitForElement(() => getByTestId('followers-list'))
    expect(getByTestId('followers-list')).toBeTruthy()

    expect(mockAxios.jsonp).toHaveBeenCalled()
    expect(mockAxios.jsonp).toHaveBeenCalledWith(`https://api.behance.net/v2/users/${user.username}/followers?client_id=${clientID}`)
  })

})
