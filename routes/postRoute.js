const express = require('express')
const router = express.Router()

const Posts = require('../models/posts.model')

router.get('/', async (req,res)=>{
   try {
    await Posts.find()
     .then(posts => res.json(posts)) 
   } catch (error) {
    
   }
 })

router.post('/', async (req,res)=>{

    const {name, text} = req.body
    const existingPost = await Posts.findOne({ name });
    if (existingPost) {
      res.send(`${name} already exists`);
    } else {
        const newPosts = new Posts({name, text}) 
        newPosts.save()
        .then(results=> res.json(results)) 
        .catch(err=>{console.log(err)})
    }
  })

module.exports = router