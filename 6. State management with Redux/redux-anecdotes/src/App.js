import React from 'react';
import { createStore } from 'redux'
import reducer from './reducers/anecdoteReducer'
import Anecdotes from './components/Anecdotes'

const store = createStore(reducer)

const App = (props) => {
  return (
    <div>
      <Anecdotes store={props.store}/>
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App