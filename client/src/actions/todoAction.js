import axios from 'axios'
import { CREATE_TODO, DELETE_TODO, ERROR_TODO, GET_TODO, LIST_TODOS, UPDATE_TODO } from './types'

export const listTodos = (filter) => async dispatch => {
    try {
        if(filter){
            const config = {
                params: {
                    projects: filter.projects?.length !== 0 ? filter.projects: null,
                    priority: filter.priority !== '' ? filter.priority: null,
                    context: filter.context?.length !== 0 ? filter.context: null,
                    duebefore: filter.dueBefore,
                    dueafter: filter.dueAfter,
                    order: filter.order
                }
            }
            const { data } = await axios.get('/todos', { ...config })
            dispatch({
                type: LIST_TODOS,
                payload: data
            })
        } else {
            const { data } = await axios.get('/todos')
            dispatch({
                type: LIST_TODOS,
                payload: data
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR_TODO,
            payload: error.response
        })
    }
}
export const getTodo = (id) => async dispatch => {
    try {
        const {data} = await axios.get(`/todo/${id}`)
        dispatch({
            type: GET_TODO,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ERROR_TODO,
            payload: error.response
        })
    }
}
export const updateTodo = (id, updatedTodo) => async dispatch => {
    try {
        const {data} = await axios.put(`/todo/${id}`, updatedTodo)
        dispatch({
            type: UPDATE_TODO,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ERROR_TODO,
            payload: error.response
        })
    }
}
export const createTodo = (createdTodo) => async dispatch => {
    try {
        const {data} = await axios.post('/todo', createdTodo)
        dispatch({
            type: CREATE_TODO,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ERROR_TODO,
            payload: error.response
        })
    }
}

export const deleteTodo = (id) => async dispatch => {
    try {
        await axios.delete(`/todo/${id}`)
        dispatch({
            type: DELETE_TODO
        })
    } catch (error) {
        dispatch({
            type: ERROR_TODO,
            payload: error.response
        })
    }
}