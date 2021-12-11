import React from 'react';
import Grid from '@mui/material/Grid';
import { LinearProgress } from '@mui/material';
import { parseRawBalance } from '../utils';
 
export default ({
  balanceStaked,
  threshold
}) => {
  const displayBalance = parseRawBalance(balanceStaked);
  const displayThreshold = parseRawBalance(threshold);
  const percentStaked = (+displayBalance / +displayThreshold) * 100;
  return (
    <Grid style={{height: '20vh'}} container justifyContent="center" alignContent="center">
      <Grid item xs={10} container justifyContent="flex-end">
        <Grid style={{textAlign: 'right'}} item xs={2}>{displayBalance}/{displayThreshold} ETH</Grid>
      </Grid>
      <Grid item xs={10}>
        <LinearProgress value={percentStaked > 100 ? 100 : percentStaked} variant="determinate" style={{height: 30}}/>
      </Grid>
    </Grid>
  );
}