export const updateChoice = choice => {
    return {
        type: 'UPDATE_CHOICE',
        choice,
    }
}

export const updateMessage = message => {
    return {
        type: 'UPDATE_MESSAGE',
        message,
    }
}