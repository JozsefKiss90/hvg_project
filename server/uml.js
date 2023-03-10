//create a plantuml flowchart based on this code
const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const { Configuration, OpenAi, OpenAIApi } = require('openai');

const app = express();
app.use(express.json());

const mongoUrl = process.env.MONGO_URL;
const projectId = process.env.PROJECT_ID;
const openaiKey = process.env.OPEN_AI_KEY;
const serviceAccountPath = process.env.SERVICE_ACCOUNT_PATH || './service_account.json';

if (!mongoUrl) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1); 
}

// MongoDB Schemas
const SummarySchema = new Schema({
    title : String,
    summary: String, 
});
const SummaryModel = mongoose.model('summary', SummarySchema);

const PostSchema = new Schema({
    name : String,
    text: String, 
});
const PostModel = mongoose.model('post', PostSchema);

const AudioSchema = new Schema({
    title : String,
    audio: Buffer, 
});
const AudioModel = mongoose.model('audio', AudioSchema);

// Routes
app.use('/posts', require('./routes/postRoute'));
app.use('/audio', require('./routes/audioRoute'));

// Connect to the MongoDB database
mongoose
    .connect(mongoUrl)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

// OpenAI configuration
const openaiConfiguration = new Configuration({ apiKey: openaiKey });
const openaiApi = new OpenAIApi(openaiConfiguration);

// Set up the Text-to-Speech client
const client = new TextToSpeechClient({
    projectId,
    keyFilename: serviceAccountPath,
});

// Populate the summaries collection with data from the blogs.json file
const populateSummaries = async () => {
    await SummaryModel.deleteMany({});
  
    const titles = require("./titles.json");
    const blogs = require("./blogs.json");
    const summaryPromises = blogs.map((blog, i) => {
        const title = titles[i];
        return generateSummary(blog).then(summary => ({ title, summary }));
    });
  
    const summaries = await Promise.all(summaryPromises);
  
    await SummaryModel.create(...summaries);
    console.log("Summaries created");
};

// Generate a summary of the input text using OpenAI's text-davinci-003 model
const generateSummary = async (text) => {
    const prompt = `give back a short summary of the following text: ${text}`
    const response = await openaiApi.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 3000,
        temperature: 0,
    });
    return response.data.choices[0].text;
};

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

SummaryModel.find({})
.then(async (items) => {
for (let item of items) {
await synthesizeAndSaveAudio(item);
}
})
.catch((err) => console.error(err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log('Server running on port ${PORT}');
});

// Export the app for testing
module.exports = app;