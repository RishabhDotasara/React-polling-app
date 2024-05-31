import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
  const [pollId, setPollId] = useState('default')
  const navigate = useNavigate();
  return (
    
    <div className='container'>
      <Link to="/create">Create a Poll</Link>
      <h1>Or</h1>
      <div className="join-poll">
        <input type="text" placeholder='Poll Id here...' required onChange={(e)=>{setPollId(e.target.value)}}/>
        <button onClick={()=>{
          
              // alert("Please enter a valid poll id.")
              if (pollId === 'default') {
                alert("Please enter a valid poll id.")
              } else
              {

                navigate(`/poll/${pollId}`)
              }

        }}>Join a poll</button>
        <button onClick={()=>{
          
              // alert("Please enter a valid poll id.")
              if (pollId === 'default') {
                alert("Please enter a valid poll id.")
              } else
              {

                navigate(`/result/${pollId}`)
              }
          
        }}>View Poll Result</button>
      </div>
      

    </div>

    
  )
}
