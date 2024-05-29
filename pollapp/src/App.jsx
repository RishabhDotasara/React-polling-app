import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import CreatePoll from './components/CreatePoll'
import { MdHome } from 'react-icons/md'
import Poll from './components/Poll'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      {/* <h1>This is a page.</h1> */}
      <a href='/' className='home-btn'><MdHome/></a>
      <Routes>
        <Route index element={<Home/>}></Route>
        <Route path="/create" element={<CreatePoll/>}></Route>
        <Route path='/poll/:id' element={<Poll/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
