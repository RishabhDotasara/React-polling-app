import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Result() {
  const {id} = useParams()
  const [poll,setPoll] = useState({})

const getPoll = () => {
  //make the fetch request
  fetch("https://react-polling-app-server.vercel.app/poll/" + id, {
    method: "GET",
  })
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("Error: " + res.status);
    }
  })
  .then((data) => {
    setPoll(data.poll[0]);
    // setLoading(false);
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
};
  // now get the fucking poll
  useEffect(()=>{
    getPoll();
  },[])
  console.log(poll);
  return (
    <div className='container-poll'>
        {/* <h className='question'>This is the question</h> */}
        <h1 className="question">{poll.question}</h1>
        <div className="options">
          {poll.options && poll.options.map((option)=>{
            return (

              <div className="option-poll">
                  {"Option: "+option[0]}
                  <div>
                    Votes: 
                    {" "+option[1]}
                  </div>
              </div>
            )
          })}
        </div>
    </div>
  )
}
