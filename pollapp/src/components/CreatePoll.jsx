import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { useParams } from 'react-router-dom';

export default function CreatePoll() {
    const [count, setCount] = useState(2)
   
    const [done, setDone] = useState(false);
    const [options, setOptions] = useState(["Option 1","Option 2"])
    const [question, setQuestion] = useState("");
    const [id,setId] = useState("")
    const address = "https://react-polling-app-server-qm654qm4i-rishabhs-projects-1e23b367.vercel.app/"

    const getId = ()=>{
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    const createPoll = (e)=>{
        e.preventDefault();
        let poll = {
            question:question,
            options:options
        }
        console.log(poll)

        //get the id for the poll
        var id = getId();
        setId(id);
        console.log(id);

        //make the request
        fetch(address+"create",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({

                question:question,
                options:options,
                id:id
            }),
        },
        )
        .then(res=>{
            if (res.status == 200)
                {
                    setDone(true);
                    alert("Poll Created, now you can share the link or Id '"+id+"' ")

                }
            else 
            {
                alert("Error creating the Poll, Please try again!")
            }
        })
    }


  return (
    <>
        {!done && (
            <form className='container create'>
            <h1>Question</h1>
          <input type="text" className='question' required placeholder='Enter the question for poll.' onChange={(e)=>{
                setQuestion(e.target.value)
          }}/>
          <h1>Options</h1>
            <div className="options">
                {options.map((option,index)=>{
                    return (
                        <div className="input" key={index}>
    
                            <input type="text" className='options' placeholder="option" onChange={(e)=>{
                                let newArr = [...options];
                                newArr[index] = e.target.value;
                                setOptions(newArr);
                            }} required/>
                            <button onClick={()=>{
                                let newArr = [...options];
                                newArr.splice(index,1)
                                setOptions(newArr);
                            }}><MdDelete/></button>
                        </div>
                    )
                })}
            </div>
            <button style={{background:"rgb(58,58,58)",border:"none",padding:10+"px",borderRadius:5+"px"}} onClick={()=>{
                setOptions([...options,("Option "+ (options.length+1))])
            }}>Add More</button>
            <button onClick={(e)=>{createPoll(e)}} type='submit'>Create</button>
          
        </form>
        )}

        {done && (
            <div className='container'>
            <h1>Poll Created!</h1>
            <h2>Id : {id}</h2>
            <h3>Or</h3>
            <h2>Click -- <a href={"/poll/"+id}>To poll</a></h2>
            </div>
        )}
    </>
  )
}
