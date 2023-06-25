import { useState, useContext, useEffect } from "react";
import { Box, Button, Modal } from "@mui/material";
import LoginTabs from "./LoginTabs";
import { UserContext } from "../../App";
import { modalStyle } from "../../utils/contants";

const style = modalStyle;

export default function LoginModal() {
  const { isLoggedIn } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setOpen(false);
  }, [isLoggedIn]);

  return (
    !isLoggedIn && (
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpen}
          sx={{ fontSize: { xs: 12, md: 16 } }}
        >
          {isLoggedIn ? "Logout" : "Login/SignUp"}
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <LoginTabs></LoginTabs>
          </Box>
        </Modal>
      </div>
    )
  );
}
