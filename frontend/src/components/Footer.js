import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
function Footer() {
  return (
    <div className='footer-container'>
       <div className='footer-logo'>
            <Link to='/' className='social-logo'>
               HR-system
              <i className='fab fa-typo3' />
            </Link>
          </div>
          <small className='website-rights'>Noor Alkhateeb Developer © 2023</small>
    </div>
  )
}

export default Footer