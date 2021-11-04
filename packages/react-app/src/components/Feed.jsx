import React from 'react';
import Address from './Address';
import Grid from '@mui/material/Grid';

const StakeNotification = ({
  address
}) => (
  <Grid container item xs={12} justifyContent="center">
    <Address
      address={address}
    />
  </Grid>
)
  

export default () => {
  return (
    <Grid container>
      <StakeNotification address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"/>
      <StakeNotification address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"/>
      <StakeNotification address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"/>
      <StakeNotification address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"/>
    </Grid>
  )
}