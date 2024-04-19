// @refresh reload
import { MetaProvider, Title } from "@solidjs/meta";
import { A, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import "./app.css";
import Nav from "./components/Nav";
import Tailwind from "./components/Tailwind";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Tailwind />
      <Router
        root={(props) => (
          <MetaProvider>
            <Nav />
            <SolidQueryDevtools />
            <Suspense>{props.children}</Suspense>
          </MetaProvider>
        )}
      >
        <FileRoutes />
      </Router>
    </QueryClientProvider>
  );
}
