import React from 'react'

const PersonForm = (handleSubmit, newName, handleNewPerson, newPhone, handleNewPhone) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={newName} onChange={handleNewPerson} /><br />
                phone: <input value={newPhone} onChange={handleNewPhone} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm