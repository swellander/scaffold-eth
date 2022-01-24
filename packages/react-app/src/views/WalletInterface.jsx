import React from 'react';
import { useParams } from 'react-router-dom';

export default () => {
  const { address } = useParams();
  return (
    <h3>Wallet Interface for {address}</h3>
  )
}