import React from 'react'
import './StartButton.scss';

const StartButton = ({title}) => {
  return (
    <div className='button'>
      <span>{title}</span>
    </div>
  )
}

export default StartButton