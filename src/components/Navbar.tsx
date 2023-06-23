import { useContext } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import LoginModal from "./user-components/LoginModal";
import { UserContext } from "../App";
import DropdownMenu from "./DropdownMenu";

export default function Navbar() {
  const { currentUser } = useContext(UserContext);
  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <DropdownMenu></DropdownMenu>
          <Typography
            variant="h4"
            component="div"
            fontSize={{ xs: 16, md: 32 }}
            sx={{ flexGrow: 1 }}
          >
            JobbyJob
          </Typography>
          <Typography variant="h6" fontSize={{ xs: 12, md: 16 }} sx={{ m: 1 }}>
            {currentUser
              ? "Welcome, " +
                currentUser.toLowerCase().charAt(0).toUpperCase() +
                currentUser.slice(1) +
                "!"
              : null}
          </Typography>
          <LoginModal />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
