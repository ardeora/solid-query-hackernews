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

// const SolidQueryDevtools = lazy(() =>
//   import("@tanstack/solid-query-devtools").then((mod) => ({
//     default: mod.SolidQueryDevtools,
//   }))
// );

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Tailwind /> */}
      <Router
        root={(props) => (
          <MetaProvider>
            <Nav />
            {/* <SolidQueryDevtools buttonPosition="bottom-left" /> */}
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
