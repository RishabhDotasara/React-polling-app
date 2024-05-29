import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import {BrowserRouter, Routes, Route, useParams, Link} from "react-router-dom"
import CreatePoll from './components/CreatePoll'
import { MdHome } from 'react-icons/md'
import Poll from './components/Poll'
import Result from './components/Result'

function App() {
  const [count, setCount] = useState(0);
  const {id} = useParams();

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
