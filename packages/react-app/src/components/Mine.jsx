import React, { useState, useEffect } from 'react';
import StakeMeter from './StakeMeter';
import Feed from './Feed';
import humanizeDuration from "humanize-duration";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const getTimeLeftString = durationMS => {
  if (durationMS == undefined) return 'Loading...';
  return durationMS > 0 ? humanizeDuration(durationMS, {
    round: true,
    delimiter: ": ",
    language: "shortEn",
    languages: {
      shortEn: {
        y: () => "",
        mo: () => "",
        w: () => "",
        d: () => "",
        h: () => "",
        m: () => "",
        s: () => "",
        ms: () => "",
      },
  },
  }) : "Zilch!";
}


export default function({
  deadline
}) {
  const [timeLeft, setTimeLeft] = useState()

  const updateTime = currentTimeMS => {
    const remainingMS = deadline?.toNumber() * 1000 - currentTimeMS ;
    console.log({remainingMS})
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
    <Grid style={{height: '80vh'}} container justifyContent="center" alignContent="center">
      <Grid item xs={4} container justifyContent="center">
        <Grid style={{marginBottom: 20}} item xs={12} container justifyContent="center">
          <Grid item xs={1}>
          <Button size="large" color="primary" variant="outlined">Stake</Button>
          </Grid>
        </Grid>
        <Grid style={{marginBottom: 20}} item xs={12} container justifyContent="center">
          <Grid item xs={1}>
          <Button size="large" color="success" variant="outlined">Execute</Button>
          </Grid>
        </Grid>
        <Grid style={{marginBottom: 20}} item xs={12} container justifyContent="center">
          <Grid item xs={1}>
          <Button size="large" color="warning" variant="outlined">Withdraw</Button>
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
      <Grid item xs={4} container justifyContent="center">
        <Feed/>
      </Grid>
    </Grid>
    <Grid style={{height: '20vh'}} container justifyContent="center" alignContent="center">
      <Grid item xs={10} container justifyContent="flex-end">
        <Grid style={{textAlign: 'right'}} item xs={1}>0/100 ETH</Grid>
      </Grid>
      <Grid item xs={10}>
        <StakeMeter/>
      </Grid>
    </Grid>
    </>
  )
};