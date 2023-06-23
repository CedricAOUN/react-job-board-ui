import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem } from "@mui/material";

interface Props {
  confirmFunc(): void;
  desc: JSX.Element;
  title: any;
  isMenu?: boolean;
  bColor?: string;
  disabled?: boolean;
}

export default function ConfirmationModal({
  confirmFunc,
  desc,
  title,
  isMenu = false,
  bColor = "primary",
  disabled = false,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {isMenu ? (
        <MenuItem
          onClick={handleClickOpen}
          sx={{ color: bColor }}
          disabled={disabled}
        >
          {title}
        </MenuItem>
      ) : (
        <Button
          onClick={handleClickOpen}
          sx={{ color: bColor }}
          disabled={disabled}
        >
          {title}
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose();
              confirmFunc();
            }}
            autoFocus
            sx={{ color: bColor }}
          >
            {title}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
