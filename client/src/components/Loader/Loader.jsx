import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

function Loader() {
  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
    <CircularProgress />
    </Grid>
  )
}

export default Loader