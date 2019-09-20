import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [showAll, setShowAll] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled', response)
                setPersons(response.data)
            })
    }, [])
    console.log('render', persons.length, 'people')

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
            return false
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


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filterValue={showAll} handleFilter={handleFilter} />

            <h2>Add a New User</h2>
            <PersonForm handleSubmit={addPerson} newName={newName} handleNewPerson={handleNewPerson} newPhone={newPhone} handleNewPhone={handleNewPhone} />

            <h2>Numbers</h2>
            <Persons persons={personsToShow} />
        </div>
    )
}

export default App