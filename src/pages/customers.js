import Head from "next/head";
import { Box, Container, Stack, Typography, CircularProgress } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { useQuery } from "react-query";
import { useState } from "react";
import ProtectRouter from "../components/protectRouter";

const Customers = () => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = e => setSearchValue(e.target.value);
  const [customers, setCustomers] = useState([]);

  const { isLoading, error, data, isFetching } = useQuery("fetchCustomers", () => {
    return fetch("/api/users")
      .then((res) => res.json())
      .then((res) => res)
  }, {
    onSuccess: (data) => {
      setCustomers(data);
    }
  });

  if (error)
    return (
      <>
        <Head>
          <title>Customers | Material Kit</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <CustomerListToolbar />
            <Box sx={{ mt: 3 }}>
              <div>failed to load</div>
            </Box>
          </Container>
        </Box>
      </>
    );

  return (
    <>
      <Head>
        <title>Customers | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar handleSearchValue={handleSearch} searchValue={searchValue} total={data?.length} />
          <Box sx={{ mt: 3 }}>
            {isLoading || isFetching ? (
              <Box display="flex" alignItems="center" justifyContent="center" sx={{height: 500}}>
                <CircularProgress />
              </Box>
            ) : (
              <CustomerListResults customers={customers} searchValue={searchValue} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProtectRouter(Customers);
