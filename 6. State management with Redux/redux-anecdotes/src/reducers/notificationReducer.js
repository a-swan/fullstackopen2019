const initialNotification = "render here notification..."

const notificationReducer = (state = initialNotification, action) => {
    console.log('notification now: ', state)
    console.log('action: ', action)

    switch(action.type){
        case 'VOTE':
            return `You voted for '${action.anec.content}'`
        default:
            return state
    }
}

export default notificationReducer