import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import {Provider} from 'react-redux'
import anecdoteReducer, {initializeAnecdotes} from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from './services/anecdotes'

const reducer = combineReducers({
  notification: notificationReducer,
  anecdotes: anecdoteReducer,
  filter: filterReducer
})

const store = createStore(reducer)

anecdoteService.getAll().then(anecs => 
  store.dispatch(initializeAnecdotes(anecs))
)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App store={store} />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)