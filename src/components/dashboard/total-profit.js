import { Avatar, Card, CardContent, Grid, Typography, CircularProgress } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useEffect, useState } from 'react';
import { useQuery } from "react-query";

export const TotalProfit = (props) => {

  const { isLoading, data } = useQuery('fetchTotalIncome', () => {
    return fetch('/api/orders/profit')
      .then((response) => response.json())
      .then((data) => data);
  }) 

  return (
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            TOTAL INCOME
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            ${isLoading ? <CircularProgress /> : data.toFixed(2) }
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)}
