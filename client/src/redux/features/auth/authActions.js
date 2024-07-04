import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/Api";

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }) => {
    try {
      const { data } = await api.post("/users/login", { email, password });
      localStorage.setItem("userToken", data.accesToken);
      console.log(data);
      return data;
    } catch (e) {
      return e;
    }
  }
);
