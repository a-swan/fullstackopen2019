import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import Anecdotes from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import {initializeAnecdotes} from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
    anecdoteService.getAll().then(
      anecs => props.initializeAnecdotes(anecs)
    )
  })

  return (
    <div>
      <Notification />
      <Filter />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, {initializeAnecdotes})(App)