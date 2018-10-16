import React from 'react'
import { render } from 'react-testing-library'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

// Taken from react-testing-library docs.
// Used to mock router for testing route params
export const renderWithRouter = (
  ui,
  {route = '/', history = createMemoryHistory({initialEntries: [route]})} = {},
) => {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  }
}

export const titleCase = (str) => {
  return str.toLowerCase().split(' ').map((word) => {
    return (word.charAt(0).toUpperCase() + word.slice(1))
  }).join(' ')
}
