import { Fragment } from "react";
import { ListItemButton, Typography } from "@mui/material";
import { fontSizes } from "../../utils/contants";

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
      <ListItemButton
        onClick={onSubmit}
        sx={{ borderBottom: "1px solid black" }}
      >
        <Typography fontSize={fontSizes} color={"primary"} fontWeight={"800"}>
          {title} at {company}
        </Typography>
      </ListItemButton>
    </Fragment>
  );
}
