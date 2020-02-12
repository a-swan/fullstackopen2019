const notificationReducer = (state = '', action) => {
    console.log('notification now: ', state)
    console.log('action: ', action)

    switch(action.type){
        case 'NOTIFY':
            return `You voted for '${action.data}'`
        case 'RESET_NOTIFY':
            return action.data
        default:
            return state
    }
}

export const showNotification = (message) => {
    console.log('message', message)
    return {
        type: 'NOTIFY',
        data: message.content
    }
}

export const clearNotification = () => {
    return {
        type: 'RESET_NOTIFY',
        data: '',
    }
}

export const showNotificationWithTimeout = (message, time) => {
    return dispatch => {
        dispatch(showNotification(message))

        // const timeout = time * 1000

        setTimeout(() => {
            dispatch(clearNotification())
        }, time)
    }
}

export default notificationReducer