import { useState, useContext } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Switch,
  FormControlLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { authLogin, createUser } from "../../services/authService";
import { UserContext } from "../../App";
import { enqueueSnackbar } from "notistack";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        JobbyJob
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const {
    setIsLoggedIn,
    setCurrentUser,
    setIsRecruiter,
    setCurrentEmail,
    setCurrentUserId,
  } = useContext(UserContext);
  const [serverMsg, setServerMsg] = useState("");
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = form;

  const onSubmit = (data) => {
    console.log("form submitted", data);

    createUser(data.username, data.password, data.email, data.recruiter)
      .then(function () {
        enqueueSnackbar(`User created! Welcome ${data.username}`, {
          variant: "success",
        });
        authLogin(data.email, data.password).then((res) => {
          setCurrentUserId(`${res.data.userId}`);
          setCurrentUser(`${data.username}`);
          setCurrentEmail(`${data.email}`);
          setIsLoggedIn(true);
          setIsRecruiter(data.recruiter);
          enqueueSnackbar("Succesfully Logged In!", { variant: "success" });
          return;
        });
      })
      .catch(function (error) {
        if (error.response.status == 500) {
          enqueueSnackbar("This Email Already Exists", { variant: "error" });
        } else {
          enqueueSnackbar("Something went wrong", { variant: "error" });
        }
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  inputProps={{ maxLength: 20 }}
                  autoComplete="Your desired username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  helperText={errors.username?.message.toString()}
                  autoFocus
                  error={!!errors.username && isSubmitted}
                  {...register("username", {
                    required: "Username is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.-]*$/,
                      message:
                        "Username may not have spaces or special characters(ex: !@#)",
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  inputProps={{ maxLength: 50 }}
                  name="email"
                  autoComplete="email"
                  helperText={errors.email?.message.toString()}
                  error={!!errors.email && isSubmitted}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid Email Format",
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputProps={{ maxLength: 30 }}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText={errors.password?.message.toString()}
                  error={!!errors.password && isSubmitted}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch {...register("recruiter")} />}
                  label="Recruiter"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid item xs={12} textAlign={"center"}>
              <Typography color="secondary">{serverMsg}</Typography>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
