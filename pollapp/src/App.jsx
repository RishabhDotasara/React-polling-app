import { useState } from 'react'

import './App.css'
import Home from './components/Home'
import {BrowserRouter, Routes, Route, useParams, Link} from "react-router-dom"
import CreatePoll from './components/CreatePoll'
import { MdHome } from 'react-icons/md'
import Poll from './components/Poll'
import Result from './components/Result'

function App() {
 
  return (
    <BrowserRouter>
      {/* <h1>This is a page.</h1> */}
      <Link to='/' className='home-btn'><MdHome/></Link>
      <Routes>
        <Route index element={<Home/>}></Route>
        <Route path="/create" element={<CreatePoll/>}></Route>
        <Route path='/poll/:id' element={<Poll/>}></Route>
        <Route path='/result/:id' element={<Result/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
