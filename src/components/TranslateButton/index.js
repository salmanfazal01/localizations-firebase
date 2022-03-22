import GTranslateIcon from "@mui/icons-material/GTranslate";
import { IconButton } from "@mui/material";
import React, { useContext, useState } from "react";
import { updateLocaleFields } from "../../api";
import { CommonContext } from "../../context/commonContext";
import { translateText } from "../../utils/translate";

const TranslateButton = ({ params }) => {
  const {
    commonState: { languages, locales, selectedTab },
  } = useContext(CommonContext);

  const data = locales[selectedTab];

  const { row } = params;
  const { id, word, en } = row;

  const translateAll = async () => {
    const _results = await Promise.all(
      languages.map(async (lang) => ({
        [lang]: row[lang] || (await translateText(en, "en", lang)),
      }))
    );
    const results = Object.assign({}, ..._results);

    console.log(results);

    // await updateLocaleFields(data.id, word, results);
  };

  return (
    <IconButton onClick={translateAll}>
      <GTranslateIcon fontSize="small" />
    </IconButton>
  );
};

export default TranslateButton;
