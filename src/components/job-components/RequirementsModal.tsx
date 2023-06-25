import { useState } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import { modalStyle } from "../../utils/contants";

const style = modalStyle;

interface Props {
  title: string;
  company: string;
  requirements: string;
}

function RequirementsModal({ title, company, requirements }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button onClick={handleOpen}>Requirements</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Requirements for {title} at {company}:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {requirements}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default RequirementsModal;
