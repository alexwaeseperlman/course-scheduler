import { CssBaseline, ThemeProvider, CssVarsProvider } from "@mui/joy";
import "@fontsource/public-sans";

export const decorators = [
  (Story) => {
    return (
      <CssVarsProvider>
        <Story />
      </CssVarsProvider>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
