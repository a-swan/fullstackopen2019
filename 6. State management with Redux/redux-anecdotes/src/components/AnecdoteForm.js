import React from 'react'
import {connect} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const addAnec = async (event) => {
        event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ''
        props.createAnecdote(content)
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

const mapDispatchToProps = {
    createAnecdote,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm