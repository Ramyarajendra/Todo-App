import React, { useEffect, useState } from 'react'
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Box, Button, Checkbox, Container, FormControlLabel, FormHelperText, InputLabel, makeStyles, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getTodo, updateTodo } from '../actions/todoAction';
import { TODO_RESET } from '../actions/types';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    box: {
       marginBlock: theme.spacing(2)
    },
    typography: {
        marginBlock: theme.spacing(2)
    }
  }));

const EditPage = ({match, history}) => {
    const classes = useStyles()

    const id = Number(match.params.id)
    const dispatch = useDispatch()
    
    const todoReducer = useSelector(state => state.todoReducer)
    const {todo, success} = todoReducer

   

    const [todoName, setTodoName] = useState('')
    const [priority, setPriority] = useState('')
    const [projects, setProjects] = useState([])
    const [contexts, setContexts] = useState([])
    const [dueDate, setDueDate] = useState(null)
    const [completed, setCompleted] = useState(false)

    useEffect(() => {
        if(success){
            dispatch({ type: TODO_RESET })
            history.push('/')
        } else {
            if(!todo.Todo || todo.ID !== id){
                dispatch(getTodo(id))
            } else {
                setTodoName(todo.Todo)
                todo.Priority && setPriority(todo.Priority)
                todo.Projects && setProjects(todo.Projects)
                todo.Contexts && setContexts(todo.Contexts)
                todo.Completed && setCompleted(todo.Completed)
                todo.DueDate !== '0001-01-01T00:00:00Z' && setDueDate(todo.DueDate)
            }
        }
    }, [dispatch, id, todo, history, success])

    const onHandleChange = (e) => {
        var str = e.target.value.replace(/ +/g,"")
        if(e.target.id === 'projects'){
            setProjects(str.split(','))
        }else {
            setContexts(str.split(','))
        }
    }

    const onUpdate = (e) => {
        e.preventDefault()
        dispatch(updateTodo(id, {
            Todo: todoName,
            Priority: priority,
            Projects: projects,
            Contexts: contexts,
            DueDate: dueDate,
            Completed : completed
        }))
    }

    return (
        <div style={{margin: '15px 0'}}>
            <Container>
                <Link to='/' className='link-style'>
                    <Button  variant='outlined' color="primary">
                        Go Back
                    </Button>
                </Link>
                <Typography className={classes.typography} variant='h5'>Edit Todo</Typography>
                <form onSubmit={onUpdate}>
                    <Box className={classes.box}>
                        <InputLabel className='label-margin'>Todo</InputLabel>
                        <TextField 
                            fullWidth 
                            id="todo"  
                            placeholder="Enter Todo" 
                            value={todoName} 
                            onChange={(e) => setTodoName(e.target.value)} 
                            variant='outlined'
                            required
                        />
                    </Box>
                    <Box className={classes.box}>
                        <InputLabel className='label-margin'>Priority</InputLabel>
                    
                        <TextField 
                            fullWidth 
                            id="priority"
                            placeholder="Enter Priority"
                            value={priority} 
                            onChange={(e) => setPriority(e.target.value.toUpperCase())} 
                            inputProps={{ maxLength: 1}}
                            helperText='(Enter a single letter, [A - Z])'
                            variant='outlined'
                        />
                    </Box>
                    <Box className={classes.box}>
                        <InputLabel className='label-margin'>Projects</InputLabel>
                        <TextField
                            fullWidth
                            id="projects"
                            placeholder="Enter Projects"
                            variant='outlined'
                            value={projects}
                            onChange={onHandleChange}
                            helperText='(Enter comma(,) separated, ex: api,hiring)'
                        />
                    </Box>
                    <Box className={classes.box}>
                        <InputLabel className='label-margin'>Contexts</InputLabel>
                        <TextField 
                            fullWidth
                            id="contexts"
                            placeholder="Enter Contexts"
                            variant='outlined'
                            value={contexts}
                            onChange={onHandleChange}
                            helperText='(Enter comma(,) separated, ex: api,hiring)'
                        />
                    </Box>
                    <Box className={classes.box}>
                        <InputLabel>Due Date</InputLabel>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            autoOk={true}
                            format="MM/dd/yyyy"
                            value={dueDate}
                            onChange={date => setDueDate(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                        </MuiPickersUtilsProvider>
                    </Box>
                    <Box className={classes.box} >
                        <FormControlLabel
                            control={<Checkbox checked={completed} 
                            onChange={() => setCompleted(!completed)} 
                            name="completed" />}
                            label="Completed?"
                        />
                        <FormHelperText>(Check the box if completed)</FormHelperText>
                    </Box>
                    <Button type='submit' variant='outlined' color="primary" autoFocus>
                        Update
                    </Button>
                </form>
            </Container>
        </div>
    )
}

export default EditPage
