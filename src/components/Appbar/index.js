import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { addLocaleFile } from "../../api";
import { logout } from "../../config/firebase";
import { CommonContext } from "../../context/commonContext";

const Appbar = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fileName, setFileName] = useState("");

  const { commonState, setCommonState } = useContext(CommonContext);
  const { languages = [], locales = [], selectedTab } = commonState;

  const _languages = languages.reduce((acc, lang) => {
    acc[lang] = { maker: "Maker" };
    return acc;
  }, {});

  const handleTabChange = (event, newValue) => {
    setCommonState({ selectedTab: newValue });
  };

  const handleAddFile = () => {
    if (fileName) {
      addLocaleFile(fileName, _languages).then(() => {
        setDialogOpen(false);
        setFileName("");
      });
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Stack direction="row" alignItems="center">
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="scrollable"
            sx={{ flex: 1 }}
          >
            {locales.map((locale, i) => (
              <Tab label={locale._filename} key={i} value={i} />
            ))}
          </Tabs>

          <IconButton color="inherit" onClick={() => setDialogOpen(true)}>
            <AddIcon />
          </IconButton>

          <IconButton color="inherit" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Stack>
      </AppBar>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add a new file</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Input a lower-cased file name. This is a page specific file like
            common.json or home.json
          </DialogContentText>
          <TextField
            autoFocus
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            margin="dense"
            label="File Name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddFile}>Add File</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Appbar;
