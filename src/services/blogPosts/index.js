import express from 'express'
import blogModel from './schema.js'
import createError from 'http-errors'
const blogPostsRouter = express.Router()

blogPostsRouter.route('/')
.get(async(req,res,next)=>{
    try {
        const blogs = await blogModel.find()
        res.send(blogs)
    } catch (error) {
        next(error)
    }
})
.post(async(req,res,next)=>{
    try {
        const newBlog = new blogModel(req.body)
        const {_id}= await newBlog.save()
        res.status(201).send({_id})
    } catch (error) {
        next(error)
    }
})
blogPostsRouter.route('/:blogId')
.get(async(req,res,next)=>{
    try {
        const blogId = req.params.blogId
        const blog = await blogModel.findById(blogId)
        if(blog){
            res.send(blog)
        }else{ next(createError(404, `blog with id ${blogId} not found!`))}
    } catch (error) {
        next(error)
    }
})
.put(async(req,res,next)=>{
    try {
        const blogId = req.params.blogId
        const modifiedBlog = await blogModel.findByIdAndUpdate(blogId,req.body,{
            new:true
        })
        if(modifiedBlog){
            res.send(modifiedBlog)
        }else{ next(createError(404, `blog with id ${blogId} not found!`))}
    } catch (error) {
        next(error)
    }
})
.delete(async(req,res,next)=>{
    try {
        const blogId = req.params.blogId
        const deltedBlog = await blogModel.findByIdAndDelete(blogId)
        if(deltedBlog){
            res.send(deltedBlog)
        }else{ next(createError(404, `blog with id ${blogId} not found!`))}
    } catch (error) {
        next(error)
    }
})


export default blogPostsRouter