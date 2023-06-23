import { useContext, useState } from "react";
import {
  MenuItem,
  Modal,
  TextField,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/material";
import { UserContext } from "../../App";
import { useForm } from "react-hook-form";
import { createJob } from "../../services/jobService";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxWidth: { xs: 200, md: 400, lg: 1000 },
};

function JobCreate() {
  const { isRecruiter, currentUserId } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = form;

  const onSubmit = (data) => {
    createJob(
      currentUserId,
      generateDate(),
      data.title,
      data.company,
      data.location,
      data.description,
      data.requirements,
      refactorSalary(data.salary1, data.salary2)
    )
      .then(() => {
        setServerMsg("Job added! You are now able to search for it.");
      })
      .catch((err) => {
        console.log("error occured", err);
      });
  };

  const refactorSalary = (sal1, sal2) => {
    if (!sal2) {
      return `$${Number(sal1).toLocaleString()}`;
    } else {
      return `$${Number(sal1).toLocaleString()} - $${Number(
        sal2
      ).toLocaleString()}`;
    }
  };

  const generateDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} 00:00:00`;
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          handleOpen();
        }}
        disabled={!isRecruiter}
      >
        Add a Job {isRecruiter ? "" : "(Recruiters Only)"}
      </MenuItem>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={style}
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          overflow={"scroll"}
          maxHeight="80vh"
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Add a job
          </Typography>
          <Grid container justifyContent={"center"}>
            <TextField
              required
              error={errors.title && isSubmitted}
              fullWidth
              id="title"
              label="Job title"
              helperText={errors.title?.message.toString()}
              {...register("title", {
                required: "This field is required",
              })}
              sx={{ m: 1 }}
            />
            <TextField
              required
              fullWidth
              error={errors.company && isSubmitted}
              helperText={errors.company?.message.toString()}
              sx={{ m: 1 }}
              id="company"
              label="Company name"
              {...register("company", {
                required: "This field is required",
              })}
            />
            <TextField
              required
              fullWidth
              error={errors.location && isSubmitted}
              helperText={errors.location?.message.toString()}
              sx={{ m: 1 }}
              id="location"
              label="Company address"
              {...register("location", {
                required: "This field is required",
              })}
            />
            <TextField
              required
              fullWidth
              helperText={errors.description?.message.toString()}
              error={errors.description && isSubmitted}
              sx={{ m: 1, height: 150, overflow: "auto" }}
              id="filled-multiline-flexible"
              label="Description"
              multiline
              minRows={5}
              {...register("description", {
                required: "This field is required",
              })}
            />
            <TextField
              required
              error={errors.requirements && isSubmitted}
              helperText={errors.requirements?.message.toString()}
              fullWidth
              sx={{ m: 1 }}
              id="requirements"
              label="Requirements"
              {...register("requirements", {
                required: "This field is required",
              })}
            />
            <TextField
              required
              error={errors.salary1 && isSubmitted}
              helperText={errors.salary1?.message.toString()}
              fullWidth
              sx={{ m: 1 }}
              id="salary1"
              label="Minimum Salary"
              {...register("salary1", {
                required: "This field is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a number",
                },
              })}
            />
            <TextField
              fullWidth
              sx={{ m: 1, mr: 2 }}
              helperText={errors.salary2?.message.toString()}
              error={errors.salary2 && isSubmitted}
              id="salary2"
              label="Maximum Salary"
              {...register("salary2", {
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a number",
                },
              })}
            />
            <Button type="submit">Add</Button>
            <Grid item xs={12}>
              <Typography color="secondary" textAlign={"center"}>
                {serverMsg}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default JobCreate;
