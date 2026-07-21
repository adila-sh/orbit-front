import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";

import { createRouter } from "@/router";
import { queryClient } from "@/integrations/tanstack-query/root-provider";

import "@/styles.css";

const router = createRouter();

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Elemento "#root" não encontrado no index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
