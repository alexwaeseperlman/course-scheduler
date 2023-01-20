import "../styles/globals.css";
import { CssBaseline, CssVarsProvider, ThemeProvider } from "@mui/joy";
import type { AppProps } from "next/app";
import "@fontsource/public-sans";

function CourseScheduler({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider>
      <Component {...pageProps} />
    </CssVarsProvider>
  );
}

export default CourseScheduler;
