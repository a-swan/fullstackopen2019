import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/Persons'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [showAll, setShowAll] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [notMessage, setNotMessage] = useState(null)
    useEffect(() => {
        console.log('effect')
        personService
            .getAll()
            .then(response => {
                console.log('promise fulfilled', response)
                setPersons(response.data)
            })
    }, [])
    console.log('render', persons.length, 'people')

    const addPerson = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            number: newPhone
        }

        //check if duplicate
        const duplicate = persons.reduce((dup, iter) => {
            console.log('newName in iter', iter.name === newName)

            if (iter.name === newName) {
                console.log('alert:', newName, ' is a duplicate in phonebook, replace number?')
                const replaceNumber = window.confirm(`${newName} is already in phonebook, replace the old number with new one?`)
                console.log("replace: ", replaceNumber)

                if (replaceNumber) {
                    personService
                        .update(iter.id, personObject)
                        .then(response => {
                            console.log("update response", response)
                            setPersons(persons.map(person => person.id === response.id ? response : person))
                        })
                        .catch(error => {
                            console.log(error)
                            setErrorMessage(`Information of ${newName} has already been deleted from the server`)
                            setTimeout(() => {
                                setErrorMessage(null)
                            }, 5000)
                        })
                }

                return true
            }
            return false
        }, false)

        console.log('duplicate = ', duplicate)

        //if not duplicate update state
        if (!duplicate) {
            personService
                .create(personObject)
                .then(response => {
                    console.log("add response", response)
                    setPersons(persons.concat(response.data))
                })
                setNotMessage(
                    `Added ${newName}`
                )
                setTimeout(() => {
                    setNotMessage(null)
                }, 5000)
        }

        //refresh text field
        setNewName('')
        setNewPhone('')
    }

    const deletePerson = (event) => {
        console.log('delete ', event.target.id)

        const deletedID = event.target.id

        personService
            .remove(deletedID)
            .then(response => {
                console.log("removed", response.data)
                setPersons(persons.filter(person => person.id !== deletedID))
            })
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

            <Notification message={notMessage} />
            <ErrorMessage message={errorMessage} />

            <h2>Add a New User</h2>
            <PersonForm handleSubmit={addPerson} newName={newName} handleNewPerson={handleNewPerson} newPhone={newPhone} handleNewPhone={handleNewPhone} />

            <h2>Numbers</h2>
            <Person persons={personsToShow} handleDelete={deletePerson} />
        </div>
    )
}

export default App