import { parseRawBalance } from '../utils';
import React from 'react';
import Address from './Address';
import Grid from '@mui/material/Grid';
import { Typography } from 'antd';
  

export default ({
  stakeEvents = []
}) => {
  return (
    stakeEvents.map(event => (
      <Grid container item xs={12} justifyContent="center" >
        <Address
          address={event.args[0]}
        />
        <Typography style={{color: 'green'}}>+ {parseRawBalance(event.args[1])} ETH</Typography>
    </Grid>
    ))
  )
}