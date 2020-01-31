import React from 'react'

const Anecdote = ({anec, handleClick}) => {
    return (
        <>
            <div>{anec.content}</div>
            <div>has {anec.votes}<button onClick={handleClick}>vote</button></div>
        </>
    )
}

export default Anecdote