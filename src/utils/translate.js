import axios from "axios";

const API = "AIzaSyAcNp3nTuvfcLKvjJ25wynOUTBTY5cBmNI";
//const API = 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'

export const translateText = async (text = "text", from = "en", to = "es") => {
  try {
    const response = await axios.post(
      "https://translation.googleapis.com/language/translate/v2",
      {},
      {
        params: {
          q: text,
          source: from,
          target: to,
          key: API,
          format: "text",
        },
      }
    );
    return response.data.data.translations[0].translatedText;
  } catch (err) {
    console.log("rest api error", err);
  }
};
