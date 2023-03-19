const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const SummaryModel = require('../models/summaries.model');
const AudioModel = require('../models/audio.model');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');

const client = new TextToSpeechClient({
  projectId: process.env.PROJECT_ID,
  keyFilename: path.join(__dirname, '../service_account.json'),
});

mongoose.connect(process.env.MONGO_ATLAS_URL)
  .then(async () => {
    console.log('MongoDB connected');
    await AudioModel.deleteMany();
    await SummaryModel.find({})
      .then(async (items) => {
        for (const item of items) {
          await synthesizeAndSaveAudio(item);
        }
      })
      .catch((err) => console.error(err));
    mongoose.disconnect();
  })
  .catch((err) => console.error(err));

const synthesizeAndSaveAudio = async (item) => {
  try {
    const request = {
      input: { text: item.summary },
      voice: { languageCode: 'hu-HU', ssmlGender: 'FEMALE' },
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
