import { useEffect, useContext } from "react";
import { Box, Button, TextField, Grid, Typography } from "@mui/material";
import JobCard from "./JobCard";
import { fetchJobs, jobsList } from "../../services/jobService";
import { SearchContext } from "../../App";
import { useForm } from "react-hook-form";

// Fetch jobs

// function buildJobs(jobsArray) {
//   jobsArray.forEach((element) => {});
// }

export default function JobGrid() {
  const form = useForm();
  const { register, handleSubmit } = form;

  const { jobs, setJobs, searchQuery, setSearchQuery } =
    useContext(SearchContext);

  const fetch = async () => {
    await fetchJobs();
    setJobs(jobsList); // Update the state with the fetched data
  };

  const search = (query) => {
    setJobs(
      jobs.filter(
        (element) =>
          element.title.toLowerCase().includes(query.toLowerCase()) ||
          element.description.toLowerCase().includes(query.toLowerCase()) ||
          element.company.toLowerCase().includes(query.toLowerCase()) ||
          element.requirements.toLowerCase().includes(query.toLowerCase()) ||
          element.location.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      console.log(`You searched for: ${searchQuery}`);
      search(searchQuery);
    } else {
      fetch();
    }
  }, [searchQuery]);

  const onSubmit = async (data) => {
    await fetch();
    setSearchQuery(data.search);
  };
  // Call the fetchJobs function inside useEffect

  const children = [];
  jobs.map((job) => {
    children.push(
      <Grid item key={job.idjob} xs={12} sx={{ m: 1 }}>
        <JobCard
          key={job.idjob}
          title={job.title}
          description={job.description}
          salary={job.salary}
          company={job.company}
          location={job.location}
          requirements={job.requirements}
          jobId={job.idjob}
        ></JobCard>
      </Grid>
    );
  });
  return (
    <>
      <Grid item xs={11} md={11}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            id="search"
            label="Enter a search term"
            InputProps={{
              endAdornment: (
                <Button type="submit" onClick={handleSubmit(onSubmit)}>
                  Search
                </Button>
              ),
            }}
            {...register("search")}
          ></TextField>
        </form>
      </Grid>
      <Box overflow={"scroll"} maxHeight="80vh">
        {children.length ? (
          children
        ) : (
          <Typography m={6}>
            No results found. Please try a different search term! (This is a preview. To load up some mock data into the app, please follow the instructions layed out  
            <a href="https://github.com/CedricAOUN/react-job-board-backend" target="_blank"> here</a>)
          </Typography>
        )}
      </Box>
    </>
  );
}
