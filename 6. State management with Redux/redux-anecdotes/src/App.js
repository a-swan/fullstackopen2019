import React from 'react';
import { createStore } from 'redux'
import reducer from './reducers/anecdoteReducer'
import Anecdotes from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'

const store = createStore(reducer)

const App = (props) => {
  return (
    <div>
      <Anecdotes store={props.store}/>
      <AnecdoteForm store={props.store}/>
    </div>
  )
}

export default App