import { useState } from 'react'
import waldo_image from './assets/waldoimg.png'
import './stylesheets/App.css'

function App() {
  return (
    <div className="App">
      <div className='picture'>
        <img src={waldo_image} alt="Where's Waldo Picture." />
      </div>
    </div>
  )
}

export default App
