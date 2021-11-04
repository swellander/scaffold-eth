import React, { Component } from 'react';
import { LinearProgress } from '@mui/material';
 
export default () => {
  return (
    <LinearProgress value={45} variant="determinate" style={{height: 30}}/>
  );
}