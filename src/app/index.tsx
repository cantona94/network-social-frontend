import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import { store } from "./store";
import { router } from "./router";
import { ThemeProvider } from "./theme-provider";
import { AuthGuard } from "./guard/authGuard";
import "./global.css";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <ThemeProvider>
            <AuthGuard>
              <RouterProvider router={router} />
            </AuthGuard>
          </ThemeProvider>
        </NextUIProvider>
      </Provider>
    </React.StrictMode>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
