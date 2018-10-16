import React from 'react'
import Profile from '../../components/UserDetail/Profile/Profile'
import Projects from '../../components/UserDetail/Projects/Projects'
import WorkExperience from '../../components/UserDetail/WorkExperience/WorkExperience'
import Followers from '../../components/UserDetail/Followers/Followers'
import Following from '../../components/UserDetail/Following/Following'

import './UserDetailPage.css'

const UserDetailPage = () => {
  return (
    <div className="UserDetailPage" data-testid="detail-page">
      <Profile />
      <Projects />
      <WorkExperience />
      <Followers />
      <Following />
    </div>
  )
}

export default UserDetailPage
