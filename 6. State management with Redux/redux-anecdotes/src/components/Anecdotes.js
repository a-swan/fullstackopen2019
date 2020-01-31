import React from 'react'
import Anecdote from './Anecdote'

import {vote} from '../reducers/anecdoteReducer'

const Anecdotes = ({store}) => {
    return (
        <>
            <h2>Anecdotes</h2>
            {store.getState().map(anec => 
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