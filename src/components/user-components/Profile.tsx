import { useContext, useState } from "react";
import {
  MenuItem,
  Modal,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Box } from "@mui/material";
import { UserContext } from "../../App";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import ConfirmationModal from "../main-components/ConfirmationModal";
import { authLogin, deleteUser } from "../../services/authService";
import { useForm } from "react-hook-form";
import Upload from "./Upload";
import { fontSizes, modalStyle } from "../../utils/contants";

const style = modalStyle;

interface Props {
  onClick(): void;
}

export default function Profile({ onClick }: Props) {
  const {
    isRecruiter,
    currentUser,
    currentEmail,
    setCurrentEmail,
    setCurrentUser,
    setIsLoggedIn,
    setIsRecruiter,
    setHasFile,
    fileName,
  } = useContext(UserContext);
  const [passVerified, setPassVerified] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const form = useForm();
  const { register, handleSubmit } = form;

  const onSubmit = (data) => {
    authLogin(currentEmail, data.password)
      .then(() => {
        setPassVerified(true);
      })
      .catch((err) => {
        setErrorMsg(err.response.data.error);
      });
  };

  const onDelete = () => {
    deleteUser(currentEmail)
      .then(() => {
        setCurrentEmail(""),
          setCurrentUser(""),
          setIsLoggedIn(false),
          setIsRecruiter(false);
        setHasFile(false);
      })
      .catch((err) => {
        if (err.status == 500) {
          console.log("Failed to delete user with error:");
        } else {
          console.log("Something went wrong");
        }
      });
  };
  return (
    <>
      <MenuItem
        onClick={() => {
          handleOpen();
        }}
      >
        Profile
      </MenuItem>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} mt={6}>
          <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
            Profile
          </Typography>
          <Grid
            container
            direction="column"
            alignItems="center"
            fontSize={fontSizes}
            spacing={3}
            overflow={"scroll"}
          >
            {/* <Grid item xs={6}>
              <Typography fontWeight={800}>Username:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ textAlign: "right" }}>{currentUser}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight={800}>E-mail:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ textAlign: "right" }}>
                {currentEmail}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight={800}>CV:</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                Current CV: {fileName ? fileName : "None"}
              </Typography>
              <Upload />
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight={800}>Recruiter Account:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ textAlign: "right" }}>
                {isRecruiter ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <BlockIcon />
                )}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 0.6 }}>
              <Typography fontWeight={800}>Delete Account:</Typography>
            </Grid>
            <Grid item xs={6} component="form" noValidate>
              <Box display="flex" justifyContent="flex-end">
                {passVerified ? (
                  <>
                    <CheckCircleIcon color="success" sx={{ mt: 0.6 }} />
                    <Typography fontSize={10} sx={{ mt: 1, mr: 2 }}>
                      Password Verified
                    </Typography>
                    <ConfirmationModal
                      title="Delete"
                      desc={
                        <Typography>
                          Are you sure you want to delete your account?{" "}
                        </Typography>
                      }
                      confirmFunc={() => {
                        onDelete();
                        handleClose();
                        onClick();
                      }}
                      bColor="#E30613"
                    />
                  </>
                ) : (
                  <TextField
                    autoFocus
                    fullWidth
                    id="password"
                    label="Please verify your password"
                    helperText={errorMsg}
                    error={!!errorMsg}
                    type="password"
                    InputProps={{
                      endAdornment: (
                        <Button type="submit" onClick={handleSubmit(onSubmit)}>
                          Verify
                        </Button>
                      ),
                    }}
                    {...register("password")}
                  ></TextField>
                )}
              </Box>
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                disabled
                defaultValue={currentUser}
                title="Username"
                label="Username"
                fullWidth
                sx={{ mb: 2 }}
              ></TextField>
              <TextField
                fullWidth
                disabled
                defaultValue={currentEmail}
                title="Email"
                label="Email"
                sx={{ mb: 2 }}
              ></TextField>
              <Box alignItems={"center"} display={"flex"} flexWrap={"wrap"}>
                <Typography fontWeight={800}>Recruiter Account:</Typography>
                {isRecruiter ? "✅" : "❌"}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography textAlign={"center"} fontWeight={800}>
                {" "}
                Upload CV:
              </Typography>
              <Upload />
            </Grid>
            <Grid item xs={12}>
              <Box mt={6} justifyContent={"center"}>
                <Typography textAlign={"center"} fontWeight={800}>
                  Delete Account:
                </Typography>
                {passVerified ? (
                  <>
                    <Typography fontSize={10} textAlign={"center"}>
                      Password Verified ✅
                    </Typography>
                    <ConfirmationModal
                      title="Delete"
                      desc={
                        <Typography>
                          Are you sure you want to delete your account?{" "}
                        </Typography>
                      }
                      confirmFunc={() => {
                        onDelete();
                        handleClose();
                        onClick();
                      }}
                      bColor="#E30613"
                    />
                  </>
                ) : (
                  <TextField
                    autoFocus
                    id="password"
                    label="Verify your password"
                    helperText={errorMsg}
                    error={!!errorMsg}
                    type="password"
                    InputProps={{
                      endAdornment: (
                        <Button type="submit" onClick={handleSubmit(onSubmit)}>
                          Verify
                        </Button>
                      ),
                    }}
                    {...register("password")}
                  ></TextField>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
