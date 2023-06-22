import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "../App";
import ConfirmationModal from "./ConfirmationModal";
import JobCreate from "./job-components/JobCreate";
import Profile from "./user-components/Profile";
import MyJobs from "./job-components/MyJobs";

export default function DropdownMenu() {
  const {
    isLoggedIn,
    setCurrentUser,
    setIsLoggedIn,
    setIsRecruiter,
    setHasFile,
  } = React.useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setCurrentUser(""),
      setIsLoggedIn(false),
      setIsRecruiter(false),
      setHasFile(false);
  };

  return (
    <>
      <IconButton
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        disabled={!isLoggedIn}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <Profile onClick={handleClose} />
        <MyJobs />
        <JobCreate />
        <ConfirmationModal
          isMenu={true}
          title="Logout"
          desc="Are you sure you want to Logout?"
          bColor="#E30613"
          confirmFunc={() => {
            handleLogout();
            handleClose();
          }}
        />
      </Menu>
    </>
  );
}