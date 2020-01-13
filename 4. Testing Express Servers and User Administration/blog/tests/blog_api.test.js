const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./tests_helper')
const app = require('../app')

const api = supertest(app)

mongoose.set('useCreateIndex', true)

const Blog = require('../models/blog')

describe('when there are several blogs in db', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        // console.log('cleared')

        helper.initBlogs.forEach(async (blog) => {
            let blogObject = new Blog(blog)
            await blogObject.save()
            // console.log('saved')
        })
        
        // console.log('done')
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('variable id is defined', async () => {
        const response = await api.get('/api/blogs')

        console.log(response.body)

        response.body.map(blog => expect(blog.id).toBeDefined())
    })

    test('blog is created with POST', async () => {
        const newBlog = {
            title: "The Long, Lucrative Right-wing Grift Is Blowing Up in the World's Face",
            author: "Alex Pareene",
            url: "https://splinternews.com/the-long-lucrative-right-wing-grift-is-blowing-up-in-t-1793944216",
            likes: 8077
        }
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd.length).toBe(helper.initBlogs.length+1)
    })

    test('no likes', async () => {
        const newBlog = {
            title: "The Long, Lucrative Right-wing Grift Is Blowing Up in the World's Face",
            author: "Alex Pareene",
            url: "https://splinternews.com/the-long-lucrative-right-wing-grift-is-blowing-up-in-t-1793944216"
        }

        const addedBlog = await api
            .post('/api/blogs')
            .send(newBlog)
        
        expect(addedBlog.body.likes).toBe(0)
    })

    test('require title and url', async () => {
        const missingTitle = {
            author: "Alex Pareene",
            url: "https://splinternews.com/the-long-lucrative-right-wing-grift-is-blowing-up-in-t-1793944216",
            likes: 66037
        }

        const missingURL = {
            title: "The Long, Lucrative Right-wing Grift Is Blowing Up in the World's Face",
            author: "Alex Pareene",
            likes: 66037
        }

        await api
            .post('/api/blogs')
            .send(missingTitle)
            .expect(400)

        await api
            .post('/api/blogs')
            .send(missingURL)
            .expect(400)
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})