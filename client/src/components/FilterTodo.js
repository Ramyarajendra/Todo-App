import React, { useState } from 'react'
import { Box, Button, Grid, InputLabel, makeStyles, TextField, Typography } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch } from 'react-redux';
import { listTodos } from '../actions/todoAction'

const useStyles = makeStyles((theme) => ({
    box: {
       marginBlock: theme.spacing(2)
    }
}));

const FilterTodo = () => {
    const classes = useStyles()

    const dispatch = useDispatch()
    const [values, setValues] = useState({
        projects: [],
        context: [],
        priority: ''
    })
    const [dueBefore, setDueBefore] = useState(null)
    const [dueAfter, setDueAfter] = useState(null)

    const handleChange = prop => e => {
        var str = e.target.value.replace(/ +/g,"")
        setValues({ ...values, [prop]: str!== '' ? str.split(',') : [] })
    }
    const handleChangePriority = e => {
        setValues({ ...values, priority: e.target.value.toUpperCase() })
    }
    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    const onFilter = () => {
        console.log(dueBefore)
        dispatch(listTodos({...values, dueBefore: dueBefore ? formatDate(dueBefore) : null,
            dueAfter: dueAfter ? formatDate(dueAfter): null}))

    }
    const onReset = () => {
        setValues({ projects: [],
            context: [],
            priority: '' })
        setDueAfter(null)
        setDueBefore(null)
        dispatch(listTodos())
    }
 
    return (
        <Box px={2} py={1} my={1}>
            <Typography component='h5' variant='h5'>Filter</Typography>
            <Box className={classes.box}>
                <InputLabel className='label-margin'>Projects</InputLabel>
                <TextField
                    fullWidth
                    id="projects"
                    placeholder="Enter Projects"
                    variant='outlined'
                    value={values.projects}
                    onChange={handleChange('projects')}
                    helperText='(Enter comma(,) separated, ex: api,hiring)'
                />
            </Box>
            <Box className={classes.box}>
                <InputLabel className='label-margin'>Priority</InputLabel>
            
                <TextField 
                    fullWidth 
                    id="priority"
                    placeholder="Enter Priority"
                    value={values.priority}
                    onChange={handleChangePriority}
                    inputProps={{ maxLength: 1 }} 
                    helperText='(Enter a single letter, [A - Z])'
                    variant='outlined'
                />
            </Box>
            <Box className={classes.box}>
                <InputLabel className='label-margin'>Context</InputLabel>
                <TextField 
                    fullWidth 
                    id="context"  
                    placeholder="Enter Context" 
                    value={values.context}
                    onChange={handleChange('context')} 
                    variant='outlined'
                    helperText='(Enter comma(,) separated, ex: api,hiring)'
                />
            </Box>
            <Box className={classes.box}>
                <InputLabel>Due Before</InputLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                    fullWidth
                    margin="normal"
                    id="date-picker-dialog1"
                    autoOk={true}
                    format="MM/dd/yyyy"
                    value={dueBefore}
                    onChange={date => setDueBefore(date)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </MuiPickersUtilsProvider>
            </Box>
            <Box className={classes.box}>
                <InputLabel>Due After</InputLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                    fullWidth
                    margin="normal"
                    id="date-picker-dialog2"
                    autoOk={true}
                    format="MM/dd/yyyy"
                    value={dueAfter}
                    onChange={date => setDueAfter(date)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </MuiPickersUtilsProvider>
            </Box>
            <Grid container direction='row' justify='space-around'>
                <Button onClick={onFilter} variant='contained'>Filter</Button>
                <Button onClick={onReset} variant='contained'>Reset</Button>
            </Grid>
        </Box>
    )
}

export default FilterTodo
