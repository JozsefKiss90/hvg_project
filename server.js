const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const PostRoute = require('./routes/postRoute')
const AudioRoute = require('./routes/audioRoute')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())  

const connectToDb = async (dbName) => {
  try { 
      await mongoose.connect(process.env.MONGO_ATLAS_URL);
      console.log(`Connected to DB: ${dbName}`);
  } catch (error) {
      console.error(error.message);
  } 
} 
 
async function main() { 
    await connectToDb('summaries')
  }
 
main()

app.use('/api/posts', PostRoute)
app.use('/api/audio', AudioRoute)


const port = process.env.PORT || '5000'

const path = require("path");

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(port, ()=>{console.log(`server started on ${port}`)})

