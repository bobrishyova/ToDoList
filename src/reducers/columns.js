const columns = (state = [], action) => {
    switch (action.type) {
        case 'ADD_COLUMN':
            return [
                ...state,
                {
                    id: Date.now(),
                    name: action.name,
                    items: [],
                },
            ]
        default:
            return state
    }
}

export default columns
