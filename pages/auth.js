// auth.tsx
import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth } from "../src/config/firebase";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  // signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/locales",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
  ],
};

const Auth = () => {
  const theme = useTheme();

  return (
    <Container sx={{ height: "100vh", width: "100vw" }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{
          height: "100%",
        }}
      >
        <Typography variant="h5">Maker Localizations</Typography>
        <Typography>Please sign-in:</Typography>

        <Box
          sx={{
            [theme.breakpoints.up("md")]: {
              minWidth: 500,
            },
          }}
        >
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </Box>
      </Stack>
    </Container>
  );
};

export default Auth;
