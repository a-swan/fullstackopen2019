import React, { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', phone: '040-123456' },
        { name: 'Ada Lovelace', phone: '39-44-5323523' },
        { name: 'Dan Abramov', phone: '12-43-234345' },
        { name: 'Mary Poppendieck', phone: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [showAll, setShowAll] = useState('')

    const addPerson = (event) => {
        event.preventDefault()

        //check if duplicate
        const duplicate = persons.reduce((dup, iter) => {
            console.log('newName in iter', iter.name === newName)

            if (iter.name === newName) {
                console.log('alert:', newName, ' is a duplicate in phonebook')
                window.alert(`${newName} is already in phonebook`)
                return true
            }
        }, false)

        console.log('duplicate = ', duplicate)

        //if not duplicate update state
        if (!duplicate) {
            const personObject = {
                name: newName,
                phone: newPhone
            }

            setPersons(persons.concat(personObject))
        }

        //refresh text field
        setNewName('')
    }

    const personsToShow = showAll === '' ? persons : persons.filter(person => person.name.toUpperCase().includes(showAll.toUpperCase()))

    const handleNewPerson = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNewPhone = (event) => {
        console.log(event.target.value)
        setNewPhone(event.target.value)
    }

    const handleFilter = (event) => {
        console.log(event.target.value)
        setShowAll(event.target.value)
    }

    const listPersons = () => personsToShow.map(person => <li key={person.name}>{person.name} {person.phone}</li>)

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filterValue={showAll} handleFilter={handleFilter} />

            <h2>Add a New User</h2>
            <PersonForm handleSubmit={addPerson} newName={newName} handeNewPerson={handleNewPerson} newPhone={newPhone} handleNewPhone={handleNewPhone} />

            

            <h2>Numbers</h2>
            <div>
                {listPersons()}
            </div>
    </div>
    )
}

export default App