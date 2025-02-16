import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import "./index.css";

const themeConfig = {
  token: {
    colorPrimary: "#9ce5c6",
    colorInfo: "#9ce5c6",
    colorTextBase: "#18183f",
  },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider theme={themeConfig}>
      <App />
    </ConfigProvider>
  </StrictMode>
);
