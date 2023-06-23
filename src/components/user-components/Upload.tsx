import { useContext } from "react";
import { TextField, Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { uploadFile } from "../../services/authService";

function Upload() {
  const { currentUserId, setHasFile, setFileName } = useContext(UserContext);
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    console.log(data.file);
    uploadFile(currentUserId, data.file[0]).then(() => setHasFile(true));
    setFileName(data.file[0].name);
  };

  return (
    <>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextField
          size="small"
          type="file"
          helperText={
            !!errors.file
              ? errors.file?.message.toString()
              : "Choose a .PDF file"
          }
          error={!!errors.file}
          inputProps={{ accept: "application/pdf", style: { width: 220 } }}
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
