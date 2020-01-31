import React from 'react'

import {createAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const addAnec = (event) => {
        event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ''
        props.store.dispatch(createAnecdote(content))
    }
    
    return(
        <>
            <h2>create new</h2>
            <form onSubmit={addAnec}>
                <div><input type="text" name="anec"/></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm