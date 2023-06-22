import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

export default function LoginTabs() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Box>
      <Box>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
      </Box>
      <Box sx={{ padding: 2 }}>
        {tabIndex === 0 && (
          <Box>
            <Login />
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <SignUp />
          </Box>
        )}
      </Box>
    </Box>
  );
}
