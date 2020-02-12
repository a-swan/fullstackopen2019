import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import Anecdotes from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import {initializeAnecdotes} from './reducers/anecdoteReducer'
import {clearNotification} from './reducers/notificationReducer'

const App = (props) => {
  useEffect(() => {
    props.initializeAnecdotes()
    props.clearNotification()
  }, [])

  return (
    <div>
      <Notification />
      <Filter />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, {initializeAnecdotes, clearNotification})(App)