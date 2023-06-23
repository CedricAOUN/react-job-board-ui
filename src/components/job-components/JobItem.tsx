import { Fragment } from "react";
import { ListItemButton, Typography } from "@mui/material";

interface Props {
  title: string;
  company: string;
  key: string;
  fun(): any;
}

export default function JobCard({ title, company, fun }: Props) {
  const onSubmit = () => {
    fun();
  };
  return (
    <Fragment>
      <ListItemButton onClick={onSubmit}>
        <Typography>
          {title} at {company}
        </Typography>
      </ListItemButton>
    </Fragment>
  );
}
