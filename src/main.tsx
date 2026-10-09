import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { loadData } from "./data";

loadData().then((data) => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App data={data} />
    </StrictMode>,
  );
});
