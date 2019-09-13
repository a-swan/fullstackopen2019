import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const AnecdoteContent = ({ anecdote, votes }) => (
    <p>
        {anecdote}<br />
        has {votes} votes
    </p>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [anecVotes, setAnecVotes] = useState(new Array(anecdotes.length).fill(0))
    const [top, setTop] = useState(0)

    console.log(anecVotes)

    const handleRandomClick = () => {
        let rand = Math.floor(Math.random() * anecdotes.length)

        console.log(anecdotes.length, rand)

        setSelected(rand)
    }

    const handleVoteClick = () => {
        console.log("inside vote handler", anecVotes)

        const copy = [...anecVotes]

        console.log("copy", copy)

        copy[selected] += 1

        if (copy[selected] > copy[top]) {
            setTop(selected)
        }

        setAnecVotes(copy)
    }

    return (
        <div>
            <Header title='Anecdote of the day' />
            <AnecdoteContent anecdote={props.anecdotes[selected]} votes={anecVotes[selected]} />
            <Button onClick={handleVoteClick} text="vote" />
            <Button onClick={handleRandomClick} text="next anecdote" />

            <Header title='Anecdote with the most votes' />
            <AnecdoteContent anecdote={props.anecdotes[top]} votes={anecVotes[top]} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

//const anecVotes = new Array(anecdotes.length).fill(0)

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)