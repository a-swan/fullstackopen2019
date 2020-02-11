import noteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'VOTE':
      const id = action.anec.id
      const anecToChange = state.find(a => a.id === id)
      // console.log(id, anecToChange)
      const changedAnec = {
        ...anecToChange,
        votes: anecToChange.votes + 1
      }
      // console.log("updated: ", changedAnec)
      const changedState = state.map(a => a.id !== id ? a : changedAnec)
      // console.log(changedState)
      return changedState
    case 'NEW_ANEC':
      return [...state, action.data]

    case 'INIT_ANEC':
      return action.data

    default:
      return state
  }
}

export const vote = (anec) => {
  return{
    type: 'VOTE',
    anec: anec
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecs = await noteService.getAll()
    dispatch({
      type: 'INIT_ANEC',
      data: anecs
    })
  }
}

export const createAnecdote = (data) => {
  return{
    type: 'NEW_ANEC',
    data
  }
}

export default reducer