import React, { Component } from 'react'
import axios from 'axios-jsonp-pro'
import qs from 'query-string'
import { clientID } from '../../../constants'
import Loader from '../../Loader/Loader'

import './Following.css'

class Following extends Component {
  state = {
    isLoading: false,
    following: []
  }

  componentDidMount = async () => {
    const query = qs.parse(window.location.search)
    this.setState({ isLoading: true })
    try {
      const url = `https://api.behance.net/v2/users/${query.user}/following?client_id=${clientID}`
      const response = await axios.jsonp(url)
      this.setState({
        following: response.following,
        isLoading: false
      })
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const { isLoading, following } = this.state

    if (isLoading) {
      return (
        <div className="Following loading">
          <Loader />
        </div>
      )
    }

    return (
      <div className="Following">
        <header>
          <h2>Following</h2>
        </header>
        <section className="Following-list">
          {(following.length > 0) && following.map((followee) => {
            return (
              <a
                href={followee.url}
                target="_blank"
                rel="noopener noreferrer"
                className="Following-list-item"
                key={followee.id}
              >
                <img src={followee.images['50']} alt={followee.display_name} title={followee.display_name}/>
              </a>
            )
          })}
        </section>
      </div>
    )
  }
}

export default Following
