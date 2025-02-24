import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import "./styles.css";

const themeConfig = {
  token: {
    colorPrimary: "#00d492",
    colorInfo: "#00d492",
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
