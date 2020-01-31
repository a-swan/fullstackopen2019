import React from 'react'
import Anecdote from './Anecdote'

import {vote} from '../reducers/anecdoteReducer'

const Anecdotes = ({store}) => {
    const anecdotes = store.getState().sort((a1, a2) => {
        return ((a1.votes < a2.votes) ? 1 : (a1.votes > a2.votes) ? -1 : 0)
    })
    return (
        <>
            <h2>Anecdotes</h2>
            {anecdotes.map(anec => 
                <Anecdote
                    key={anec.id}
                    anec={anec}
                    handleClick={() => store.dispatch(vote(anec.id))}
                />
            )}
        </>
    )
}

export default Anecdotes