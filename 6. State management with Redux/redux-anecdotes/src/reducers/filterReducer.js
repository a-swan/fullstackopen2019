const initialFilter = ''

const filterReducer = (state = initialFilter, action) => {
    console.log(state, action)
    switch(action.type){
        case 'FILTER':
            return action.filter
        default:
            return state
    }
}

export const filterAnec = (filter) => {
    return{
        type: 'FILTER',
        filter: filter
    }
}

export default filterReducer