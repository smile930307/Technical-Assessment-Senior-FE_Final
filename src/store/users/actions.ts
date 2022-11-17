import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  const { data } = await api.get("example-data.json");
  return data;
});
