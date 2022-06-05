import { DashboardLayout } from "../components/dashboard-layout";
import { useQuery } from "react-query";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Divider,
  TextField,
  FormControl,
  Select,
  MenuItem,
  styled
} from "@mui/material";
import Head from "next/head";
import OrderListResults from "../components/orders/orderListResults";
import { useState } from "react";

const TextFieldContainer = styled(FormControl)(({theme}) => ({
  margin: "1rem 0",
  width: "92%",

  [theme.breakpoints.down("sm")]: {
    width: "70%",
  }
}))

const SelectContainer = styled(FormControl)(({theme}) => ({
  margin: "1rem 0",
  width: "8%",

  [theme.breakpoints.down("sm")]: {
    width: "30%",
  }
}))

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,

  };
}

async function getOrders() {
  return await fetch("/api/orders").then((res) => res.json());
}

const Orders = () => {
  const { data, isLoading } = useQuery("getOrders", getOrders);
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValues] = useState("newest");
  const [status, setStatus] = useState("all");

  const handleSearch = (e) => setSearchValue(e.target.value);

  const handleSort = (e) => setSortValues(e.target.value);

  const handleStatus = (_, newValue) => setStatus(newValue);

  if (isLoading) return <Box>loading...</Box>;

  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <Box component="main" sx={{ py: 4, px: 2 }}>
        <Box display="flex" alignItems="center" gap={1} sx={{mb: 2}} >
          <Typography variant="h4">
            Orders
          </Typography>
          <Typography variant="caption" component="span">({data?.length})</Typography>
        </Box>
        <Box>
          <Tabs value={status} onChange={handleStatus} allowScrollButtonsMobile scrollButtons={true} variant="scrollable">
            <Tab label="all" value="all" {...allyProps(0)} wrapped/>
            <Tab label="pending" value="pending" {...allyProps(1)} sx={{maxWidth: 120}} wrapped/>
            <Tab label="completed" value="completed" {...allyProps(2)} sx={{maxWidth: 120}} wrapped/>
            <Tab label="canceled" value="cancleled" {...allyProps(3)} wrapped/>
            <Tab label="reject" value="reject" {...allyProps(4)} wrapped />
          </Tabs>
          <Divider sx={{ mt: 1 }} />
        </Box>
        <Box display="flex" sx={{ gap: 2 }}>
          <TextFieldContainer>
            <TextField fullWidth placeholder="Search by order id" onChange={handleSearch} />
          </TextFieldContainer>
          <SelectContainer>
            <Select value={sortValue} onChange={handleSort}>
              <MenuItem value={"newest"}>newest</MenuItem>
              <MenuItem value={"oldest"}>oldest</MenuItem>
            </Select>
          </SelectContainer>
        </Box>
        <OrderListResults orders={data} searchValue={searchValue} sortValue={sortValue} status={status} />
      </Box>
    </>
  );
};

Orders.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Orders;
