import React from 'react'
import {
    TextField
} from '@mui/material'

function CustomerSelector({user,allAccounts,accountNumberRef,setFormdata,formdata}) {
    const filterValues = allAccounts.users.filter((option)=>option.accountNumber !== user.accountNumber);
  return (
    
    <TextField
          sx={{
            mt: 3,
            mb: 3,
          }}
          id="standard-select-currency-native"
          select
          label="Customer Select"
          defaultValue=" "
          SelectProps={{
            native: true,
          }}
          helperText="Please select ythe Customer to transfer amount"
          variant="standard"
          onChange={(e)=>{
            console.log(e.target.value);
            setFormdata(
                {
                    ...formdata,
                    receiverName:e.target.value.split(" ")[1]+" "+e.target.value.split(" ")[2],
                    receiverAccountNumber:e.target.value.split(" ")[0]
                }
            )
          }
          }
        >
          { filterValues.map((option) => (
                <option key={option.accountNumber} value={option.accountNumber+ " " + option.name}>
                {option.accountNumber+"-"+option.name}
                </option>

          ))}
        </TextField>
        
  )
}

export default CustomerSelector