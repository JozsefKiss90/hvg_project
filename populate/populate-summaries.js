const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const mongoose = require("mongoose");
const titles = require("./titles-hun.json");
const blogs = require("./blogs-hun.json");
const SummaryModel = require("../models/summaries.model");
const {Configuration, OpenAIApi} = require('openai')
const mongoUrl = process.env.MONGO_ATLAS_URL;

if (!mongoUrl) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1); 
}

const configuration =new Configuration({
    apiKey: process.env.OPEN_AI_KEY
}) 
const openai = new OpenAIApi(configuration)

const runPrompt = async (text) =>{
    const prompt = `Foglald össze röviden ezt a szöveget: ${text}`
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 3000,
        temperature: 0,
    })
    //console.log(response.data.choices[0].text)
    return response.data.choices[0].text;
} 

const populateSummaries = async () => {
    await SummaryModel.deleteMany({});
  
    const summaryPromises = blogs.map((blog, i) => {
      const title = titles[i];
      return runPrompt(blog).then(summary => ({ title, summary }));
    });
  
    const summaries = await Promise.all(summaryPromises);
  
    await SummaryModel.create(...summaries);
    console.log("Summaries created");
  };

const main = async () => {
    await mongoose.connect(mongoUrl);

    await populateSummaries();

    await mongoose.disconnect();
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});