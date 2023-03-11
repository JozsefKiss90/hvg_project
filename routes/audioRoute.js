const express = require('express')
const router = express.Router() 

const AudioModel = require('../models/audio.model')

router.get('/', (req,res)=>{
  AudioModel.find()
  .then(posts => res.json(posts)) 
})


router.get('/:id', async (req, res) => {
  try {
    const audio = await AudioModel.findById(req.params.id);
    if (!audio) {
      return res.status(404).send('Audio file not found');
    }
    res.set('Content-Type', 'audio/mp3');
    res.send(audio.audio);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting audio file');
  } 
});

module.exports = router