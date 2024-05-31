import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Poll() {
  const { id } = useParams();
  const [poll, setPoll] = useState({});
  // const [timeup, setTimeup] = useState(false);
  const [optionSelected, setOptionSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const address = "https://react-polling-app-server.vercel.app/";

  const startTimer = () => {
    let time = 10;
    let timer = setInterval(() => {
      time--;
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (time < 1) {
        
        console.log("Selecting option automatically..", optionSelected);
        submitPoll();
      }
      if (time <= 0) {
        clearInterval(timer);
      }
      document.querySelector(".timer h2").innerText = `${minutes}:${seconds}`;
    }, 1000);

    return timer;
  };

  const getPoll = () => {
    //make the fetch request
    setLoading(true);
    setMsg("Loading..");
    fetch(address + "poll/" + id, {
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
        setOptionSelected(poll.options[0][0]);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //fetch the pole with the given id from the server using useEffect
  useEffect(() => {
    getPoll();

    const timer = startTimer();

    return () => {
      clearInterval(timer);
    };
    console.log(poll);
  }, []);

  //now that the poll is displayed, we need to submit it to the server.
  const submitPoll = () => {
    //get the vote, create a endpoint to submit.
    setLoading(true);
    setMsg("Submitting the poll..");
    fetch(address + "submit/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ option: optionSelected }),
    }).then((res) => {
      if (res.ok) {
        alert("Poll Submitted Successfully");
        // clearInterval(timer);
        setLoading(false);
        navigate("/");
      } else {
        alert("error submitting the poll. Please try again.");
      }
    });
  };
  return (
    <>
      <div className="container-poll">
        {loading && <h1>{msg}</h1>}
        {poll && !loading && (
          <>
            <h1 className="question" style={{ textAlign: "center" }}>
              {poll.question}
            </h1>
            <div className="options">
              {poll.options &&
                poll.options.map((option, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name="option"
                      className="radiobox"
                      value={option[0]}
                      onChange={() => {
                        setOptionSelected(option[0]);
                        // console.log(option[0]);
                      }}
                    />
                    <div className="option">{option[0]}</div>
                  </label>
                ))}
            </div>
            <button
              onClick={() => {
                submitPoll();
              }}
            >
              Submit
            </button>
            <div className="timer">
              <h1>Time Left</h1>
              <h2></h2>
            </div>
          </>
        )}
      </div>
    </>
  );
}
