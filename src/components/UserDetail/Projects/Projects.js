import React, { Component } from 'react'
import qs from 'query-string'
import axios from 'axios-jsonp-pro'
import { clientID } from '../../../constants'
import Loader from '../../Loader/Loader'

import './Projects.css'

class Projects extends Component {

  state = {
    isLoading: false,
    projects: []
  }

  componentDidMount = async () => {
    const query = qs.parse(window.location.search)
    this.setState({ isLoading: true })
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
        <section className="Projects-list">
          {projects.length && projects.map((project) => {
            return (
              <a href={project.url} key={project.id} target="_blank" rel="noopener noreferrer" className="Projects-list-item">
                <img src={project.covers['115']} alt={project.name}/>
                {project.name}
              </a>
            )
          })}
        </section>
      </div>
    )
  }
}

export default Projects
