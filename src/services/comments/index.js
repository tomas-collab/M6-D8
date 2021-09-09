import express from 'express'
import q2m from 'query-to-mongo'
import createError from 'http-errors'

import commentBlog from './schema.js'

const commentRouter = express.Router()

commentRouter.get('/',async(req,res,next)=>{
    try {
        // const query =q2m(req.query)
        // const total = await commentBlog.countDocuments(query.criteria)
        const comment = await commentBlog.find()
        res.send(comment)
    } catch (error) {
        next(error)
    }
})
commentRouter.post('/',async(req,res,next)=>{
    try {
        const newComment = new commentBlog(req.body)
        const {_id}= await newComment.save()
        res.status(201).send({_id})
    } catch (error) {
        next(error)
    }
})


commentRouter.route('/:commentId')
.get(async(req,res,next)=>{
    try {
        const comment = await commentBlog.findById(req.params.commentId)
        res.send(comment)
    } catch (error) {
        
    }
}).put(async(req,res,next)=>{
    try {
        const commentId = req.params.commentId
        const modifiedComment = await commentBlog.findByIdAndUpdate(commentId,req.body,{
            new:true
        })
        if(modifiedComment){res.send(modifiedComment)}else{next(createError(404, `blog with id ${commentId} not found!`))}
    } catch (error) {
        
    }
}).delete(async(req,res,next)=>{
    try {
        const commentId = req.params.commentId
        const deletedComment = await commentBlog.findByIdAndDelete(commentId)
        if(deletedComment){
            res.send('deleted')
        }else{next(createError(404, `blog with id ${commentId} not found!`))}
    } catch (error) {
        
    }
})
export default commentRouter