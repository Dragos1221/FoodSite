import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AcUnitIcon from '@material-ui/icons/AcUnit';

const navBar = ()=>{
    return (
    <AppBar position="static">
        <Toolbar variant="dense">
            <IconButton edge="start"  color="inherit" aria-label="menu">
                <AcUnitIcon />
            </IconButton>
             <Typography variant="h6" color="inherit">
                Photos
            </Typography>
        </Toolbar>
  </AppBar>)
};

export default navBar;