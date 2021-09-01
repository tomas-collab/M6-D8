import express from 'express'
import q2m from 'query-to-mongo'

import commentBlog from './schema.js'

const commentRouter = express.Router()

bookRouter.get('/',async(req,res,next)=>{
    try {
        const query =q2m(req.query)
        const total = await commentBlog.countDocuments(query.criteria)
        const comment = await commentBlog.find(query.criteria, query)
    } catch (error) {
        
    }
})

export default commentRouter