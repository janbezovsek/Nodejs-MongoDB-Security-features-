const fs = require('fs')
const path = require('path')
const Post = require("../models/postModel")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/errors/appError")

const SAMPLE_POSTS = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../tests/data/posts.json')))



const getAllPosts = catchAsync (async (req, res,next) => {

    
        const posts = await Post.find()
        res.status(200).json({
            status: "succes",
            data:  posts,
        })
    
    
    
    
    
    
    //logic for writing to files on computer instead of database
    //res.status(200).json({
    //    status: "succes",
    //    data:  SAMPLE_POSTS,
    //})
})

const getPostById = catchAsync (async (req, res, next) => {

    
        const post = await Post.findById(req.params.id)
        
        if (!post) {
            return next(new AppError("Post doesn't exist", 404))
        }
        
        res.status(200).json({
            status: "succes",
            data:  post,
        })
    



    //logic for writing to files on computer instead of database
    /*
    //Converting string to integer value and get the post
    const id = req.params.id * 1
    const post = SAMPLE_POSTS.find(item => item.id === id)
    
    //Checking wheter the post exists or not
    if(!post) {
        return res.status(404).json({
            status: "fail",
            message: "Post not found"
        })
    }

    return res.status(200).json({
        status: "success",
        data: post
    })
        */
})


const createPost = catchAsync( async (req, res, next) => {

        const newPost = await Post.create(req.body)

        res.status(200).json({
            status: "succes",
            data:  newPost,
        })
    


    //logic for writing to files on computer instead of database
    /*
    //Creating a JSON object
    const newId = SAMPLE_POSTS[SAMPLE_POSTS.length - 1].id + 1

    const newPost = Object.assign({
        id: newId,
        title: req.body.title,
        content: req.body.content,
        createdAt: Date.now()
    })

    SAMPLE_POSTS.push(newPost)

    fs.writeFile(path.resolve(__dirname, '../../tests/data/posts.json'), JSON.stringify(SAMPLE_POSTS), ()=> {
        
        return res.status(200).json({
            status: "success",
            data: newPost
        })
    })
    */
})


const updatePost = catchAsync (async (req, res, next) => {



        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: "succes",
            data:  updatedPost,
        })




    //logic for writing to files on computer instead of database
    /*
    //Converting string to integer value and get the post
    const id = req.params.id * 1
    const post = SAMPLE_POSTS.find(item => item.id === id)
    
    //Checking wheter the post exists or not
    if(!post) {
        return res.status(404).json({
            status: "fail",
            message: "Post not found"
        })
    }

    const updatedPost = SAMPLE_POSTS.map(item => {
        if(item.id === id){
            return {
                ...item,
                title:req.body.title,
                content:req.body.content,
                createdAt: Date.now()
            }
        }

        return item
    })

    fs.writeFile(path.resolve(__dirname, '../../tests/data/posts.json'), JSON.stringify(updatedPost), ()=> {
        
        return res.status(200).json({
            status: "success",
            message: "Post is updated"
        })
    })
        */
})


const deletePost = catchAsync( async (req, res,next) => {



       const post = await Post.findByIdAndDelete(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!post) {
            return next(new AppError("Post doesn't exist", 404))
        }

        res.status(200).json({
            status: "succes",
            message:  "Post is deleted",
        })




    //logic for writing to files on computer instead of database
    /*
    //Converting string to integer value and get the post
    const id = req.params.id * 1
    const post = SAMPLE_POSTS.find(item => item.id === id)
    
    //Checking wheter the post exists or not
    if(!post) {
        return res.status(404).json({
            status: "fail",
            message: "Post not found"
        })
    }

    const updatedPost = SAMPLE_POSTS.map(item => {
        if(item.id !== id){
            return item
            
        }

        
    })

    fs.writeFile(path.resolve(__dirname, '../../tests/data/posts.json'), JSON.stringify(updatedPost), ()=> {
        
        return res.status(200).json({
            status: "success",
            message: "Post is deleted"
        })
    })
*/
})


module.exports = {getAllPosts, getPostById, createPost, updatePost, deletePost}