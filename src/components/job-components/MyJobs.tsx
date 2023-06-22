import { useContext, useEffect, useState } from "react";
import {
  Modal,
  MenuItem,
  Box,
  Grid,
  Typography,
  ListItemButton,
  List,
} from "@mui/material";
import JobItem from "./JobItem";
import { UserContext } from "../../App";
import { fetchMyJobs } from "../../services/jobService";
import { getCandidates } from "../../services/jobService";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  maxHeight: 250,
  p: 4,
  maxWidth: { xs: 200, md: 400, lg: 1000 },
};

export default function MyJobs() {
  const { currentUserId, isRecruiter } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [jobChildren, setJobChildren] = useState([]);
  const [candChildren, setCandChildren] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getCurrentJobs = (id) => {
    fetchMyJobs(id)
      .then((res) => {
        setJobs(res.data);
        //Executes after jobs have been succesfully retrieved
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let allCands;
  //Extracts IDS from jobs, post them to the server as an Array
  const fetchCandidates = () => {
    const jobIdList = jobs.map((job) => job.idjob); // Put all user's jobs in an array
    getCandidates(jobIdList)
      .then((res) => {
        const candList = res.data;
        //Send array and get back the candidates for all user's jobs
        jobs.map((job) => {
          allCands = [];
          candList.map((cand) => {
            if (job.idjob == cand.job_id) {
              allCands.push({
                username: cand.username,
                email: cand.email,
                user_id: cand.user_id,
                job_id: cand.job_id,
              });
            }
          });
          job.candidates = allCands;
        });
      })
      .then(() => {
        buildJobList(jobs);
      });
  };

  // GET Job offers of the current user on ID change.
  useEffect(() => {
    getCurrentJobs(currentUserId);
  }, [currentUserId]);

  //AFTER jobs are retrieved, get candidates
  useEffect(() => {
    fetchCandidates();
  }, [jobs]);

  const buildJobList = (jobs) => {
    let children = [];
    jobs.map((job) => {
      children.push(
        <JobItem
          key={job.idjob}
          title={job.title}
          company={job.company}
          fun={() => {
            buildUserList(job.idjob);
          }}
        />
      );
    });
    setJobChildren(children);
  };

  const buildUserList = (jobId) => {
    let result = jobs.find((obj) => {
      return obj.idjob === jobId;
    });
    const final = result.candidates.map((cand) => {
      return (
        <ListItemButton
          key={`cand${cand.user_id}`}
          onClick={() => {
            console.log(cand);
            window.open(
              `http://localhost:3000/uploads/${cand.user_id}.pdf`,
              "_blank"
            );
          }}
        >
          <Typography>
            <u>Username</u>: {cand.username}, <u> Email</u>: {cand.email}
          </Typography>
        </ListItemButton>
      );
    });

    setCandChildren(final);
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          handleOpen();
        }}
        disabled={!isRecruiter}
      >
        My Job Offers
      </MenuItem>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid container>
            <Grid item xs={6}>
              <Typography
                textAlign={"center"}
                sx={{ textDecoration: "underline" }}
              >
                My Job Offers:
              </Typography>
              <Box
                overflow={"scroll"}
                maxHeight={200}
                minHeight={200}
                sx={{
                  border: "solid 1px black",
                  borderRadius: "5px",
                }}
              >
                <List style={{ overflow: "scroll" }}>
                  {jobChildren.length ? (
                    jobChildren
                  ) : (
                    <Typography textAlign={"center"} minHeight={150}>
                      You haven't created any job offers yet
                    </Typography>
                  )}
                </List>
              </Box>
            </Grid>
            <Grid style={{ flexGrow: "1" }} item sx={{ ml: 2 }}>
              <Typography
                textAlign={"center"}
                sx={{ textDecoration: "underline" }}
              >
                Candidates:
              </Typography>
              <Box
                overflow={"scroll"}
                maxHeight={200}
                minHeight={200}
                sx={{
                  border: "solid 1px black",
                  borderRadius: "5px",
                }}
              >
                <List style={{ overflow: "scroll" }}>
                  {candChildren ? (
                    candChildren
                  ) : (
                    <Typography textAlign={"center"}>
                      Click on a job to view its info!
                    </Typography>
                  )}
                </List>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
