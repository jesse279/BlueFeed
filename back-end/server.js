const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27018/courgar', {
  useNewUrlParser: true
});

const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const chatSchema = new mongoose.Schema({
  author: String,
  message: String,
});

// Create a model for items in the museum.
const Chat = mongoose.model('Chat', chatSchema);

const scoreSchema = new mongoose.Schema({
  team1: String,
  team2: String,
  score1: Number,
  score2: Number,
});

// Create a model for items in the museum.
const Score = mongoose.model('Score', chatSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.post('/api/chats', async (req, res) => {
  const chat = new Chat({
    author: req.body.author,
    message: req.body.message,
  });
  try {
    await chat.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/chats', async (req, res) => {
  try {
    let chats = await Chat.find();
    res.send(chats);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/scores', async (req, res) => {
  const score = new Score({
    team1: req.body.team1,
    team2: req.body.team2,
  });
  try {
    await score.save();
    res.send(score);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/scores', async (req, res) => {
  try {
    let scores = await Score.find();
    res.send(scores);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
