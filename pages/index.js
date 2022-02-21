import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../src/config/firebase";
import Auth from "./auth";

const logout = () => {
  signOut(auth);
};

const Home = () => {
  // User Authentication
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <div>loading...</div>;

  if (!user) return <Auth />;

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Home;
