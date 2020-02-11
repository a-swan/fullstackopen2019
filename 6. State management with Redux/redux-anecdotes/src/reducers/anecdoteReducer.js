import noteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'VOTE':
      const id = action.data.id
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
  return async dispatch => {
    const updateAnec = {
      content: anec.content,
      id: anec.id,
      votes: anec.votes + 1,
    }

    const votedAnec = await noteService.update(anec.id, updateAnec)
    dispatch({
      type: 'VOTE',
      data: votedAnec
    })
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

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnec = await noteService.createNew(content)
    dispatch({
      type: 'NEW_ANEC',
      data: newAnec,
    })
  }
}

export default reducer