import React, { Component } from 'react'
import axios from 'axios-jsonp-pro'
import Result from '../../components/Result/Result'
import Loader from '../../components/Loader/Loader'
import { clientID } from '../../constants'

import './SearchPage.css'

class SearchPage extends Component {

  state = {
    isLoading: false,
    results: [],
    query: ''
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.setState({ isLoading: true })
    try {
      const { query }  = this.state
      const url = `https://api.behance.net/v2/users?q=${query}&client_id=${clientID}`
      const response = await axios.jsonp(url)
      this.setState({
        results: response.users,
        isLoading: false
      })
    } catch(error) {
      console.log(error)
    }
  }

  handleChange = (e) => {
    this.setState({
      query: e.target.value
    })
  }

  render() {
    const { isLoading, results } = this.state

    return (
      <div className="SearchPage">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={this.state.query}
            onChange={this.handleChange}
            data-testid="search-page-input"
          />
          <button data-testid="search-page-submit">Search</button>
        </form>

        {isLoading && (<Loader />)}

        <div className="Results">
          {results.length > 0 &&
            results.map((user) => (
              <Result key={user.id} user={user} />)
            )
          }
        </div>
      </div>
    )
  }
}

export default SearchPage
