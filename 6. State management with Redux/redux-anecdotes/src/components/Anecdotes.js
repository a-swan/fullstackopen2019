import React from 'react'
import Anecdote from './Anecdote'

import {vote} from '../reducers/anecdoteReducer'

const Anecdotes = ({store}) => {
    const {anecdotes, filter} = store.getState()

    const sortAnecdotes = anecdotes.sort((a1, a2) => {
        return ((a1.votes < a2.votes) ? 1 : (a1.votes > a2.votes) ? -1 : 0)
    })

    const filterAnecdotes = () => {
        return (filter.length > 0) ? sortAnecdotes.filter(anec => anec.content.includes(filter)) : sortAnecdotes
    }

    return (
        <>
            <h2>Anecdotes</h2>
            {filterAnecdotes().map(anec => 
                <Anecdote
                    key={anec.id}
                    anec={anec}
                    handleClick={() => store.dispatch(vote(anec))}
                />
            )}
        </>
    )
}

export default Anecdotes