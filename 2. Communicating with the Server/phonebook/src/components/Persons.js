import React from 'react'

const Persons = ({persons}) => {
    const listPersons = () => persons.map(person => <li key={person.name}>{person.name} {person.phone}</li>)

    return (
        <div>
            {listPersons()}
        </div>
    )
}

export default Persons