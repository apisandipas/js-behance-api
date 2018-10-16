import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios-jsonp-pro'
import qs from 'query-string'
import { clientID } from '../../../constants'
import Loader from '../../Loader/Loader'

import './Followers.css'

class Followers extends Component {
  state = {
    isLoading: true,
    followers: []
  }

  componentDidMount = async () => {
    const query = qs.parse(this.props.location.search)
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
        <section className="Followers-list" data-testid="followers-list">
          {followers && followers.map((follower) => {
            const { url, id, images, display_name } = follower
            return (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="Followers-list-item"
                key={id}
              >
                <img src={images['50']} alt={display_name} title={display_name}/>
              </a>
            )
          })}
        </section>
      </div>
    )
  }
}

export default withRouter(Followers)
