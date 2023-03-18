import { useState } from 'react'
import waldo_image from './assets/waldoimg.jpeg'
import waldo from './assets/waldo.jpg'
import odlaw from './assets/odlaw.jpg'
import wizard from './assets/wizard.jpg'
import './stylesheets/App.css'

function App() {
  return (
    <div className="App">
      <div className='picture'>
        <h1>Time:</h1>
        <img id='main-pic' src={waldo_image} alt="Where's Waldo Picture." />
        <div className='icons'>
          <img src={wizard} alt="Picture of the wizard." />
          <img src={waldo} alt="Picture of Waldo." />
          <img src={odlaw} alt="Picture of Odlaw" />
        </div>
      </div>
    </div>
  )
}

export default App
