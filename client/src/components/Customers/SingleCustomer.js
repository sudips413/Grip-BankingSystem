import React from 'react'
import {
    Grid,Card,CardContent,Typography,CardActions,Button
} from '@mui/material'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { allActions } from '../../actions';
function SingleCustomer({user}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    <Grid>
        <Card sx={{ minWidth: 200,
                    maxWidth: 300,
                    margin: 5,
        }}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                {user.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                A/C Number: {user.accountNumber}
                </Typography>
                <Typography variant="body2">
                Email: {user.email}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"
                onClick={()=>{
                    navigate('/transfer',)
                    dispatch(allActions.setCurrentUser(user));
                    localStorage.setItem('currentUser',user._id);
                }
                }
                >Transfer Amount</Button>
            </CardActions>
        </Card>

    </Grid>
  )
}

export default SingleCustomer