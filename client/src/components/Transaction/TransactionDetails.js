import {
  FormHelperText,
  TextField,
  Grid,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useRef } from "react";
import React from "react";
import CustomerSelector from "./CustomerSelector";
import axios from "axios";
function TransactionDetails({ user, allAccounts, setBalance,setBalanceLoading}) {
    const [successStatus, setSuccessStatus] = React.useState(false);
    const sendButtonRef= useRef();

  const accountNumberRef = useRef();
  const [formdata, setFormdata] = React.useState({
    senderAccountNumber: user.accountNumber,
    senderName: user.name,
    receiverName: "",
    receiverAccountNumber: "",
    amount: "",
  });
  return (<>
    <Grid container spacing={5} item xs={12} sm={8}
      sx={{
        position:'relative',
      }}
    >
      <Grid item xs={12} sm={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="h6" align="left">
          Sender
        </Typography>
        <TextField
          id="outlined-basic"
          label="Your Account Number"
          variant="outlined"
          value={user.accountNumber}
          disabled
          sx={{
            mt: 3,
            mb: 3,
          }}
        />
        <FormHelperText id="my-helper-text">Your Account Number</FormHelperText>
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            onChange={(e) => {
              if (e.target.value.match(/^[0-9]+$/)) {
                if (e.target.value < 0) {
                  accountNumberRef.current.innerHTML =
                    "Please enter the valid amount";
                } else if (e.target.value > user.balance) {
                  accountNumberRef.current.innerHTML = "Insufficient Balance";
                } else {
                    accountNumberRef.current.innerHTML = "";
                  setFormdata({ ...formdata, amount: e.target.value });
                }
              } else {
                accountNumberRef.current.innerHTML =
                  "Please enter the valid amount";
              }
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="h6" align="left">
          Receiver
        </Typography>
        <CustomerSelector
          user={user}
          allAccounts={allAccounts}
          accountNumberRef={accountNumberRef}
          formdata={formdata}
          setFormdata={setFormdata}
        />

        <Button
        ref={sendButtonRef}
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            mb: 3,
          }}
          onClick={(e) => {
            if (
              formdata.receiverAccountNumber &&
              formdata.amount &&
              formdata.receiverName
            ) {
              sendButtonRef.current.disabled = true;
              sendButtonRef.current.innerHTML = "Sending...";
              sendButtonRef.current.style.backgroundColor = "grey";
              sendButtonRef.current.cursor="not-allowed";
              axios.post("http://localhost:5000/api/transfer", formdata).then(
                (response) => {
                  sendButtonRef.current.disabled = false;
                  sendButtonRef.current.innerHTML = "Send";
                  sendButtonRef.current.style.backgroundColor = "#3f51b5";
                  sendButtonRef.current.cursor="allowed";
                    if(response.data.status === "success"){
                      setBalanceLoading(true);
                      axios
                      .get(`http://localhost:5000/api/balance/${user.accountNumber}`)
                      .then((res) => {
                        setBalanceLoading(false);
                        setBalance(res.data.balance);
                      });
                        setSuccessStatus(true);
                                               
                    }else{
                        accountNumberRef.current.innerHTML = "Transaction Failed";
                    }
                },
                (error) => {
                    console.log(error);
                }
                );

            } else {
              if (!formdata.receiverAccountNumber) {
                accountNumberRef.current.innerHTML =
                  "Please select the receiver account number";
              } else if (!formdata.amount) {
                accountNumberRef.current.innerHTML = "Please enter the amount";
              } else {
                accountNumberRef.current.innerHTML =
                  "Please select the receiver account number";
              }
            }
          }}
        >
          Send
        </Button>
      </Grid>
      <Grid item  xs={12}
        sm={12}
        sx={{
          mt: 3,
          mb: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "red",
        }}
      >
        <Typography
          ref={accountNumberRef}
          variant="body2"
          component="h6"
          align="center"
        ></Typography>
      </Grid>
      {successStatus &&
    <Grid item xs={12} sm={12}
        sx={{
            backgroundColor: 'rgba(0,0,0,0.1)',
            width: '100%',
            //height must be 100vh to cover whole screen
            height: '100vh',
            position:'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 1,
        }}
    
    >
        
        <Alert severity="info"
            sx={{
                mt: 3,
                mb: 3,
                width: "auto",
            }}
            item xs={12} sm={12} 
        >Transaction was Successful! 
            <Button variant="outlined" color="success" sx={{
                ml: 3,
            }}
            onClick={(e) => {
                setSuccessStatus(false);
                window.location.href = "/getstarted";
            }
            }
            >ok</Button>
        </Alert>
        
    </Grid>
    }
    </Grid>
    
    </>
  );
}

export default TransactionDetails;
