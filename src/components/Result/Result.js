import React from 'react'
import { Link } from 'react-router-dom'

import './Result.css'

const Result = ({ user }) => {
  const { username, images, display_name } = user
  return (
    <Link to={`/detail?user=${username}`} className="Result" data-testid="result-link">
      <div>
        <img src={images['50']} alt={display_name} data-testid="result-image" />
        <div className='Result-content'>
          {display_name}
        </div>
      </div>
    </Link>
  )
}

export default Result
