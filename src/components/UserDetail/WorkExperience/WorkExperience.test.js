import React from 'react'
import { render, cleanup, waitForElement } from 'react-testing-library'
import mockAxios from 'axios-jsonp-pro'
import { renderWithRouter } from '../../../helpers'
import WorkExperience from './WorkExperience'
import { clientID } from '../../../constants'

afterEach(cleanup)

const workExperience = [
  {
    start_date:'03-2018',
    end_date: '10-2018',
    position: 'Web Developer',
    organization: 'Acme Corp',
    location: 'Chicago, IL'
  },
  {
    start_date:'02-2014',
    end_date: '03-2018',
    position: 'Web Developer',
    organization: 'Mega Corp',
    location: 'Chicago, IL'
  },
]

const user = {
  username: 'bparonto'
}

afterEach(cleanup)

describe('<WorkExperience />', () => {
  it('renders', async () => {

    mockAxios.jsonp.mockImplementationOnce(() => Promise.resolve({
      work_experience: workExperience
    }))

    const { getByTestId } = renderWithRouter(
      <WorkExperience />,
      {
        route: `/detail?user=${user.username}`
      }
    )

    // It Renders the loader...
    expect(getByTestId('loader')).toBeTruthy()

    // It then renders the content
    await waitForElement(() => getByTestId('workexperience-list'))
    expect(getByTestId('workexperience-list')).toBeTruthy()

    expect(mockAxios.jsonp).toHaveBeenCalled()
    expect(mockAxios.jsonp).toHaveBeenCalledWith(`https://api.behance.net/v2/users/${user.username}/work_experience?client_id=${clientID}`)
  })

})
