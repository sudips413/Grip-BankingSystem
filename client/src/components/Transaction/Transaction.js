import React from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  FormHelperText,
} from "@mui/material";
import { useSelector } from "react-redux";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TransactionDetails from "./TransactionDetails";
import { blue } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import Loader from "../Loader/Loader";

export default function Transaction() {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const allAccounts = useSelector((state) => state.userReducer);
  const [Balance, setBalance] = React.useState("XXX.XX");
  const [AmountHideStatus, setAmountHideStatus] = React.useState(true);
  const [balanceLoading, setBalanceLoading] = React.useState(false);
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/getstarted/">
      Get started
    </Link>,
    <Typography key="3" color="text.primary">
      Transaction
    </Typography>,
  ];
  function fetchBalance(accountNumber) {
    if (accountNumber) {
      setAmountHideStatus(!AmountHideStatus);
      if (!AmountHideStatus) {
        setBalance("XXX.XX");
        setBalanceLoading(false);
      } else {
        axios
          .get(`http://localhost:5000/api/balance/${accountNumber}`)
          .then((res) => {
            setBalanceLoading(false);
            setBalance(res.data.balance);
          });
      }
    }
  }

  return (
    <Grid container spacing={3} xs={12} sm={12}>
      <Grid
        item
        xs={12}
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Breadcrumbs
          separator=" > "
          aria-label="breadcrumb"
          sx={{ marginTop: 5, marginBottom: 5 }}
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Grid>

      {currentUser !== null ? (
        <Grid container spacing={3} sx={{ marginTop: 5, marginBottom: 5 }}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              component="h4"
              align="center"
              sx={{
                marginTop: 5,
                fontSize: 80,
              }}
            >
              🧛‍♀️
            </Typography>
            <Typography variant="h6" component="h6" align="center">
              {currentUser.name}
            </Typography>

            <br />

            <Typography variant="h6" component="h6" align="center">
              {currentUser.accountNumber}
            </Typography>
            <FormHelperText id="my-helper-text">Account Number</FormHelperText>
            <br />
            <Typography
              variant="h6"
              component="h6"
              align="center"
              color={blue}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body1" component="body1" align="center">
                $ {balanceLoading ? <CircularProgress size={15} /> : Balance}
              </Typography>
              <Button
                onClick={() => {
                  setBalanceLoading(true);
                  fetchBalance(currentUser.accountNumber);
                }}
              >
                {AmountHideStatus ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </Button>
            </Typography>
            <FormHelperText id="my-helper-text">Balance</FormHelperText>
          </Grid>
          <TransactionDetails
            user={currentUser}
            allAccounts={allAccounts}
            fetchBalance={fetchBalance}
            setBalance={setBalance}
            setBalanceLoading={setBalanceLoading}
          />
        </Grid>
      ) : (
        <Loader/>
      )}
    </Grid>
  );
}
