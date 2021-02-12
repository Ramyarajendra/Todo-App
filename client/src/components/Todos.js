import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, Box, CardHeader, Chip, Grid, IconButton, Paper, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../actions/todoAction';

const useStyles = makeStyles(theme => ({
  root: {
    width:'100%',
    height: '100%',
    backgroundColor:'#ECEBFA'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 16,
    fontFamily: `'Open Sans', sans-serif`,
    fontStyle: 'oblique'
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: '#C6809B'
  },
  box:{
    fontSize : 18,
    fontFamily: `'Open Sans', sans-serif`,
    fontWeight: 'bold'
  },
  chip: {
    marginInline: 4
  }
}));

const Todos = ({todo}) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const onDelete = (id) => {
      if(window.confirm('Are you sure?')){
        dispatch(deleteTodo(id))
      }
    }

    return (
          <Grid key={todo.ID} item xs={12} md={6}>
              <Card className={classes.root} variant="outlined">
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          {todo.Todo[0]}
                        </Avatar>
                    }
                    action={
                      <>
                      <Tooltip title="Edit" aria-label="edit">
                        <Link to={`/edit/${todo.ID}`}> <IconButton><EditIcon /></IconButton></Link>   
                      </Tooltip>
                      <Tooltip title="Delete" aria-label="delete">
                         <IconButton onClick={() => onDelete(todo.ID)}><DeleteIcon/></IconButton> 
                      </Tooltip>
                      </>
                    }
                    title={<Box className={classes.box}>{todo.Todo}</Box>}
                    subheader={todo.CreatedDate !== '0001-01-01T00:00:00Z' && new Date(todo.CreatedDate).toDateString()}
                  />
                  <CardContent>
                      {todo.Priority && <Typography component='div' className={classes.title}  gutterBottom>
                        Priority: {todo.Priority}
                      </Typography>}
                      {todo.Projects && <Typography component='div' className={classes.title}  gutterBottom>
                        Projects: {todo.Projects.map((project)=>
                        <Chip key={project} className={classes.chip} label={project} variant='outlined' color='primary'/> )}
                      </Typography>}
                      {todo.Contexts && <Typography component='div' className={classes.title}  gutterBottom>
                        Contexts: {todo.Contexts.map((context)=> (
                          <Chip key={context} className={classes.chip} label={context} variant='outlined' color='secondary'/> 
                        ))}
                      </Typography>}
                      {todo.DueDate !== '0001-01-01T00:00:00Z' && <Typography className={classes.title} gutterBottom>
                        Due Date: {new Date(todo.DueDate).toDateString()}
                      </Typography>}
                      <Typography component='div' className={classes.title} gutterBottom>
                        <Box alignItems='center' display='flex'>Completed: {todo.Completed ? <DoneIcon style={{ color:'green'}} />  : <ClearIcon style={{ color:'red'}}/> }</Box>
                      </Typography>
                  </CardContent>
              </Card>
            </Grid>
    )
}

export default Todos
