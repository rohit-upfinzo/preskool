import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@mantine/core/styles.css";
import "@fontsource-variable/inter";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { MantineProvider, createTheme } from "@mantine/core";
import store from "./redux/store.js";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
  fontFamily: "'Inter Variable', system-ui, sans-serif",
  headings: {
    fontFamily: "'Inter Variable', system-ui, sans-serif",
    fontWeight: "600",
  },
  colors: {
    brand: [
      "#eef2ff",
      "#dbe4ff",
      "#bac8ff",
      "#91a7ff",
      "#748ffc",
      "#5c7cfa",
      "#4c6ef5",
      "#3b5bdb",
      "#1E3A8A",
      "#172b68",
    ],
  },
  primaryColor: "brand",
  primaryShade: 8,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <Notifications />
        <Provider store={store}>
          <App />
        </Provider>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
);
