require('dotenv').config()
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

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        //console.log('400: name missing')
        return res.status(400).json({ error: 'name missing' })
    }
    else if (!body.number) {
        //console.log('400: number missing')
        return res.status(400).json({ error: 'number missing' })
    }
    /**else if (phonebook.find(person => person.name === body.name)) {
        //console.log(`400: ${body.name} already in phonebook`)
        return res.status(400).json({error: 'name must be unique'})
    }**/

    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId()
    })

    //phonebook = phonebook.concat(person)
    person.save().then(response=>{
        console.log(`added ${body.name} number ${body.number} to phonebook`)
    })
    
    //console.log(`Adding: ${person.name}`)

    res.json(person)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(result =>{
       res.json(result.map(person => person.toJSON()))
    })

    //console.log('API/persons: get all')
})

app.get('/info', (req, res) => {
    const datetime = new Date()
    res.send(`<p>Phonebook has info for ${phonebook.length}<br />${datetime}</p>`)

    //console.log(`Info: ${phonebook.length} ${datetime}`)
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            if(person){
                res.json(person.toJSON())
            } else {
               res.status(404).end()
            }
            
            //res.json(person.toJSON())
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({error: 'delete error'})
        })
        
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

    next(error)
}

app.use(errorHandler)

const port = process.env.PORT
app.listen(port)
console.log(`Server running on port ${port}`)