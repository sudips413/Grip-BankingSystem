import React from 'react'
import './home.css'
import { Grid, Button, Typography } from '@mui/material'
function Home() {
  return (  
    <Grid container spacing={3}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '20%',
        }}
    >
        <Grid item xs={12}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography variant="h1" component="div" gutterBottom>
                Welcome to Grip Bank
            </Typography>
            <Typography variant="body2" component="div" gutterBottom>   
                We are here to help you with your banking needs.    
            </Typography>     
        </Grid>
        <Grid item xs={12}>            
            <Button variant="contained" color="primary"
                onClick={() => window.location.href = '/getstarted'
                }
            >
                Get Started
            </Button>    
        </Grid>    
    </Grid>   
  )
}

export default Home