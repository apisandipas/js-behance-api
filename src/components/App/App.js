import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import SearchPage from '../../pages/SearchPage/SearchPage'
import UserDetailPage from '../../pages/UserDetailPage/UserDetailPage'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav className="App-nav">
            <Link to="/">BehanceUserSearch</Link>
          </nav>
          <Route exact path="/" component={SearchPage} />
          <Route path="/detail" component={UserDetailPage} />
        </div>
      </Router>
    )
  }
}

export default App
