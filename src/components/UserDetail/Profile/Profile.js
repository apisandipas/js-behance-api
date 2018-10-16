import React, { Component }  from 'react'
import qs from 'query-string'
import axios from 'axios-jsonp-pro'
import { withRouter } from 'react-router-dom'
import { clientID } from '../../../constants'
import { titleCase } from '../../../helpers'
import Loader from '../../Loader/Loader'

import './Profile.css'

class Profile extends Component {

  state = {
    isLoading: true
  }

  componentDidMount = async () => {
    const query = qs.parse(this.props.location.search)
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
      const { display_name, images, occupation, location, stats } = user
      const statTitle = Object.keys(stats)
      const statValues = Object.values(stats)
      return(
        <div className="Profile">
          <img src={images['230']} alt={display_name} />
          <div className="Profile-content" data-testid="profile-content">
            Name: <strong>{display_name}</strong> <br/>
            Job: <strong>{occupation}</strong> <br/>
            Location: <strong>{location}</strong>
            <table className="Profile-stat-table">
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

export default withRouter(Profile)
