import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SwipeableViews from "react-swipeable-views";
import Appbar from "../src/components/Appbar";
import LocalesTable from "../src/components/LocalesTable";
import NewLocale from "../src/components/NewLocale";
import { auth } from "../src/config/firebase";
import { CommonContext } from "../src/context/commonContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const LocalesPage = () => {
  const { commonState, setCommonState } = useContext(CommonContext);
  const { locales = [], selectedTab } = commonState;

  const [user, loading, error] = useAuthState(auth);

  const router = useRouter();

  const handleChangeIndex = (index) => {
    setCommonState({ selectedTab: index });
  };

  if (loading) return <div>Loading...</div>;
  if (!user && !loading) {
    router.push("/");
    return <></>;
  }

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Appbar />

      {locales.length > 0 && (
        <Box sx={{ pt: 3, px: 3 }}>
          <NewLocale />
        </Box>
      )}

      {locales.length > 0 && (
        <SwipeableViews
          axis="x"
          index={selectedTab}
          onChangeIndex={handleChangeIndex}
        >
          {locales.map((_, i) => (
            <TabPanel value={i} index={i} key={i}>
              {selectedTab === i && <LocalesTable />}
            </TabPanel>
          ))}
        </SwipeableViews>
      )}
    </Box>
  );
};

export default LocalesPage;
