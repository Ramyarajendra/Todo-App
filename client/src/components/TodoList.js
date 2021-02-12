import { Container, Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listTodos } from '../actions/todoAction';
import { TODO_RESET } from '../actions/types';
import Todos from './Todos'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: '15px 0px'
    }
  }));

const TodoList = ({ open }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { todos } = useSelector(state => state.todoReducer)

    const { deleted } = useSelector(state => state.todoReducer)

    useEffect(()=> {
        if(!deleted){
            dispatch(listTodos())
        } else {
            dispatch({ type: TODO_RESET })
        }
    }, [dispatch, open, deleted])

    return (
        <div className={classes.margin}>
            <Container>
                <Grid container spacing={2}>
                    {todos && todos.map((todo) => (
                        <Todos  key={todo.ID} todo={todo}/>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}

export default TodoList
