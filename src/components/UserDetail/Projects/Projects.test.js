import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import mockAxios from 'axios-jsonp-pro'
import { renderWithRouter } from '../../../helpers'
import Projects from './Projects'
import { clientID } from '../../../constants'

afterEach(cleanup)

const projects = [
  {
    id: 12345,
    url: 'http://example.com/',
    name: 'Example Project Name',
    covers: {
      115: 'http://example.com/project-cover.jpg'
    }
  },
]

const user = {
  username: 'bparonto'
}

afterEach(cleanup)

describe('<Projects />', () => {
  it('renders', async () => {

    mockAxios.jsonp.mockImplementationOnce(() => Promise.resolve({
      projects
    }))

    const { getByTestId } = renderWithRouter(
      <Projects />,
      {
        route: `/detail?user=${user.username}`
      }
    )

    // It Renders the loader...
    expect(getByTestId('loader')).toBeTruthy()

    // It then renders the content
    await waitForElement(() => getByTestId('projects-list'))
    expect(getByTestId('projects-list')).toBeTruthy()

    expect(mockAxios.jsonp).toHaveBeenCalled()
    expect(mockAxios.jsonp).toHaveBeenCalledWith(`https://api.behance.net/v2/users/${user.username}/projects?client_id=${clientID}`)
  })

})
