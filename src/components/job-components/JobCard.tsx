import { Fragment, useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RequirementsModal from "./RequirementsModal";
import { UserContext } from "../../App";
import { apply } from "../../services/jobService";

interface Props {
  title: string;
  salary: string;
  description: string;
  company: string;
  location: string;
  requirements: string;
  jobId: Number;
}

export default function JobCard({
  title,
  salary,
  description,
  company,
  location,
  requirements,
  jobId,
}: Props) {
  const { isLoggedIn, currentUserId, hasFile } = useContext(UserContext);

  const handleApply = async () => {
    await apply(currentUserId, jobId).catch((err) => {
      if (err.response.data.err.errno == 1062) {
        console.log("You have already applied to this job!");
      } else {
        console.log("Something went wrong", err);
      }
    });
  };

  let msg;
  const renderMsg = () => {
    if (!isLoggedIn) {
      return (msg = "(Please Login)");
    } else if (!hasFile) {
      return (msg = "(Please upload a cv via the profile page)");
    }
  };

  useEffect(() => {
    renderMsg();
  }, [isLoggedIn, hasFile]);

  return (
    <Fragment>
      <Card>
        <CardContent sx={{ overflow: "hidden", width: "100vw" }}>
          <Typography variant={"h6"} sx={{ my: 2 }}>
            {title}
          </Typography>
          <Typography sx={{ my: 2 }}>
            {company} - {location}
          </Typography>
          <Typography sx={{ my: 4 }}>{description}</Typography>
          <Typography sx={{ color: "#00B588" }}>Salary: {salary}</Typography>
        </CardContent>
        <CardActions>
          <RequirementsModal
            title={title}
            company={company}
            requirements={requirements}
          ></RequirementsModal>
          <Button disabled={!isLoggedIn || !hasFile} onClick={handleApply}>
            Apply
            {!isLoggedIn
              ? "(Please Login)"
              : !hasFile
              ? "(Please add a CV to your profile)"
              : ""}
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
}
