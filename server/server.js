const express = require('express')
require('dotenv').config()

const {Configuration, OpenAi, OpenAIApi} = require('openai')
const app = express()

app.use(express.json())

const configuration =new Configuration({
    apiKey: process.env.OPEN_AI_KEY
})
const openai = new OpenAIApi(configuration)

const runPrompt = async () =>{
    const prompt = "give back a shorter version of the following text: 'The Russo-Ukrainian War[c] is an ongoing international conflict between Russia, alongside Russian-backed separatists, and Ukraine, which began in February 2014.[d] Following Ukraine's Revolution of Dignity, Russia annexed Crimea from Ukraine and supported pro-Russian separatists fighting the Ukrainian military in the Donbas War. The first eight years of conflict also included naval incidents, cyberwarfare, and heightened political tensions. In February 2022, the conflict saw a major escalation as Russia launched a full-scale invasion of Ukraine. In early 2014, the Euromaidan protests led to the Revolution of Dignity and the ousting of Ukraine's pro-Russian president Viktor Yanukovych. Shortly after, pro-Russian unrest erupted in eastern and southern Ukraine. Simultaneously, unmarked Russian troops moved into Ukraine's Crimea and took over government buildings, strategic sites and infrastructure. Russia soon annexed Crimea after a highly-disputed referendum. In April 2014, armed pro-Russian separatists seized government buildings in Ukraine's eastern Donbas region and proclaimed the Donetsk People's Republic (DPR) and Luhansk People's Republic (LPR) as independent states, sparking the Donbas War. The separatists received considerable but covert support from Russia, and Ukrainian attempts to fully retake separatist-held areas were unsuccessful. Although Russia denied involvement, Russian troops took part in the fighting. In February 2015, Russia and Ukraine signed the Minsk II agreements in a bid to end the conflict, but the agreements were never fully implemented in the years that followed. The Donbas War settled into a violent but static conflict between Ukraine and Russian proxies, with many brief ceasefires but no lasting peace and few changes in territorial control.'"
    const prompt2 = "give back a shorter version of the following text:  The Ukrainian war, also known as the Russo-Ukrainian War, is an ongoing conflict that began in 2014 between Ukraine and Russia. The conflict has been ongoing for several years and has resulted in the deaths of thousands of people, displacement of millions, and significant political and economic consequences. The conflict started after protests in Ukraine led to the ousting of pro-Russian President Viktor Yanukovych. Russia subsequently annexed Crimea from Ukraine, which was met with condemnation from the international community. In response, a separatist movement emerged in eastern Ukraine with support from Russia, leading to a military conflict between Ukraine and the separatists. The conflict has had significant political and economic consequences for Ukraine and Russia, as well as for the broader region. The war has strained the relationship between Russia and the West, leading to economic sanctions and diplomatic tensions. Ukraine has also been severely impacted, with significant economic and social challenges resulting from the conflict, including the displacement of millions of people and the destruction of infrastructure and property. International organizations and governments have condemned Russia's actions and have imposed economic sanctions on Russia in response to the annexation of Crimea and support for separatists in eastern Ukraine. The conflict continues to have significant political and economic consequences, with no clear resolution in sight."
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt2,
        max_tokens: 3000,
        temperature: 0,
    })
    console.log(response.data.choices[0].text)
}

runPrompt()

const port = process.env.PORT || '5000'

app.listen(port, ()=>{console.log(`server started on ${port}`)})

