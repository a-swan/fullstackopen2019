const mongoose = require('mongoose')

console.log(process.argv)
//console.log('no of argv', process.argv.length)

if(process.argv.length<3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@cluster0-avimq.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
    id: Number,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 5){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        id: Math.floor(Math.random() * Math.floor(1000000000000000)),
    })

    person.save().then(response => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
        process.exit(1)
    })
}
else{
    //console.log('argv === 3')
    Person.find({}).then(result =>{
        console.log('phonebook:')
        result.forEach(person =>{
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}