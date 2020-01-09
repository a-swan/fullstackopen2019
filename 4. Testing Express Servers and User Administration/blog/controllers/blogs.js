const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(note => note.toJSON()))

})
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes
    })

    console.log('router: blog var', blog)

    // blog
    //     .save()
    //     .then(result => {
    //         response.status(201).json(result)
    //     })
    //     .catch(error => next(error))

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.toJSON())
})

module.exports = blogsRouter