import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, cleanup, fireEvent, waitForElement } from 'react-testing-library'
import mockAxios from 'axios-jsonp-pro'

import SearchPage from './SearchPage'
import { clientID } from '../../constants' // The API isnt actually called but this is used to match the query string params

afterEach(cleanup)

describe('<SearchPage />',  () => {

  it('renders search input and button', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )
    const input = getByTestId('search-page-input')
    const button = getByTestId('search-page-submit')
    expect(input).toBeTruthy()
    expect(button).toBeTruthy()
  })

  it('loads search results when button is clicked', async () => {

    mockAxios.jsonp.mockImplementationOnce(() => Promise.resolve({
      users: [
        {
          id: 1,
          images: {
            50: 'http://example.com/user_image.jpg'
          },
          username: 'bparonto',
          display_name: 'Bryan Paronto'
        },
        {
          id: 2,
          images: {
            50: 'http://example.com/user_image2.jpg'
          },
          username: 'peterquill',
          display_name: 'Peter Quill'
        }
      ]
    }))

    const { getByTestId } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )
    // Select search input and change input value
    const input = getByTestId('search-page-input')
    const searchQuery = 'dave'
    fireEvent.change(input, {target: {value: searchQuery}})
    expect(input.value).toBe(searchQuery)

    // Similate click on Search button
    fireEvent.click(getByTestId('search-page-submit'))

    // Wait for appearance of results
    await waitForElement(() => getByTestId('result-link'))

    expect(mockAxios.jsonp).toHaveBeenCalled()
    expect(mockAxios.jsonp).toHaveBeenCalledWith(`https://api.behance.net/v2/users?q=${searchQuery}&client_id=${clientID}`)
  })
})
