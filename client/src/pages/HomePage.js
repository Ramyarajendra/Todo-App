import { Fab, Grid, makeStyles, Tooltip, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import TodoList from '../components/TodoList'
import AddIcon from '@material-ui/icons/Add';
import Modal from '../components/Modal';
import FilterTodo from '../components/FilterTodo';

const useStyles = makeStyles((theme) => ({
    absolute: {
      position: 'fixed',
      bottom: theme.spacing(5),
      right: theme.spacing(5),
      backgroundColor: '#7E5995'
    },
    overflow: {
      maxHeight: '90vh',
      overflow: 'auto'
    }
  }));
const HomePage = () => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

    return (
        <Grid container spacing={0}>
          <Grid item xs={3} className={classes.overflow}>
            <FilterTodo/>
          </Grid>
          <Grid item xs={9} className={classes.overflow}>
            <Tooltip title="Add" aria-label="add">
                <Fab onClick={handleClickOpen} className={classes.absolute}>
                    <AddIcon style={{ color:'#fff'}}/>
                </Fab>
            </Tooltip>
            <TodoList open={open} />                
            <Modal open={open} setOpen={setOpen}/>
          </Grid>
        </Grid>
    )
}

export default HomePage
