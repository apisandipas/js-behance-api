import React from 'react'
import { render, cleanup } from 'react-testing-library'
import Result from './Result'
import { MemoryRouter } from 'react-router-dom'

afterEach(cleanup)

describe('<Result />', () =>{
  it('renders', () => {
    const user = {
      images: {
        50: 'http://example.com/user_image.jpg'
      },
      username: 'bparonto',
      display_name: 'Bryan Paronto'
    }
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <Result user={user} />
      </MemoryRouter>
    )

    expect(getByTestId('result-link').getAttribute('href')).toBe(`/detail?user=${user.username}`)
    expect(getByTestId('result-image').getAttribute('alt')).toBe(user.display_name)
    expect(getByText(user.display_name)).toBeTruthy()
  })
})
