import React, { useState } from 'react'

export default function Home() {
  const [pollId, setPollId] = useState('default')
  return (
    
    <div className='container'>
      <a href="/create">Create a Poll</a>
      <h1>Or</h1>
      <div className="join-poll">
        <input type="text" placeholder='Poll Id here...' required onChange={(e)=>{setPollId(e.target.value)}}/>
        <a href={`/poll/${pollId}`}>Join a poll</a>
      </div>
    </div>

    
  )
}
