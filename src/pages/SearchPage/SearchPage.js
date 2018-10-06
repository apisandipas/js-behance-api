import React, { Component } from 'react'
import axios from 'axios-jsonp-pro'
import { Link } from 'react-router-dom'
import './SearchPage.css'

class SearchPage extends Component {

  state = {
    isLoading: false,
    results: [],
    query: ''
  }

  renderResults = () => {
    const { isLoading, results } = this.state

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (results.length) {
      return results.map((user) => {
        return (
          <Link to={`/detail?user=${user.username}`} key={user.id} className="Result">
            <div style={{
              border: '1px solid #444',
              display: 'flex',
              alignItems:'center',
              background: 'white'
            }}>
              <img src={user.images['50']} alt={user.display_name} />
              <div className='Result-content' style={{margin: ' 0 1rem', }}>
                {user.display_name}
              </div>
            </div>
          </Link>
        )
      })
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.setState({ isLoading: true })
    try {
      const { query }  = this.state
      const clientID = 'T10DIxB0UyH0nVaR22SuTNKkRDsmTj4e'
      const url = `https://api.behance.net/v2/users?q=${query}&client_id=${clientID}`
      const response = await axios.jsonp(url)
      console.log(response)
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
    const { results } = this.state
    return (
      <div className="SearchPage">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={this.state.query}
            onChange={this.handleChange}
          />
          <button>Search</button>
        </form>

        <div>{results.length} Results</div>

        <div className="Results" style={{ 'display': 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '1rem' }}>
          {this.renderResults()}
        </div>
      </div>
    )
  }
}

export default SearchPage
