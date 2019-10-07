const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let phonebook = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')

    console.log('Root Directory: Hello World')
})

const generateId = () => {
    return Math.floor(Math.random() * Math.floor(1000000000000000))
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        console.log('400: name missing')
        return res.status(400).json({ error: 'name missing' })
    }
    else if (!body.number) {
        console.log('400: number missing')
        return res.status(400).json({ error: 'number missing' })
    }
    else if (phonebook.find(person => person.name === body.name)) {
        console.log(`400: ${body.name} already in phonebook`)
        return res.status(400).json({error: 'name must be unique'})
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    phonebook = phonebook.concat(person)

    console.log(`Adding: ${person.name}`)

    res.json(person)
})

app.get('/api/persons', (req, res) => {
    res.json(phonebook)

    console.log('API/persons: get all')
})

app.get('/info', (req, res) => {
    const datetime = new Date()
    res.send(`<p>Phonebook has info for ${phonebook.length}<br />${datetime}</p>`)

    console.log(`Info: ${phonebook.length} ${datetime}`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = phonebook.find(person => person.id === id)

    if (person) {
        res.json(person)

        console.log(`Get: ${id}`)
    }
    else {
        res.status(404).end()

        console.log(`404: ${id}`)
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    phonebook = phonebook.filter(person => person.id !== id)

    res.status(204).end()

    console.log(`Deleted: ${id}`)
})



const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)