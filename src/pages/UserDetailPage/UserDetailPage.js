import React, { Component } from 'react'
import qs from 'query-string'
import axios from 'axios-jsonp-pro'

import './UserDetailPage.css'

class UserDetailPage extends Component {

  state = {
    isLoading: false,
    user: {}
  }

  componentDidMount = async () => {
    const query = qs.parse(this.props.location.search)
    this.setState({ isLoading: true })
    try {
      const clientID = 'T10DIxB0UyH0nVaR22SuTNKkRDsmTj4e'
      const url = `https://api.behance.net/v2/users/${query.user}?client_id=${clientID}`
      const response = await axios.jsonp(url)
      console.log(response)
      this.setState({
        user: response.user,
        isLoading: false
      })
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const { isLoading, user } = this.state

    if (isLoading) {
      return <div>Loading...</div>
    }

    return (
      <div className="UserDetailPage">
        <h1>UserDetailPage</h1>
        {user.display_name}
      </div>
    )
  }
}

export default UserDetailPage
