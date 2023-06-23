import { useState, useContext, useEffect } from "react";
import { Box, Button, Modal } from "@mui/material";
import LoginTabs from "./LoginTabs";
import { UserContext } from "../../App";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
        <Button variant="contained" color="secondary" onClick={handleOpen}>
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
