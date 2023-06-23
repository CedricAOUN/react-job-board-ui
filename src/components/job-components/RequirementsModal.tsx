import { useState } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";

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
