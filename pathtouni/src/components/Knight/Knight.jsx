import React from 'react'
import './Knight.css'
import dark_arrow from '../../assets/dark_arrow.png'

const Knight = () => {
  return (
    <div className='Knight container'>
    <div className='Knight-text'>
        <h1>Your Gateway to Higher Education in Sri Lanka</h1>
        <p>Choosing the right university is a life-changing decision. PathToUni simplifies the process by providing tailored recommendations based on your academic results. Explore degree programs, compare options, and make an informed choice with ease.</p>
        <button className='btn'>Get Started <img src={dark_arrow} alt=""/></button>
         </div>
      
    </div>
  )
}

export default Knight
