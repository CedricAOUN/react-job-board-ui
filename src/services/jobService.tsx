import axios from "axios";
import url from "./urlService";

export let jobsList = [];

export async function fetchJobs() {
  return await axios
    .get(`${url}jobs`)
    .then(function (response) {
      // console.log(response.data[0].title);
      jobsList = response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error.message);
    })
    .finally(function () {
      // always executed
    });
}

export async function fetchMyJobs(userid): Promise<any> {
  return await axios.post(`${url}myJobs`, {
    userid: userid,
  });
}

export async function createJob(
  iduser,
  posted_date,
  title,
  company,
  location,
  description,
  requirements,
  salary
): Promise<any> {
  return await axios.post(`${url}createJob`, {
    iduser: `${iduser}`,
    posted_date: `${posted_date}`,
    title: `${title}`,
    company: `${company}`,
    location: `${location}`,
    description: `${description}`,
    requirements: `${requirements}`,
    salary: `${salary}`,
  });
}

export async function apply(user_id, job_id): Promise<any> {
  return await axios.post(`${url}apply`, {
    user_id: `${user_id}`,
    job_id: `${job_id}`,
  });
}

export async function getCandidates(job_ids): Promise<any> {
  return await axios.post(`${url}candidates`, {
    job_ids: job_ids,
  });
}
