import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Poll() {
  const { id } = useParams();
  const [poll, setPoll] = useState({
    question: "What is your favourite color?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  });
  const [timeup, setTimeup] = useState(false);
  const [optionSelected, setOptionSelected] = useState("");

  const startTimer =  ()=>{
    let time = 60
    let timer = setInterval(()=>{
      time--
      let minutes = Math.floor(time/60)
      let seconds = time%60
      if(time<=0){
        clearInterval(timer)
        setTimeup(true);
      }
      document.querySelector(".timer h2").innerText = `${minutes}:${seconds}`
    },1000)
  
  }

  useEffect(()=>{
    startTimer()
  },[])
  return (
    
    <>
        {id && (
            <div className="container-poll">
            <h1 className="question" style={{textAlign:"center"}}>{poll.question}</h1>
            <div className="options">
      
            {poll.options.map((option, index) => (
              <label>
                  <input type="radio" name="option" className="radiobox" value={option} key={index} onchange={()=>{
                    setOptionSelected(option)
                  }}/>
                  <div className="option">{option}</div>
              </label>
            ))}
            </div>
            <button>Submit</button>
            <div className="timer">
        <h1>Time Left</h1>
        <h2></h2>
        </div>
        
          </div>
        )}
        {!id && (
            <h1 style={{textAlign:"center"}}>No Poll Selected</h1>
        )   }
        
        
    
    </>
  );
}
