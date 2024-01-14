import React from 'react';
import './Warning.css'

function Warning ({ message }) {
  return (
    <p className="warning">{message}</p>
  )
}

export default Warning;
