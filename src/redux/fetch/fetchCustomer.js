import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchCustomer = createAsyncThunk("customer/fetchCustomer", async (id, thunkAPI) => {
  const response = await fetch(`/api/customers/${id}`);
  const json = await response.json();
  return json;
  

});