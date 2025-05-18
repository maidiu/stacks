import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PicsumImage from './PicsumImage.jsx'

import ExpandingTextarea from './ExpandingTextInput.jsx'
import LineGenerator from './LineGenerator.jsx'

function App() {


  return (
      <div>
        <p>Creative writing visual prompts</p>
        <PicsumImage/>
        <LineGenerator type="fiction"/>
        <LineGenerator type="reference"/>
        <ExpandingTextarea/>
        </div>

  )
}

export default App;
