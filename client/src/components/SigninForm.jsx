import { Button, Stack, TextField, Typography, colors } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { ScreenMode } from "../pages/SigninPage";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Api from "../api/Api";
import { loginUser } from "../redux/features/auth/authActions";

const SigninForm = ({ onSwitchMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(resultAction)) {
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      if (resultAction.payload) {
        toast.error(resultAction.payload.msg || "Login failed!");
      } else {
        toast.error("Login failed!");
      }
    }
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%", color: colors.grey[800] }}
    >
      <Stack spacing={5} sx={{ width: "100%", maxWidth: "500px" }}>
        <Stack>
          <Typography variant="h4" fontWeight={600} color={colors.grey[800]}>
            Welcome back
          </Typography>
          <Typography color={colors.grey[600]}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </Typography>
        </Stack>

        <form onSubmit={onSubmit}>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography color={colors.grey[800]}>Email</Typography>
                <TextField
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </Stack>
              <Stack spacing={1}>
                <Typography color={colors.grey[800]}>Password</Typography>
                <TextField
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </Stack>
            </Stack>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                bgcolor: colors.grey[800],
                "&:hover": { bgcolor: colors.grey[600] },
              }}
            >
              Sign in
            </Button>
          </Stack>
        </form>

        <Stack direction="row" spacing={2}>
          <Typography>Don't have an account?</Typography>
          <Typography
            onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}
            fontWeight={600}
            sx={{
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            Sign up now
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SigninForm;
