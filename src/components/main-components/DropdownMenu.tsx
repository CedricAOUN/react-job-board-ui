import * as React from "react";
import { Menu, Fade, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "../../App";
import ConfirmationModal from "./ConfirmationModal";
import JobCreate from "../job-components/JobCreate";
import Profile from "../user-components/Profile";
import MyJobs from "../job-components/MyJobs";
import JobApplications from "../user-components/JobApplications";

export default function DropdownMenu() {
  const {
    isLoggedIn,
    setCurrentUser,
    setIsLoggedIn,
    setIsRecruiter,
    setHasFile,
    setFileName,
    setCurrentUserId,
    setCurrentEmail,
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
      setHasFile(false),
      setFileName("");
    setCurrentUserId(Number);
    setCurrentEmail("");
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
        <JobApplications></JobApplications>
        <MyJobs />
        <JobCreate />
        <ConfirmationModal
          isMenu={true}
          title="Logout"
          desc={<Typography>Are you sure you want to Logout?</Typography>}
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
