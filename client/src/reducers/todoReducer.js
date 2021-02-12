import { CREATE_TODO, DELETE_TODO, GET_TODO, LIST_TODOS, TODO_RESET, UPDATE_TODO } from "../actions/types"

const initialState = {
    todos : [],
    todo:{},
    loading: false,
    error: null
}
export default (state = initialState, action) =>{
    switch (action.type) {
        case GET_TODO:
            return{
                ...state,
                todo: action.payload
            }
        
        case LIST_TODOS:
            return {
                ...state,
                todos: action.payload
            }
        
        case UPDATE_TODO:
        case CREATE_TODO:
            return {
                ...state,
                todo: action.payload,
                success: true
            }

        case DELETE_TODO:
            return {
                ...state,
                deleted: true
            }
        
        case TODO_RESET:
            return {
                ...state,
                todo: {},
                success: false,
                deleted: false
            }
        
        default:
            return state
            
    }
}