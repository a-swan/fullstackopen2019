const initialNotification = "render here notification..."

const notificationReducer = (state = initialNotification, action) => {
    console.log('notification now: ', state)
    console.log('action: ', action)

    return state
}

export default notificationReducer