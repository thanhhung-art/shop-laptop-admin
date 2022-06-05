import {
  Box,
  Grid,
  Typography,
  Chip,
  Drawer,
  ButtonGroup,
  Button,
  List,
  ListItem,
  Divider,
  styled
} from "@mui/material";
import { format } from "date-fns";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const OrderContainer = styled(Box)(({theme}) => ({
  display: "flex",
  gap: 2,
  alignItems: "center",
  padding: ".5rem 0", 
  borderTop: "1px solid #ccc", 
  cursor: "pointer",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: 1,
    alignItems: "stretch"
  }
}))

const StatusContainer = styled(Box)(({theme}) => ({

  [theme.breakpoints.down("sm")]: {
    marginLeft: "auto",
  }
}))

const OrderListResults = ({ orders, searchValue, sortValue, status }) => {
  const queryClient = useQueryClient();
  const [state, setState] = useState(false);
  const [currValue, setCurrValue] = useState({});

  const openDrawer = () => setState(true);
  const closeDrawer = () => setState(false);

  const editStatus = useMutation(
    (status) => {
      return fetch(`/api/orders/${currValue._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      }).then((res) => res.json());
    },
    {
      onSuccess: (data) => {
        const index = orders.findIndex((order) => order._id === data._id);
        orders[index] = data;
        queryClient.setQueryData("orders", orders);
        setCurrValue(data);
        toast("Order status updated successfully");
      },
    }
  );

  console.log(sortValue)

  return (
    <Box sx={{ position: "relative", overflow: "hidden", minHeight: 600 }}>
      <Grid container >
        {orders
          .filter((order) => {
            if (status === "all" && !searchValue) return true;
            if (status === "all" && searchValue) {
              return order._id.includes(searchValue);
            } else {
              return order.status === status && order._id.includes(searchValue);
            }
          })
          .sort((a, b) => {
            if (sortValue === "newest") {
              return Date.parse(b.createdAt) - Date.parse(a.createdAt);
            } else {
              return Date.parse(a.createdAt) - Date.parse(b.createdAt);
            }
          })
          .map((order) => {
            order.createdAt = format(Date.parse(order.createdAt), "MM/dd/yyyy");
            return (
              <Grid item key={order._id} xs={12} sx={{ position: "relative" }}>
                <OrderContainer
                  onClick={() => {
                    setCurrValue(order);
                    openDrawer();
                  }}
                >
                  <Typography variant="subtitle2" sx={{mr: 1}}>{order.createdAt}</Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontSize={15}>
                      ID: {order._id}
                    </Typography>
                    <Typography variant="caption">Total of ${order.amount}</Typography>
                  </Box>
                  <StatusContainer>
                    <Chip
                      label={order.status}
                      size="medium"
                      color={(() => {
                        switch (order.status) {
                          case "canceled":
                            return "secondary";
                          case "completed":
                            return "success";
                          case "pending":
                            return "warning";
                          case "reject":
                            return "error";
                        }
                      })()}
                    />
                  </StatusContainer>
                </OrderContainer>
              </Grid>
            );
          })}
      </Grid>
      <Drawer
        anchor="right"
        open={state}
        onClose={closeDrawer}
        variant="persistent"
        sx={{
          "& .MuiDrawer-root": {
            position: "absolute",
          },
          "& .MuiPaper-root": {
            position: "absolute",
          },
        }}
      >
        <Box sx={{ p: 2, backgroundColor: "primary.main", color: "#fff" }}>
          <CloseIcon onClick={closeDrawer} />
        </Box>
        <Box sx={{ p: 2 }}>
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            justifyContent="space-between"
            sx={{ backgroundColor: "#f6fff8", p: 1, borderRadius: 1 }}
          >
            <Typography variant="subtitle2">ACTIONS</Typography>
            <ButtonGroup>
              <Button
                disabled={currValue.status === "pending" ? false : true}
                onClick={() => editStatus.mutate({ status: "completed" })}
              >Approve</Button>
              <Button 
                disabled={currValue.status === "pending" ? false : true}
                onClick={() => editStatus.mutate({ status: "reject" })}
              >Reject</Button>
            </ButtonGroup>
          </Box>
          <Typography variant="subtitle1" sx={{ pt: 2 }}>
            Details
          </Typography>
          <List>
            <ListItem>
              <Typography variant="subtitle2" sx={{ minWidth: 100 }}>
                ID:
              </Typography>
              <Typography variant="caption">{currValue._id}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="subtitle2" sx={{ minWidth: 100 }}>
                Customer:
              </Typography>
              <Box>
                <Typography variant="caption" component="p">
                  {currValue.userId}
                </Typography>
                <Typography variant="caption" component="p">
                  {currValue?.username}
                </Typography>
                <Typography variant="caption" component="p">
                  {currValue.address}
                </Typography>
                <Typography variant="caption" component="p">
                  {currValue?.phone}
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Typography variant="subtitle2" sx={{ minWidth: 100 }}>
                Date:
              </Typography>
              <Typography variant="caption">{currValue.createdAt}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="subtitle2" sx={{ minWidth: 100 }}>
                Total amount:
              </Typography>
              <Typography variant="caption">$ {currValue.amount}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="subtitle2" sx={{ minWidth: 100 }}>
                Status:
              </Typography>
              <Typography variant="caption">{currValue.status}</Typography>
            </ListItem>
            <ListItem>
              <Typography variant="subtitle2" sx={{ minWidth: 100 }}>
                Payment:
              </Typography>
              <Typography variant="caption">{currValue.payment}</Typography>
            </ListItem>
          </List>
          <Divider />
          <Typography variant="subtitle1" sx={{ pt: 2 }}>
            Products
          </Typography>
          <List>
            {currValue.products &&
              currValue.products.map((product) => (
                <ListItem key={product._id}>
                  <Image src={product.img} width={50} height={25} />
                  <Box display="flex" alignItems="center" sx={{ width: "100%", ml: 1 }}>
                    <Typography variant="caption">{product.name.slice(0, 35)}...</Typography>
                    <Typography variant="caption" sx={{ ml: "auto" }}>
                      x{product.quantity}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default OrderListResults;
