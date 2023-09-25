import React, { useState } from 'react'
import './FirstSection.css'
import { Button } from './Button'
import CandidateRigistrationModal from './Modals/CandidateRigistrationModal'

function FirstSection() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  return (
    <div className='hero-container'>
        <h1>We are the best agency</h1>
        <p>We offer you job</p>
        <div className='hero-btns'>
          <button className='REGISTERButton' onClick={handleShow}>REGISTER YOUR RESUME</button>
          {show && 
          <CandidateRigistrationModal show={show} setShow={setShow}/>
          }

        </div>

    </div>
  )
}

export default FirstSection