const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); 
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())  
const User = require("./Model/Post.model")

// home route 
app.get("/", (req, res) => {
      res.sendFile(__dirname + '/view/index.html')
})

app.get("/user", async(req, res)=>{
    const post = await User.find()
    res.status(200).json({message:"get user", post})
})

app.post('/user',async (req, res)=>{
      const newPost = await User({
              name : req.body.name,
              email : req.body.email,
              password : req.body.password
      })
      try {
             const post = await newPost.save()
             res.status(201).json({message :"POST DONE", post})
      } catch (error) {
            res.status(500).json({message :"error", error})
      }
})

app.put("/user/:id", async(req, res)=>{
        const updateUser = await User.findByIdAndUpdate(req.params.id ,{
              $set : req.body
        }, {new : true})
     res.status(200).json({message : "updataed", updateUser})
})

 
// error handler
app.use((req, res, next) => {
     res.send("page not found")
})
module.exports = app;