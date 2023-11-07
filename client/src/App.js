import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import Button from './components/Button';
import DisplayData from './components/DisplayData';

const App = () => {

  const [show, setShow] = useState(false)
  const [buttonText, setButtonText] = useState('Hae')

  const handleClick = () => {
    if (show === false){
      setShow(true)
      setButtonText('Takaisin')
    }  
    else {
      setShow(false)
      setButtonText('Hae')
    }
  }

  return (
    <div className="container">
      <h1 className="mx-auto w-25 text-center mb-5 mt-5">Sähkön hinta</h1>
      <Button onClick={handleClick} text={buttonText}/>
      {show?<DisplayData /> : ''}
    </div>
  )
}

export default App
