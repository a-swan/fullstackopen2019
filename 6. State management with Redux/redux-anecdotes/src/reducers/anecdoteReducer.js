const anecdotesAtStart = [
  // 'If it hurts, do it more often',
  // 'Adding manpower to a late software project makes it later!',
  // 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  // 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  // 'Premature optimization is the root of all evil.',
  // 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

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

export const initializeAnecdotes = (anecs) => {
  return{
    type: 'INIT_ANEC',
    data: anecs
  }
}

export const createAnecdote = (content) => {
  return{
    type: 'NEW_ANEC',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export default reducer