import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

const ProtectRouter = (Component) => {
  return (props) => {
    const getLayout = Component.getLayout ?? ((page) => page);
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(async () => {
      const res = await fetch("/api/auth/check/admin");
      const data = await res.json();
      setVerified(data.success);

      if (!data.success) {
        localStorage.removeItem("userId");
        router.push("/login");
      }
    }, []);

    return verified ? (
      <>{getLayout(<Component {...props} />)}</>
    ) : (
      <>
        {getLayout(
          <Box display="flex" alignItems="center" justifyContent="center" sx={{ height: "100%" }}>
            <CircularProgress />
          </Box>
        )}
      </>
    );
  };
};

export default ProtectRouter;
