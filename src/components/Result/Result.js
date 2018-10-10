import React from 'react'
import { Link } from 'react-router-dom'

import './Result.css'

const Result = ({ user }) => {
  return (
    <Link to={`/detail?user=${user.username}`} className="Result">
      <div>
        <img src={user.images['50']} alt={user.display_name} />
        <div className='Result-content'>
          {user.display_name}
        </div>
      </div>
    </Link>
  )
}

export default Result
