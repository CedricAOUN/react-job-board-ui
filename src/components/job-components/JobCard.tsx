import { Fragment, useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RequirementsModal from "./RequirementsModal";
import Link from "@mui/material/Link";
import { UserContext } from "../../App";
import { apply } from "../../services/jobService";
import ConfirmationModal from "../main-components/ConfirmationModal";

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
  const { isLoggedIn, currentUserId, hasFile, fileName } =
    useContext(UserContext);

  const handleApply = async () => {
    await apply(currentUserId, jobId).catch((err) => {
      if (err.response.data.err.errno == 1062) {
        console.log("You have already applied to this job!");
      } else {
        console.log("Something went wrong", err);
      }
    });
  };

  return (
    <Fragment>
      <Card>
        <CardContent sx={{ overflow: "hidden", maxWidth: "100%" }}>
          <Typography variant={"h6"} sx={{ my: 2 }}>
            {title}
          </Typography>
          <Typography sx={{ my: 2 }}>
            {company} - {location}
          </Typography>
          <Typography sx={{ my: 4, wordWrap: "break-word" }}>
            {description}
          </Typography>
          <Typography sx={{ color: "#00B588" }}>Salary: {salary}</Typography>
        </CardContent>
        <CardActions>
          <RequirementsModal
            title={title}
            company={company}
            requirements={requirements}
          ></RequirementsModal>
          <ConfirmationModal
            confirmFunc={handleApply}
            desc={
              <Typography>
                Are you sure you want to apply with CV:{" "}
                <Link
                  href={`http://localhost:3000/uploads/${currentUserId}.pdf`}
                  target="_blank"
                >
                  {fileName}
                </Link>
              </Typography>
            }
            title={
              !isLoggedIn
                ? "Apply(Please Login)"
                : !hasFile
                ? "Apply(Please add a CV to your profile)"
                : "Apply"
            }
            disabled={!isLoggedIn || !hasFile}
          ></ConfirmationModal>
        </CardActions>
      </Card>
    </Fragment>
  );
}
