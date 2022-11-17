import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { User } from "../../constants/types";
import { RootState } from "..";
import { getUsers } from "./actions";

interface UserState {
  users: User[];
  loading: boolean;
  error: SerializedError | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.users = [];
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        const users = action.payload;
        state.loading = false;
        state.users = users;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const selectUsers = (state: RootState) => state.user.users;
export const selectLoading = (state: RootState) => state.user.loading;

export default userSlice.reducer;
