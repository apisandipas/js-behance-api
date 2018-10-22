import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import mockAxios from 'axios-jsonp-pro'
import { renderWithRouter } from '../../../helpers'
import { clientID } from '../../../constants'
import Profile from './Profile'

afterEach(cleanup)

const user = {
  display_name: 'Bryan Paronto',
  images: {
    230: 'http://example.com/user_image.jpg'
  },
  occupation: 'Web Developer',
  location: 'Chicago, IL',
  stats: {
    appreciation: 4253,
    comments: 799,
    followers: 1262,
    following: 409,
    team_members: false,
    views: 47150
  },
  username: 'bparonto'
}

describe('<Profile />', () => {
  it('renders', async () => {

    mockAxios.jsonp.mockImplementationOnce(() => Promise.resolve({
        user
    }))

    const { getByTestId } = renderWithRouter(
      <Profile />,
      {
        route: `/detail?user=${user.username}`
      }
    )

    // It Renders the loader...
    expect(getByTestId('loader')).toBeTruthy()

    // It then renders the content
    await waitForElement(() => getByTestId('profile-content'))
    expect(getByTestId('profile-content')).toBeTruthy()

    expect(mockAxios.jsonp).toHaveBeenCalled()
    expect(mockAxios.jsonp).toHaveBeenCalledWith(`https://api.behance.net/v2/users/${user.username}?client_id=${clientID}`)
  })

})
