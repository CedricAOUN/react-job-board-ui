import { Fragment, useContext } from "react";
import { List, ListItemButton, Typography } from "@mui/material";
import { UserContext } from "../../App";

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
