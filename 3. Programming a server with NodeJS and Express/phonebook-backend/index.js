require('dotenv').config({path: '.env'})
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/persons')

app.use(bodyParser.json())

morgan.token('content', (req,res) => {
    return JSON.stringify(req.body)
})

var loggerFormat = ':method :date[web] :status :res[content-length] - :response-time ms :content'

app.use(morgan(loggerFormat))
app.use(cors())
app.use(express.static('build'))

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')

    //console.log('Root Directory: Hello World')
})

const generateId = () => {
    return Math.floor(Math.random() * Math.floor(1000000000000000))
}

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId()
    })

    person.save()
        .then(savedPerson => {
            console.log(`added ${body.name} number ${body.number} to phonebook`)
            res.json(savedPerson.toJSON())
        })
        .catch(error => next(error))

})

app.put('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndUpdate(req.params.id, {number: req.body.number}, {new: true})
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(result =>{
       res.json(result.map(person => person.toJSON()))
    })

    //console.log('API/persons: get all')
})

app.get('/info', (req, res) => {
    Person.estimatedDocumentCount((err, count) => {
        if(err) {
            return next(err)
        }
        res.send(`<p>Phonebook has info for ${count}<br />${new Date()}</p>`)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if(person){
                res.json(person.toJSON())
            } else {
               res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
        
    //console.log(`Deleted: ${id}`)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: "unknown endpoint"})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if(error.name === 'CastError' && error.kind === 'ObjectId'){
        return response.status(400).send({error: 'malformatted id'})
    }
    else if(error.name === 'ValidationError') {
        return response.status(400).send({error: error.message})
    }

    next(error)
}

app.use(errorHandler)

const port = process.env.PORT
app.listen(port)
console.log(`Server running on port ${port}`)