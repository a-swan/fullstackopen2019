import React from 'react'
import {connect} from 'react-redux'
import Anecdote from './Anecdote'

import {vote} from '../reducers/anecdoteReducer'

const Anecdotes = (props) => {

    const sortAnecdotes = props.anecdotes.sort((a1, a2) => {
        return ((a1.votes < a2.votes) ? 1 : (a1.votes > a2.votes) ? -1 : 0)
    })
    

    return (
        <>
            <h2>Anecdotes</h2>
            {props.visibleAnecdotes.map(anec => 
                <Anecdote
                    key={anec.id}
                    anec={anec}
                    handleClick={() => props.vote(anec)}
                />
            )}
        </>
    )
}

const anecdotesToShow = ({anecdotes, filter}) => {
    return (filter.length > 0) ? anecdotes.filter(a => a.content.includes(filter)) : anecdotes
}

const mapStateToProps = (state) => {
    console.log(state)

    return{
        anecdotes: state.anecdotes,
        filter: state.filter,
        visibleAnecdotes: anecdotesToShow(state),
    }
}

const mapDispatchToProps = {
    vote,
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)

export default ConnectedAnecdotes