import { Avatar, Box, Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import { useQuery } from "react-query";

export const TotalCustomers = (props) => {
  const { isLoading, data, error } = useQuery("fetchTotalCustomers", async () => {
    return fetch("/api/users/amount")
      .then((res) => res.json())
      .then((res) => res);
  });

  return (
    <>
      {isLoading ? (
        <Typography>loading</Typography>
      ) : (
        <Card {...props}>
          <CardContent>
            <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
              <Grid item>
                <Typography color="textSecondary" gutterBottom variant="overline">
                  TOTAL CUSTOMERS
                </Typography>
                <Typography color="textPrimary" variant="h4">
                  {data !== null ? data : <CircularProgress />}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar
                  sx={{
                    backgroundColor: "success.main",
                    height: 56,
                    width: 56,
                  }}
                >
                  <PeopleIcon />
                </Avatar>
              </Grid>
            </Grid>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                pt: 2,
              }}
            >
              <ArrowUpwardIcon color="success" />
              <Typography
                variant="body2"
                sx={{
                  mr: 1,
                }}
              >
                16%
              </Typography>
              <Typography color="textSecondary" variant="caption">
                Since last month
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};
