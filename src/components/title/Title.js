import React from 'react';
import './Title.scss';

const Title = ({title}) => {
  return (
  <div class="glitch-wrapper">
    <div class="glitch" data-text={title}>{title}</div>
  </div>
  )
}

export default Title;