import { useContext, useEffect, useState } from "react";
import {
  Modal,
  MenuItem,
  Box,
  Grid,
  Typography,
  ListItemButton,
  List,
  Button,
  IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import JobItem from "./JobItem";
import { UserContext } from "../../App";
import {
  getCandidates,
  deleteJob,
  fetchMyJobs,
} from "../../services/jobService";
import { fontSizes, modalStyle } from "../../utils/contants";
import ConfirmationModal from "../main-components/ConfirmationModal";
import { enqueueSnackbar } from "notistack";

const style = modalStyle;

export default function MyJobs() {
  const { currentUserId, isRecruiter } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [jobChildren, setJobChildren] = useState([]);
  const [candChildren, setCandChildren] = useState([]);
  const [infoChildren, setInfoChildren] = useState([]);
  const [selectedJob, setSelectedJob] = useState();
  const [selectedJobName, setSelectedJobName] = useState("");
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
  const refreshList = () => {
    setJobs([]);
    setCandChildren([]);
    setInfoChildren([]);
    setJobChildren([]);
    setSelectedJob(undefined);
    setSelectedJobName("");
    getCurrentJobs(currentUserId);
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
            setSelectedJob(job.idjob);
            setSelectedJobName(job.title);
          }}
        />
      );
    });
    setJobChildren(children);
  };

  const buildUserList = (jobId) => {
    let clickedJob = jobs.find((obj) => {
      return obj.idjob === jobId;
    });
    const jobCandList = clickedJob.candidates.map((cand) => {
      const userCapitalized =
        cand.username.charAt(0).toUpperCase() + cand.username.slice(1);
      return (
        <ListItemButton
          sx={{ borderBottom: "1px solid black", justifyContent: "center" }}
          key={`cand${cand.user_id}`}
          onClick={() =>
            buildUserInfo(
              userCapitalized,
              cand.email,
              `http://localhost:3000/uploads/${cand.user_id}.pdf`
            )
          }
        >
          <Typography
            fontSize={fontSizes}
            textAlign={"center"}
            color={"primary"}
            fontWeight={"800"}
          >
            {userCapitalized}
          </Typography>
        </ListItemButton>
      );
    });

    setCandChildren(jobCandList);
  };

  const buildUserInfo = (uName, uEmail, cvUrl) => {
    const userInfo = [
      <>
        <Typography variant="h6">{uName}</Typography>
        <Typography color={"#333333"}>{uEmail}</Typography>
        <Button href={cvUrl} target="_Blank">
          CV
        </Button>
        <Button href={`mailto:${uEmail}`}>Contact</Button>
      </>,
    ];
    setInfoChildren(userInfo);
  };

  const deleteSelectedJob = (jobId) => {
    deleteJob(jobId)
      .then(() => {
        jobChildren.map((job, index) => {
          if (job.idjob == jobId) {
            delete jobChildren[index];
          }
        });
        enqueueSnackbar(`Job: ${selectedJobName} has been deleted`, {
          variant: "warning",
        });
        refreshList();
      })
      .catch(() => {
        enqueueSnackbar(`Something went wrong`, { variant: "error" });
      });
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          handleOpen();
        }}
        disabled={!isRecruiter}
      >
        My Jobs {isRecruiter ? "" : "(Recruiters Only)"}
      </MenuItem>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} fontSize={fontSizes}>
          <IconButton onClick={() => refreshList()}>
            <RefreshIcon color="primary" fontSize={"medium"} />
          </IconButton>
          <Grid container justifyContent={"center"} spacing={1}>
            <Grid item xs={9} md={10}>
              <Typography
                textAlign={"center"}
                sx={{ textDecoration: "underline" }}
                fontSize={fontSizes}
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
                  textAlign: "center",
                }}
              >
                <List style={{ overflow: "scroll" }}>
                  {jobChildren.length ? (
                    jobChildren
                  ) : (
                    <Typography minHeight={150} fontSize={fontSizes}>
                      You haven't created any job offers yet
                    </Typography>
                  )}
                </List>
              </Box>
            </Grid>
            <Grid item xs={3} md={2}>
              <Typography
                textAlign={"center"}
                sx={{ textDecoration: "underline" }}
                fontSize={fontSizes}
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
                  textAlign: "center",
                }}
              >
                <List style={{ overflow: "scroll" }}>
                  {candChildren.length ? (
                    candChildren
                  ) : (
                    <Typography fontSize={fontSizes}>N/A</Typography>
                  )}
                </List>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <ConfirmationModal
                title={
                  selectedJobName.length
                    ? `Delete: ${selectedJobName}`
                    : "Delete: (Select a job)"
                }
                desc={
                  <Typography>
                    Are you sure you would like to delete {selectedJobName}?
                  </Typography>
                }
                bColor="#dd3333"
                disabled={!selectedJobName.length}
                confirmFunc={() => deleteSelectedJob(selectedJob)}
              ></ConfirmationModal>
            </Grid>
            <Grid item xs={12}>
              <Typography
                textAlign={"center"}
                sx={{ textDecoration: "underline" }}
                fontSize={fontSizes}
              >
                Candidate Info:
              </Typography>
              <Box
                minHeight={100}
                sx={{
                  border: "solid 1px black",
                  borderRadius: "5px",
                  padding: 2,
                }}
                textAlign={"center"}
              >
                {infoChildren.length ? (
                  infoChildren
                ) : (
                  <Typography>
                    Please select a candidate to show their info
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
