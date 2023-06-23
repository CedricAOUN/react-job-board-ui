import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import "./App.css";
import Navbar from "./components/Navbar";
import "@fontsource/roboto/700.css";
import JobGrid from "./components/job-components/JobGrid";

export const UserContext = React.createContext(null);
export const SearchContext = React.createContext(null);

document.body.style.overflow = "hidden";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserId, setCurrentUserId] = useState(Number);
  const [currentEmail, setCurrentEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasFile, setHasFile] = useState(false);
  const [fileName, setFileName] = useState("");
  const [jobs, setJobs] = useState([]);

  return (
    <Container fixed maxWidth="lg" sx={{ overflow: "none" }}>
      <UserContext.Provider
        value={{
          currentUser: currentUser,
          setCurrentUser: setCurrentUser,
          currentUserId: currentUserId,
          setCurrentUserId: setCurrentUserId,
          isLoggedIn: isLoggedIn,
          setIsLoggedIn: setIsLoggedIn,
          isRecruiter: isRecruiter,
          setIsRecruiter: setIsRecruiter,
          currentEmail: currentEmail,
          setCurrentEmail: setCurrentEmail,
          hasFile: hasFile,
          setHasFile: setHasFile,
          fileName: fileName,
          setFileName: setFileName,
        }}
      >
        <Navbar></Navbar>
        <Grid container justifyContent={"center"}>
          <SearchContext.Provider
            value={{ jobs, setJobs, searchQuery, setSearchQuery }}
          >
            <JobGrid />
          </SearchContext.Provider>
        </Grid>
      </UserContext.Provider>
    </Container>
  );
}

export default App;
