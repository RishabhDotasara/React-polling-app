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

app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
});