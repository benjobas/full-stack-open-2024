const successNotification = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    border_style: 'solid',
    padding: 10
}

const errorNotification = {
    color: 'red',
    background: 'lightgrey',
    font_size: 20,
    border_style: 'solid',
    padding: 10
}

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    if (message.includes('Error')) {
        return (
            <div style={errorNotification}>
                {message}
            </div>
        )
    } else {
        return (
            <div style={successNotification}>
                {message}
            </div>
        )
    }
}

export default Notification