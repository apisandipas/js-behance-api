import React, { Component }  from 'react'
import qs from 'query-string'
import axios from 'axios-jsonp-pro'
import { clientID } from '../../../constants'
import { titleCase } from '../../../helpers'
import Loader from '../../Loader/Loader'

import './Profile.css'

class Profile extends Component {

  state = {
    isLoading: false
  }

  componentDidMount = async () => {
    const query = qs.parse(window.location.search)
    this.setState({ isLoading: true })
    try {
      const url = `https://api.behance.net/v2/users/${query.user}?client_id=${clientID}`
      const response = await axios.jsonp(url)
      this.setState({
        user: response.user,
        isLoading: false
      })
    } catch(error) {
      console.log(error)
    }
  }

  render () {
    const { user, isLoading } = this.state

    if (isLoading) {
      return (
        <div className="Profile loading">
          <Loader />
        </div>
      )
    }

    if (user) {
      const statTitle = Object.keys(user.stats)
      const statValues = Object.values(user.stats)
      return(
        <div className="Profile">
          <img src={user.images['230']} alt={user.display_name} />
          <div className="Profile-content">
            Name: <strong>{user.display_name}</strong> <br/>
            Job: <strong>{user.occupation}</strong> <br/>
            Location: <strong>{user.location}</strong>
            <table style={{margin: '1rem 0'}} className="Profile-state-table">
              <thead>
                <tr>
                  {statTitle.map((title) => {
                    return <th key={title}>{titleCase(title.replace('_', ' '))}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {statValues.map((value) => {
                    return <td key={value}>{(value && value.toLocaleString()) || 'n/a'}</td>
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    }

    return false
  }
}

export default Profile
