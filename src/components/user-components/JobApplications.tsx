import { useContext, useEffect, useState } from "react";
import {
  Modal,
  MenuItem,
  Box,
  Grid,
  Typography,
  ListItem,
  List,
} from "@mui/material";
import { UserContext } from "../../App";
import { getApplications } from "../../services/jobService";
import { modalStyle } from "../../utils/contants";

const style = modalStyle;

export default function JobApplications() {
  const { currentUserId } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getJobs = () => {
    getApplications(currentUserId).then((res) => {
      setJobs(res.data);
    });
  };

  useEffect(() => {
    getJobs();
  }, []);

  const children = [];

  jobs.map((job) => {
    children.push(
      <ListItem
        key={job.idjob}
        style={{ justifyContent: "center" }}
        sx={{ borderBottom: "1px solid black" }}
      >
        <Typography>
          {job.title} at {job.company}
        </Typography>
      </ListItem>
    );
  });

  return (
    <>
      <MenuItem
        onClick={() => {
          handleOpen();
        }}
      >
        Applications
      </MenuItem>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                textAlign={"center"}
                sx={{ textDecoration: "underline" }}
              >
                You have applied to:
              </Typography>
              <Box
                overflow={"scroll"}
                maxHeight={380}
                minHeight={380}
                sx={{
                  border: "solid 1px black",
                  borderRadius: "5px",
                }}
                alignItems="center"
              >
                <List style={{ overflow: "scroll", alignItems: "center" }}>
                  {children}
                </List>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
