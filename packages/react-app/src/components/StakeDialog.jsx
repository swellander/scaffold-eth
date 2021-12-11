import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
 
export default ({
  open,
  handleClose,
  stake
}) => {
  const [amount, setAmount] = useState('');
  const handleClick = () => {
    stake(amount);
    handleClose();
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Stake Your ETH!</DialogTitle>
      <TextField
        value={amount}
        onChange={({target: { value }}) => setAmount(value)}
        type="number"
        label="Amount"
      />
      <Button disabled={!amount} onClick={handleClick}>Confirm</Button>
    </Dialog>
  );
}