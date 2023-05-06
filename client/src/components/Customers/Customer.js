import React from 'react'
import {
    Grid,Typography
} from '@mui/material'
import { useEffect } from 'react'
import axios from 'axios'
import SingleCustomer from './SingleCustomer';
import { useDispatch} from 'react-redux';
import { allActions } from '../../actions';
import Loader from '../Loader/Loader';

function Customer() {
    const dispatch = useDispatch();
    const [users, setUsers] = React.useState([]);
    const [status, setStatus] = React.useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function fecthUsers(){
        axios.get('http://localhost:5000/api/users')
        .then((response)=>{
            if(response.data.status==="success"){
                setUsers(response.data.data);
                setStatus(true);
                dispatch(allActions.setAllUsers(response.data.data));
            }
            else{
                console.log(response.data.message);
            }
        })
        .catch((error)=>{
            console.log(error);
        }
        )
    }
    useEffect(() => {
        fecthUsers();
    }, [fecthUsers])
  return (
    
    <Grid container spacing={3} sx={{
        backgroundColor:'#f5f5f5',
    }}>
        {status?(
            <>
            <Grid item xs={12} sx={{
                marginTop:5,
            }}>                
                    <Typography variant="h6" component="h6" align="center">
                        Select Customer to Transfer Amount
                    </Typography>
            </Grid>
            <Grid item xs={12} sx={{
                display:'flex',
                flexDirection:'row',
                flexWrap:'wrap',
                justifyContent:'left',
                alignItems:'center',
            }}>
                {
                    users.map((user,index)=>{
                        return(
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <SingleCustomer user={user} />
                            </Grid>
                        )
                    })
                }
            </Grid>
            </>
        ):(
            <Loader/>
        )}
    </Grid>                   
  )
}

export default Customer