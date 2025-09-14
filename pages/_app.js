import Head from "next/head";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { ThemeProvider } from "../src/constants/theme";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
