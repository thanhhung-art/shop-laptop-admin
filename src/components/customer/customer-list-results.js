import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useMutation } from "react-query";

export const CustomerListResults = ({ customers, searchValue }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(15);
  const [page, setPage] = useState(0);

  const id = null;
  if (window) id = localStorage.getItem("userId");

  const deleteUser = useMutation(values => {
    return fetch("/api/users/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then(res => res.json())
  }, {
    enabled: id !== null,
  })

  const handleDeleteUser = () =>  {
    deleteUser.mutate(selectedCustomerIds);
    setSelectedCustomerIds([]);
  }

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer._id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
    <Box display="flex" justifyContent="end" sx={{pb: 2}}>
      <DeleteOutlineIcon size="small" sx={{cursor: "pointer"}} onClick={handleDeleteUser} />
    </Box>
    <TableContainer component={Card}>
      <Box sx={{ minWidth: 1050, overflow: "scroll" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedCustomerIds.length === customers.length}
                  color="primary"
                  indeterminate={
                    selectedCustomerIds.length > 0 && selectedCustomerIds.length < customers.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Registration date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers
              .filter((customer) =>
                customer.username.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((customer) => (
                <TableRow
                  hover
                  key={customer._id}
                  selected={selectedCustomerIds.indexOf(customer._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer._id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer._id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar src={customer?.img} sx={{ mr: 2 }}>
                        {getInitials(customer.username)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {customer.username}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{`${customer.address}`}</TableCell>
                  <TableCell>{customer?.phone}</TableCell>
                  <TableCell>{format(Date.parse(customer?.createdAt), "dd/MM/yyyy")}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
      {/* <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 15, 25]}
      /> */}
    </TableContainer>
</>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
