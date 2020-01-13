const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./tests_helper')
const app = require('../app')

const api = supertest(app)

mongoose.set('useCreateIndex', true)

const User = require('../models/user')

describe('when there is only one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({username: 'root', password: 'secret'})
        await user.save()
    })

    test('creation succeeds with unique username', async () =>{
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'alex.swanson',
            name: 'Alex Swanson',
            password: 'realPassword'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails when redundant username', async () => {
        const usersAtStart = await helper.usersInDb()

        const redundantUser = {
            username: 'root',
            name: 'Groot',
            password: 'password111222333'
        }

        const result = await api
            .post('/api/users')
            .send(redundantUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails when username less than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const smallUser = {
            username: 'as',
            name: 'Alex Swanson',
            password: 'pass'
        }

        const result = await api
            .post('/api/users')
            .send(smallUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('shorter than the minimum allowed length')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails when password less than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const smallUser = {
            username: 'aswan',
            name: 'Alex Swanson',
            password: 'ps'
        }

        const result = await api
            .post('/api/users')
            .send(smallUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password must be 3 or more characters')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails when missing username', async () => {
        const usersAtStart = await helper.usersInDb()

        const missingUser = {
            name: 'Alex Swanson',
            password: 'password'
        }

        const result = await api
            .post('/api/users')
            .send(missingUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` is required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails when missing password', async () => {
        const usersAtStart = await helper.usersInDb()
        
        const missingPass = {
            username: 'aswan',
            name: 'Alex Swanson'
        }

        const result = await api
            .post('/api/users')
            .send(missingPass)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`password` is required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})