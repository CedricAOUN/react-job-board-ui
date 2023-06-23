import { useContext, useState } from "react";
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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { authLogin } from "../../services/authService";
import { UserContext } from "../../App";

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

const Login = () => {
  const {
    setIsLoggedIn,
    setIsRecruiter,
    setCurrentUser,
    setCurrentEmail,
    setCurrentUserId,
    setHasFile,
    setFileName,
  } = useContext(UserContext);
  const [serverMsg, setServerMsg] = useState("");
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = form;

  const onSubmit = (data) => {
    authLogin(data.email, data.password)
      .then(function (response) {
        if (response.status == 200) {
          setCurrentUser(`${response.data.username}`);
          setCurrentEmail(`${data.email}`);
          setIsLoggedIn(true);
          setCurrentUserId(response.data.userId);
          response.data.userType == "regular" || setIsRecruiter(true);
          setHasFile(response.data.hasFile);
          setFileName(response.data.fileName);
          return;
        } else {
          console.log(response.error);
          return;
        }
      })
      .catch(function (error) {
        setServerMsg(error.response.data.error);
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
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
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
                  required
                  fullWidth
                  inputProps={{ maxLength: 50 }}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
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
                  helperText={errors.password?.message.toString()}
                  error={!!errors.email && isSubmitted}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
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
};

export default Login;
