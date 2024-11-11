import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabaseClient";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const loginUser = (email, password, name) => async (dispatch) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      name,
    },
  });
  if (!error) {
    dispatch(setUser(data.user));
  } else {
    console.error("Login failed:", error.message);
  }
};

export const logoutUser = () => async (dispatch) => {
  await supabase.auth.signOut();
  dispatch(clearUser());
};

export default authSlice.reducer;
