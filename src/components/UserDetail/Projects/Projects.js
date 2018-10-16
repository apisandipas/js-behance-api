import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import qs from 'query-string'
import axios from 'axios-jsonp-pro'
import { clientID } from '../../../constants'
import Loader from '../../Loader/Loader'

import './Projects.css'

class Projects extends Component {

  state = {
    isLoading: true,
    projects: []
  }

  componentDidMount = async () => {
    const query = qs.parse(this.props.location.search)
    try {
      const url = `https://api.behance.net/v2/users/${query.user}/projects?client_id=${clientID}`
      const response = await axios.jsonp(url)
      this.setState({
        projects: response.projects,
        isLoading: false
      })
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const { isLoading, projects } = this.state

    if (isLoading) {
      return (
        <div className="Projects loading">
          <Loader />
        </div>
      )
    }

    return (
      <div className="Projects">
        <header>
          <h2>Projects</h2>
        </header>
        <section className="Projects-list" data-testid="projects-list">
          {projects.length && projects.map((project) => {
            const { url, id, name, covers } = project
            return (
              <a href={url} key={id} target="_blank" rel="noopener noreferrer" className="Projects-list-item">
                <img src={covers['115']} alt={name}/>
                {name}
              </a>
            )
          })}
        </section>
      </div>
    )
  }
}

export default withRouter(Projects)
