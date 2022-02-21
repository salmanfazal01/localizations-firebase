import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { CommonContext } from "../../context/commonContext";
import { updateLocaleField } from "../../api";
import TranslateButton from "../TranslateButton";

const parseColumns = (languages) => {
  return [
    { field: "id", headerName: "ID", width: 50 },
    { field: "word", headerName: "Word", width: 250 },
    ...languages?.map?.((lang) => ({
      field: lang,
      headerName: lang,
      width: 250,
      editable: true,
    })),
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => <TranslateButton params={params} />,
      disableClickEventBubbling: true,
    },
  ];
};

const parseRows = (data, languages) => {
  if (!data.en) return [];

  return [
    ...Object.keys(data.en).map((_key, i) => {
      const _rows = languages.reduce((acc, lang) => {
        acc[lang] = data?.[lang]?.[_key];
        return acc;
      }, {});

      return {
        id: i,
        word: _key,
        ..._rows,
      };
    }),
  ];
};

const LocalesTable = () => {
  const { commonState } = useContext(CommonContext);
  const { languages, locales, selectedTab } = commonState;

  const data = locales[selectedTab];

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setColumns(parseColumns(languages));
    setRows(parseRows(data, languages));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, languages]);

  const handleCellChange = (_props = {}) => {
    const { id, field, value } = _props;

    // console.log(_props);

    //if word changed

    //if value changed
    if (id !== null && field !== "word") {
      const word = rows.find((x) => x.id === id)?.word;
      updateLocaleField(data.id, field, word, value);
      // word &&
      //   firebase
      //     .database()
      //     .ref(`locales/${field}`)
      //     .update({ [word]: value })
      //     .then(() => {
      //       setMessage("success");
      //     })
      //     .catch(() => {
      //       setMessage("error");
      //     });
    }
  };

  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <DataGrid
        rows={rows || []}
        columns={columns || []}
        pageSize={20}
        // rowsPerPageOptions={[5]}
        disableSelectionOnClick
        onCellEditCommit={(e) => {
          handleCellChange(e, rows);
        }}
      />
    </Box>
  );
};

export default LocalesTable;
