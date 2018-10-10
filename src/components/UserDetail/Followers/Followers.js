import React, { Component } from 'react'
import axios from 'axios-jsonp-pro'
import qs from 'query-string'
import { clientID } from '../../../constants'
import Loader from '../../Loader/Loader'

import './Followers.css'

class Followers extends Component {
  state = {
    isLoading: false,
    followers: []
  }

  componentDidMount = async () => {
    const query = qs.parse(window.location.search)
    this.setState({ isLoading: true })
    try {
      const url = `https://api.behance.net/v2/users/${query.user}/followers?client_id=${clientID}`
      const response = await axios.jsonp(url)
      this.setState({
        followers: response.followers,
        isLoading: false
      })
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const { isLoading, followers } = this.state

    if (isLoading) {
      return (
        <div className="Followers loading">
          <Loader />
        </div>
      )
    }

    return (
      <div className="Followers">
        <header>
          <h2>Followers</h2>
        </header>
        <section className="Followers-list">
          {followers.length && followers.map((follower) => {
            return (
              <a
                href={follower.url}
                target="_blank"
                rel="noopener noreferrer"
                className="Followers-list-item"
                key={follower.id}
              >
                <img src={follower.images['50']} alt={follower.display_name} title={follower.display_name}/>
              </a>
            )
          })}
        </section>
      </div>
    )
  }
}

export default Followers
