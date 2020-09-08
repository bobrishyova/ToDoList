import { SET_COLUMN, SET_CURRENT_ITEM, SET_CURRENT_COLUMN } from '../actions/actionTypes'

const initialState = {
	columns: [],
	currentItem: {},
	currentColumn: {},
}

const toDoApp = (state = initialState, action) => {
	switch (action.type) {
		case SET_COLUMN:
			return {
				...state,
				columns: action.payload,
			}
		case SET_CURRENT_ITEM:
			return {
				...state,
				currentItem: action.payload,
			}
		case SET_CURRENT_COLUMN:
			return {
				...state,
				currentColumn: action.payload,
			}
		default:
			return state
	}
}

export default toDoApp
