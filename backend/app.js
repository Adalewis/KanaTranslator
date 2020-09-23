const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require('./models/post');
const Card = require('./models/card');
const app = express();
//express app is for middleware

mongoose.connect("mongodb+srv://adam:a6YTl34ZujlLUIF9@cluster0-ibtdm.mongodb.net/test?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed')
  });
//bodyparser extracts request data by parsing json
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
//req.body new field added by bodyparser
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  //save() method provided by mongoose packaged
  //saves document to database in collection called posts
  post.save().then(result => {
    //sends the _id along with a message
    res.status(201).json({
      message: 'Post added successfully',
      postId: result._id
    });
  });

});

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
//find() mongoose method will find all entries
//response must be within the then() so function will wait
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});
//dynamically passed path for deletion :id
app.delete("/api/posts/:id", (req, res, next) => {
  //params is property managed by express.js, :id is the only encoded param
  //Post from post model and mongoose api query deleteOne()
  Post.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({message: 'Post deleted!'});
    });
});
module.exports = app;
