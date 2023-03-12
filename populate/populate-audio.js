const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const SummaryModel = require('../models/summaries.model');
const AudioModel = require('../models/audio.model');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');

// Set up the Text-to-Speech client
const client = new TextToSpeechClient({
  projectId: process.env.PROJECT_ID,
  keyFilename: path.join(__dirname, '../service_account.json'),
});

// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGO_ATLAS_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Synthesize speech from text and save audio file to database
const synthesizeAndSaveAudio = async (item) => {
  try {
    const request = {
      input: { text: item.summary },
      voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await client.synthesizeSpeech(request);
    const audio = new AudioModel({
      title: item.title,
      audio: response.audioContent,
    });

    await audio.save();
    console.log('Audio file saved to MongoDB');
  } catch (err) {
    console.error(err);
  }
};

// Find summaries from database and synthesize speech for each summary
SummaryModel.find({})
  .then(async (items) => {
    for (const item of items) {
      await synthesizeAndSaveAudio(item);
    }
  })
  .catch((err) => console.error(err));
