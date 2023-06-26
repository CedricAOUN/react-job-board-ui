import { useContext, useRef } from "react";
import { TextField, Box, Button, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { uploadFile } from "../../services/authService";
import { enqueueSnackbar } from "notistack";

function Upload() {
  const { currentUserId, setHasFile, setFileName, fileName } =
    useContext(UserContext);

  const iRef = useRef<HTMLInputElement>(null);
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    console.log(data.file);
    uploadFile(currentUserId, data.file[0]).then(() => {
      setHasFile(true);
      setFileName(data.file[0].name);
      enqueueSnackbar("CV Submitted!", { variant: "success" });
      iRef.current.value = "";
    });
  };

  const fileLink = (
    <>
      Current CV:{" "}
      <Link
        href={`http://localhost:3000/uploads/${currentUserId}.pdf`}
        target="_Blank"
      >
        {fileName}
      </Link>
    </>
  );

  return (
    <>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextField
          inputRef={iRef}
          type="file"
          fullWidth
          helperText={
            !!errors.file
              ? errors.file?.message.toString()
              : fileName.length
              ? fileLink
              : "Current CV: None"
          }
          error={!!errors.file}
          inputProps={{ accept: "application/pdf" }}
          InputProps={{ endAdornment: <Button type="submit">Upload</Button> }}
          {...register("file", {
            required: "Please select a PDF file before uploading!",
          })}
        ></TextField>
      </Box>
    </>
  );
}

export default Upload;
