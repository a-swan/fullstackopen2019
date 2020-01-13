const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')

    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog
        .find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json(blogs.map(b => b.toJSON()))

})
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const token = getTokenFrom(request)

    try{
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if(!token || !decodedToken.id){
            return response.status(401).json({error: "token missing or invalid"})
        }
        
        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            user: user._id,
            url: body.url,
            likes: body.likes === undefined ? 0 : body.likes
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog.toJSON())

    } catch(exception){
        next(exception)
    }    
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const token = getTokenFrom(request)

    try{
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if(!token || !decodedToken.id){
            return response.status(401).json({error: "token missing or invalid"})
        }

        const deletedBlog = await Blog.findById(request.params.id)
        if(deletedBlog){
            if(deletedBlog.user.toString() === decodedToken.id){
                console.log('authorized to delete')
                
                await Blog.findByIdAndRemove(request.params.id)
                const user = await User.findById(decodedToken.id)
                user.blogs = user.blogs.filter(b => b.toString() !== request.params.id)
                await user.save()

                return response.status(204).end()
            }
        }
        response.status(404).json({error: "blog id doesn't exist"})
    } catch(exception){
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes
    }

    try{
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
        response.json(updatedBlog.toJSON())
    } catch(exception){
        next(exception)
    }

})

module.exports = blogsRouter