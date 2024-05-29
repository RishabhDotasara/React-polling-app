const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const PORT = 3000;

var polls = [
    // This is the format.
    // {
    //     id:"",
    //     question:"",
    //     options:[
    //         ["options",0],
    //         ["options",1]
    //     ]
    // }
]
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({msg:"Welcome to the Polling App"})
})

app.post("/create", (req, res) => {
    const {question, options, id} = req.body;
    const newOptions = options.map((option=>{
        return [option,0];
    }))

    polls.push({
        question:question,
        options:newOptions,
        id:id
    })
    res.status(200).json({msg:"Created the pole successfully."})
})

app.get("/poll/:id",(req,res)=>{
    const {id} = req.params;
    // filter the poll and send it to the frontend.
    const poll = polls.filter(poll => {
        if (id == poll.id)
            {
                return poll;
            }
    })
    console.log(id,poll)
    res.status(200).json({poll:poll})
})

app.post("/submit/:id",(req,res)=>{
    const {id} = req.params;
    const {option} = req.body;
    // find the poll and update the vote.
    polls = polls.map(poll => {
        if (poll.id == id)
            {
                poll.options = poll.options.map(pollOption => {
                    if (pollOption[0] == option)
                        {
                            pollOption[1] = pollOption[1] + 1;
                        }
                    return pollOption;
                })
            }
        return poll;
    })
    res.status(200).json({msg:"Submitted the vote successfully."})
})

// to get the poll result
app.get("/result/:id",(req,res)=>{
    const {id} = req.params;
    const poll = polls.filter(poll => {
        if (id == poll.id)
            {
                return poll;
            }
    })
    res.status(200).json({poll:poll})
})


app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
});