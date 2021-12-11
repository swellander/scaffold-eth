import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getTimeLeftString } from '../utils';
import StakeMeter from './StakeMeter';
import Feed from './Feed';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import StakeDialog from './StakeDialog';

export default function({
  deadline,
  stake,
  address,
  faucetTx,
  balance,
  balanceStaked,
  totalStaked,
  threshold,
  execute,
  withdraw,
  stakeEvents
}) {
  const getEth = () => faucetTx({
    to: address,
    value: ethers.utils.parseEther("1"),
  })
  const [timeLeft, setTimeLeft] = useState()
  const [stakeDialogOpen, setStakeDialog] = useState(false)

  const updateTime = currentTimeMS => {
    const remainingMS = deadline?.toNumber() * 1000 - currentTimeMS ;
    const newTimeLeft = getTimeLeftString(remainingMS);
    setTimeLeft(newTimeLeft)
  }

  const runOncePerSecond = update => setTimeout(() => {
    console.log("UPDATING")
    update(Date.now());
  }, 1000);

  useEffect(() => runOncePerSecond(updateTime), [timeLeft]);

  return (
    <>
    <Grid style={{height: '70vh'}} container justifyContent="center" alignContent="center">
      <Grid item xs={4} container justifyContent="center">
        <Grid style={{marginBottom: 20}} item xs={12} container justifyContent="center">
          <Grid item xs={3}>
          <Button size="large" color="primary" variant="outlined" onClick={() => setStakeDialog(true)}>Stake</Button>
          </Grid>
        </Grid>
        <Grid style={{marginBottom: 20}} item xs={12} container justifyContent="center">
          <Grid item xs={3}>
          <Button size="large" color="success" variant="outlined" onClick={execute}>Execute</Button>
          </Grid>
        </Grid>
        <Grid style={{marginBottom: 20}} item xs={12} container justifyContent="center">
          <Grid item xs={3}>
          <Button size="large" color="warning" variant="outlined" onClick={withdraw}>Withdraw</Button>
          </Grid>
        </Grid>
        <Grid style={{marginBottom: 20}} item xs={12} container justifyContent="center">
          <Grid item xs={3}>
          <Button size="large" color="warning" variant="outlined" onClick={getEth}>Get ETH</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4} container justifyContent="center">
        <Grid item xs={12} container justifyContent="center">
          <h3>Time Left</h3>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
            <h1 style={{fontSize: '4em'}}>{timeLeft}</h1>
        </Grid>
      </Grid>
      <Grid item xs={4} container justifyContent="center" style={{maxHeight: '30vh', overflow: 'scroll'}}>
        <Feed stakeEvents={stakeEvents}/>
      </Grid>
    </Grid>
      <StakeMeter
        balanceStaked={totalStaked}
        threshold={threshold}
      />
      <StakeDialog open={stakeDialogOpen} handleClose={() => setStakeDialog(false)} stake={stake}/>
    </>
  )
};