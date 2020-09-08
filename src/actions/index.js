import { SET_COLUMN, SET_CURRENT_ITEM, SET_CURRENT_COLUMN } from './actionTypes'

export const actionSetColumn = (payload) => ({
    type: SET_COLUMN,
    payload,
})

export const actionSetCurrentItem = (payload) => ({
    type: SET_CURRENT_ITEM,
    payload,
})

export const actionSetCurrentColumn = (payload) => ({
    type: SET_CURRENT_COLUMN,
    payload,
})