import React, { Component } from 'react'
import axios from 'axios-jsonp-pro'
import qs from 'query-string'
import { clientID } from '../../../constants'
import Loader from '../../Loader/Loader'

import './WorkExperience.css'

class WorkExperience extends Component {

  state = {
    isLoading: false,
    workExperience: []
  }

  componentDidMount = async () => {
    const query = qs.parse(window.location.search)
    this.setState({ isLoading: true })
    try {
      const url = `https://api.behance.net/v2/users/${query.user}/work_experience?client_id=${clientID}`
      const response = await axios.jsonp(url)
      this.setState({
        workExperience: response.work_experience,
        isLoading: false
      })
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const { isLoading, workExperience } = this.state

    if (isLoading) {
      return (
        <div className="WorkExperience loading">
          <Loader />
        </div>
      )
    }

    return (
      <div className="WorkExperience">
        <header>
          <h2>Work Experience</h2>
        </header>
        <section className="WorkExperience-list">
          {workExperience.length === 0 && <div className="WorkExperience-list-item">No Work Experience Provided</div>}
          {workExperience.map((experience) => {
            const { start_date, end_date, position, organization, location } = experience
            return (
              <div className="WorkExperience-list-item" key={organization}>
                <strong>{position}</strong> at <strong>{organization}</strong> in {location} <br/>
                {start_date ? `from ${start_date}` : ''} {end_date ? `to ${end_date}` : ''}
              </div>
            )
          })}
        </section>
      </div>
    )
  }
}

export default WorkExperience
