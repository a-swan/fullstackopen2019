import React from 'react';
import Anecdotes from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = (props) => {
  return (
    <div>
      <Notification store={props.store}/>
      <Anecdotes store={props.store}/>
      <AnecdoteForm store={props.store}/>
    </div>
  )
}

export default App