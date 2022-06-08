import Head from "next/head";
import { Box, Container, Grid, Typography, Button, CircularProgress } from "@mui/material";
import { AccountProfile } from "../components/account/account-profile";
import { AccountProfileDetails } from "../components/account/account-profile-details";
import { DashboardLayout } from "../components/dashboard-layout";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";
import { fetchUser } from "../utils/fetch";

const Account = () => {
  const id = null;

  if (typeof window !== "undefined") id = localStorage.getItem("userId");

  const router = useRouter();

  const logout = useMutation(() => {
    return fetch("/api/auth/logout", {
      method: "POST",
    }).then(res => res.json());
  },{
    onSuccess: () => {
      localStorage.removeItem("userId");
      router.push("/login");
    }
  });

  const hanldeLogout = () => logout.mutate();
  
  const { isLoading, data } = useQuery("getUser", () => fetchUser(id), {enabled: id !== null});

  const user = {
    username: data?.username || "",
    email: data?.email || "",
    address: data?.address || "",
    phone: data?.phone || "",
    img: data?.img || "",
    password: data?.password || "",
  };

  return (
    <>
      <Head>
        <title>Account | Material Kit</title>
      </Head>
      <>
        {isLoading ? (
          <Box display="flex" alignItems="center" justifyContent="center" sx={{height: "100%"}}>
            <CircularProgress />
          </Box>
        ) : data && (
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth="lg">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography sx={{ mb: 3 }} variant="h4">
                  Account
                </Typography>
                <Button onClick={hanldeLogout}>Log out</Button>
              </Box>
              <Grid container spacing={3}>
                <Grid item lg={4} md={6} xs={12}>
                  <AccountProfile user={{
                    username: user.username,
                    img: user.img,
                    address: user.address,
                  }} />
                </Grid>
                <Grid item lg={8} md={6} xs={12}>
                  <AccountProfileDetails
                    user={user}
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>
        )}
      </>
    </>
  );
};

Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export async function getServerSideProps(ctx) {
  
  if (ctx.req.cookies.authtokenadmin) {
    return {
      props: {},
    };
  }

  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
}

export default Account;
