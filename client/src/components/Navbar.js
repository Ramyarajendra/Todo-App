import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, CssBaseline, Divider, FormControlLabel, Grid, InputLabel, Menu, Radio, RadioGroup } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import { listTodos } from '../actions/todoAction';
import {useDispatch} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  color:{
    backgroundColor: '#3A2952'
  },
  grid:{
    marginInline: theme.spacing(1)
  },
  menu:{
    height: '110vh'
  }
}));

const Navbar = () => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState(null)
    const [sortArr, setSortArr] = useState([])

    const [values, setValues] = useState({
      idCheck: '',
      textCheck: '',
      priorityCheck: '',
      createdDateCheck: '',
      completedDateCheck: '',
      dueDateCheck: '',
      contextCheck: '',
      projectCheck: ''
    })
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleChangeRadio = prop => (e) => {
      setValues({...values, [prop]: e.target.value})
      
      if(sortArr.find(arr => arr.prop === prop)){
        setSortArr(sortArr.filter(arr => arr.prop === prop ?  arr.val = e.target.value  : arr))
      } else {
        sortArr.push({ prop, val: e.target.value })
      }
    }

    const onSort = () => {
      const arr = sortArr.map(m => m.val)
      dispatch(listTodos({ order: arr })).then(() => handleClose())
    }

    const onReset = () => {
      setValues({
        idCheck: '',
        textCheck: '',
        priorityCheck: '',
        createdDateCheck: '',
        completedDateCheck: '',
        dueDateCheck: '',
        contextCheck: '',
        projectCheck: ''
      })
      dispatch(listTodos())
      setSortArr([])
      handleClose()
    }

    const menuPopper = (
      <Menu
        id="simple-menu"
        className={classes.menu}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          <Grid className={classes.grid} container spacing={2} direction='row' justify='space-around' alignItems='center' >
            <Grid item xs={5}>
              <InputLabel>ID</InputLabel>
            </Grid>
            <Grid item xs={7}>
              <RadioGroup aria-label="idSort" name="id" value={values.idCheck} onChange={handleChangeRadio('idCheck')} >
                <FormControlLabel value="SortTaskIDAsc" control={<Radio />} label="Asc" />
                <FormControlLabel value="SortTaskIDDesc" control={<Radio />} label="Desc" />
              </RadioGroup>
            </Grid>
          </Grid>
          <Divider/>
          <Grid className={classes.grid} container spacing={2} direction='row' justify='space-around' alignItems='center' >
            <Grid item xs={5}>
              <InputLabel>Todo Text</InputLabel>
            </Grid>
            <Grid item xs={7}>
                <RadioGroup aria-label="textSort" value={values.textCheck} name="text" onChange={handleChangeRadio('textCheck')} >
                  <FormControlLabel value="SortTodoTextAsc" control={<Radio />} label="Asc" />
                  <FormControlLabel value="SortTodoTextDesc" control={<Radio />} label="Desc" />
                </RadioGroup>
            </Grid>
          </Grid>                  
          <Divider/>
          <Grid className={classes.grid} container spacing={2} direction='row' justify='space-around' alignItems='center' >
            <Grid item xs={5}>
              <InputLabel>Priority</InputLabel>
            </Grid>
            <Grid item xs={7}>
                <RadioGroup aria-label="prioritySort" value={values.priorityCheck} name="priority" onChange={handleChangeRadio('priorityCheck')} >
                  <FormControlLabel value="SortPriorityAsc" control={<Radio />} label="Asc" />
                  <FormControlLabel value="SortPriorityDesc" control={<Radio />} label="Desc" />
                </RadioGroup>
            </Grid>
          </Grid>
          <Divider/>
          <Grid className={classes.grid} container spacing={2} direction='row' justify='space-around' alignItems='center' >
            <Grid item xs={5}>
              <InputLabel>Created Date</InputLabel>
            </Grid>
            <Grid item xs={7}>
              <RadioGroup aria-label="CreatedDateSort" value={values.createdDateCheck} name="CreatedDate" onChange={handleChangeRadio('createdDateCheck')}  >
                <FormControlLabel value="SortCreatedDateAsc" control={<Radio />} label="Asc" />
                <FormControlLabel value="SortCreatedDateDesc" control={<Radio />} label="Desc" />
              </RadioGroup>
            </Grid>
          </Grid>
          <Divider/>
          <Grid className={classes.grid} container spacing={2} direction='row' justify='space-around' alignItems='center' >
            <Grid item xs={5}>
              <InputLabel>Completed Date</InputLabel>
            </Grid>
            <Grid item xs={7}>
              <RadioGroup aria-label="CompletedDateSort" value={values.completedDateCheck} name="CompletedDate" onChange={handleChangeRadio('completedDateCheck')} >
                <FormControlLabel value="SortCompletedDateAsc" control={<Radio />} label="Asc" />
                <FormControlLabel value="SortCompletedDateDesc" control={<Radio />} label="Desc" />
              </RadioGroup>
            </Grid>
          </Grid>
          <Divider/>
          <Grid className={classes.grid} container spacing={2} direction='row' justify='space-around' alignItems='center' >
            <Grid item xs={5}>
              <InputLabel>Due Date</InputLabel> 
            </Grid> 
            <Grid item xs={7}>
              <RadioGroup aria-label="DueDateSort" value={values.dueDateCheck} name="DueDate" onChange={handleChangeRadio('dueDateCheck')} >
                <FormControlLabel value="SortDueDateAsc" control={<Radio />} label="Asc" />
                <FormControlLabel value="SortDueDateDesc" control={<Radio />} label="Desc" />
              </RadioGroup>
            </Grid>
          </Grid>
          <Divider/>
          <Grid className={classes.grid} container spacing={2} direction='row' justify='space-around' alignItems='center' >
            <Grid item xs={5}>
              <InputLabel>Context</InputLabel>    
            </Grid>  
            <Grid item xs={7}>
              <RadioGroup aria-label="ContextSort" value={values.contextCheck} name="SortContext" onChange={handleChangeRadio('contextCheck')}>
                <FormControlLabel value="SortContextAsc" control={<Radio />} label="Asc" />
                <FormControlLabel value="SortContextDesc" control={<Radio />} label="Desc" />
              </RadioGroup>
            </Grid>
          </Grid>
          <Divider/>
          <Grid className={classes.grid} container spacing={2} direction='row' justify='space-around' alignItems='center' >
            <Grid item xs={5}>
              <InputLabel>Project</InputLabel>
            </Grid>
            <Grid item xs={7}>
              <RadioGroup aria-label="ProjectSort" value={values.projectCheck} name="Project" onChange={handleChangeRadio('projectCheck')} >
                <FormControlLabel value="SortProjectAsc" control={<Radio />} label="Asc" />
                <FormControlLabel value="SortProjectDesc" control={<Radio />} label="Desc" />
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid style={{ marginBlock: 10 }} container spacing={2} direction="row" justify="space-around" alignItems="center">
            <Button variant='contained' onClick={onSort}> Apply </Button>
            <Button variant='contained' onClick={onReset}> Reset </Button>
          </Grid>
      </Menu>
    )

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.color}>
              <CssBaseline/>
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    TodoList
                </Typography>
                <Button
                  color='inherit'
                  aria-controls="simple-menu" 
                  aria-haspopup="true" 
                  onClick={handleClick}
                  startIcon={<SortIcon />}
                >
                  Sort
                </Button>
                {menuPopper}
              </Toolbar>
            </AppBar>
      </div>
    )
}

export default Navbar
