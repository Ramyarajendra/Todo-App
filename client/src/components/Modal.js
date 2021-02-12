import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormHelperText, InputLabel, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns';
import { useDispatch } from 'react-redux';
import { createTodo } from '../actions/todoAction';
  

const useStyles = makeStyles((theme) => ({
    box: {
       marginBottom: theme.spacing(2)
    }
  }));
const Modal = ({open, setOpen}) => {
    const [todoName, setTodoName] = useState('')
    const [priority, setPriority] = useState('')
    const [projects, setProjects] = useState([])
    const [contexts, setContexts] = useState([])
    const [dueDate, setDueDate] = useState(null)
    const [completed, setCompleted] = useState(false )

    const dispatch = useDispatch()
    const classes = useStyles()

    const handleClose = () => {
        setOpen(false);
        setTodoName('')
        setPriority('')
        setProjects([])
        setContexts([])
        setDueDate(null)
        setCompleted(false)
      };

    const onSave = (e) => {
        e.preventDefault()
        dispatch(createTodo({
            Todo: todoName,
            Priority: priority,
            Projects: projects,
            Contexts: contexts,
            DueDate: dueDate,
            Completed : completed
        })).then(() => handleClose())
    }
    const onHandleChange = (e) => {
        var str = e.target.value.replace(/ +/g,"")
        if(e.target.id === 'projects'){
            setProjects(str.split(','))
        }else {
            setContexts(str.split(','))
        }
    }

    return (
        <div>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form onSubmit={onSave}>
                    <DialogTitle id="alert-dialog-title">{"Create Todo"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Box component='div' className={classes.box}>
                                <InputLabel>Todo</InputLabel>
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
                            <Box component='div' className={classes.box}>
                                <InputLabel>Priority</InputLabel>
                            
                                <TextField 
                                    fullWidth 
                                    id="priority"
                                    placeholder="Enter Priority"
                                    value={priority} 
                                    onChange={(e) => setPriority(e.target.value.toUpperCase())} 
                                    helperText='(Enter a single letter, [A - Z])'
                                    inputProps={{ maxLength: 1}}
                                    variant='outlined'
                                />
                            </Box>
                            <Box component='div' className={classes.box}>
                                <InputLabel>Projects</InputLabel>
                                <TextField
                                    fullWidth
                                    id="projects"
                                    placeholder="Enter Projects"
                                    variant='outlined'
                                    value={projects}
                                    onChange={(e) => onHandleChange(e)} 
                                    helperText='(Enter comma(,) separated, ex: api,hiring)'
                                />
                            </Box>
                            <Box component='div' className={classes.box}>
                                <InputLabel>Contexts</InputLabel>
                                <TextField 
                                    fullWidth
                                    id="contexts"
                                    placeholder="Enter Contexts"
                                    variant='outlined'
                                    value={contexts}
                                    onChange={(e) => onHandleChange(e)}
                                    helperText='(Enter comma(,) separated, ex: api,hiring)' 
                                />
                            </Box>
                            <Box component='div' className={classes.box}>
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
                            <Box component='div' className={classes.box} >
                                <FormControlLabel
                                    control={<Checkbox checked={completed} 
                                    onChange={() => setCompleted(!completed)} 
                                    name="completed" />}
                                    label="Completed?"
                                />
                                <FormHelperText>(Check the box if completed)</FormHelperText>
                            </Box>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant='outlined' color="primary">
                            Cancel
                        </Button>
                        <Button type='submit' variant='outlined' color="primary" autoFocus>
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default Modal
