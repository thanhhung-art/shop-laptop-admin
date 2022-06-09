import { Avatar, Box, Card, CardContent, Grid, Typography, CircularProgress } from '@mui/material';
import MoneyIcon from '@mui/icons-material/Money';
import { useQuery } from "react-query";

export const Budget = (props) => {

  const { isLoading, data } = useQuery("getPendingOrders", async () => {
    return fetch("/api/orders/pending")
      .then( res => res.json())
      .then( res => res)
  });
  
  return (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
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
            PENDING ORDERS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {isLoading ? <CircularProgress /> : data.length}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)}
