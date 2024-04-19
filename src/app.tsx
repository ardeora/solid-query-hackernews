// @refresh reload
import { MetaProvider, Title } from "@solidjs/meta";
import { A, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, lazy } from "solid-js";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import "./app.css";
import Nav from "./components/Nav";
import Tailwind from "./components/Tailwind";
import LoaderSettings from "./components/LoaderSettings";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router
        root={(props) => (
          <MetaProvider>
            <Nav />
            <SolidQueryDevtools buttonPosition="bottom-left" />
            <Suspense>
              {props.children}
              <LoaderSettings />
            </Suspense>
          </MetaProvider>
        )}
      >
        <FileRoutes />
      </Router>
    </QueryClientProvider>
  );
}
