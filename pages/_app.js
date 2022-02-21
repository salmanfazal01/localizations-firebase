import config from "../src/config";
import { CommonContextProvider } from "../src/context/commonContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps, contextProps }) {
  return (
    <CommonContextProvider initialState={contextProps}>
      <Component {...pageProps} />
    </CommonContextProvider>
  );
}

MyApp.getInitialProps = async (context) => {
  const { languages = [] } = config;

  return { contextProps: { languages } };
};

export default MyApp;
