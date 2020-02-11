import React from 'react'
import {connect} from 'react-redux'
import anecdoteService from '../services/anecdotes'
import {createAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const addAnec = async (event) => {
        event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ''
        const newAnec = await anecdoteService.createNew(content)
        props.createAnecdote(newAnec)
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