import React from 'react'

const Person = ({ persons, handleDelete }) => {
    console.log('persons: ', persons)
    const listPersons = () => persons.map(person => <li key={person.name}>{person.name} {person.number} <button id={person.id} onClick={handleDelete}>delete</button></li>)

    return (
        <div>
            {listPersons()}
        </div>
    )
}

export default Person