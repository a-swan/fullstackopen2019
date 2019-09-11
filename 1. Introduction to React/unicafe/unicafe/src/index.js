import React, { useState } from 'react';
import ReactDOM from 'react-dom'

const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Stat = ({ text, value }) => (
    <tr>
        <td>
            {text}
        </td>
        <td>
            {value}
        </td>
    </tr>
)

const Stats = ({ good, neutral, bad }) => {
    const all = good + neutral + bad
    const ave = (good - bad) / all
    const pos = (good / all)*100+"%"

    if (all === 0) {
        return (
            <p>
                No feedback given
            </p>
        )
    }

    return (
        <table>
            <tbody>
                <Stat text="good" value={good} />
                <Stat text="neutral" value={neutral} />
                <Stat text="bad" value={bad} />
                <Stat text="all" value={all} />
                <Stat text="average" value={ave} />
                <Stat text="positive" value={pos} />
            </tbody>
        </table>
    )
}

const App = () => {
    //save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    //headers
    const titles = ['give feedback', 'statistics']
    const tags = ['good', 'neutral', 'bad', 'all', 'average', 'positive']

    //click handlers
    const handleGoodClick = () => {
        setGood(good + 1)
    }
    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }
    const handleBadClick = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <Header title={titles[0]} />
            <Button onClick={handleGoodClick} text='good' />
            <Button onClick={handleNeutralClick} text='neutral' />
            <Button onClick={handleBadClick} text='bad' />

            <Header title={titles[1]} />
            <Stats tags={tags} good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
