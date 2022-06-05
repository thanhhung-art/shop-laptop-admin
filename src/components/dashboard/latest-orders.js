import { format } from "date-fns";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";
import { useQuery } from "react-query";
import Link from "next/link";

export const LatestOrders = (props) => {
  const { isLoading, data, error } = useQuery("fetchLatestOrders", () => {
    return fetch("/api/orders/?new=true")
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  });

  return (
    <>
      {isLoading ? (
        <Typography>loading</Typography>
      ) : (
        <Card {...props}>
          <CardHeader title="Latest Orders" />
          <PerfectScrollbar>
            <Box sx={{}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order Ref</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell sortDirection="desc">
                      <Tooltip enterDelay={300} title="Sort">
                        <TableSortLabel active direction="desc">
                          Date
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((order) => (
                    <TableRow hover key={order._id}>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.username || order.userId}</TableCell>
                      <TableCell>{format(new Date(order.createdAt), "dd/MM/yyyy")}</TableCell>
                      <TableCell>
                        <SeverityPill
                          color={
                            (order.status === "delivered" && "success") ||
                            (order.status === "refunded" && "error") ||
                            "warning"
                          }
                        >
                          {order.status}
                        </SeverityPill>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Link href="/orders">
              <a>
                <Button
                  color="primary"
                  endIcon={<ArrowRightIcon fontSize="small" />}
                  size="small"
                  variant="text"
                >
                  View all
                </Button>
              </a>
            </Link>
          </Box>
        </Card>
      )}
    </>
  );
};
