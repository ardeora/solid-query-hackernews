import {
  createAsync,
  type RouteDefinition,
  type RouteSectionProps,
} from "@solidjs/router";
import { createQuery, useQueryClient } from "@tanstack/solid-query";
import { Show, Suspense } from "solid-js";
import LoadingBoundary from "~/components/LoadingBoundary";
import { getUser } from "~/lib/api";

export const route = {
  load({ params, intent }) {
    // Preload Data on link hover
    // Do not preload data on initial page load
    // Since the data will be streamed from the server
    if (intent !== "initial") {
      const client = useQueryClient();
      client.ensureQueryData({
        queryKey: ["user", params.id],
        queryFn: () => getUser(params.id),
      });
    }
  },
} satisfies RouteDefinition;

export default function User(props: RouteSectionProps) {
  const user = createQuery(() => ({
    queryKey: ["user", props.params.id],
    queryFn: () => getUser(props.params.id),
  }));

  return (
    <div class="user-view">
      <Suspense fallback={<LoadingBoundary />}>
        <Show when={user.data}>
          <Show when={!user.data!.error} fallback={<h1>User not found.</h1>}>
            <div class="bg-gray-50 flex flex-col gap-1 border-b border-gray-200 p-4">
              <div class="align-bottom">
                <h1 class="text-orange-600 pr-1 text-xl font-semibold hover:underline leading-snug inline-block">
                  User : {user.data!.id}
                </h1>
              </div>
              <ul class="meta">
                <li>
                  <span class="label">Created:</span>{" "}
                  {new Date(Number(user.data!.created) * 1000).toDateString()}
                </li>
                <li>
                  <span class="label">Karma:</span> {user.data!.karma}
                </li>
                <Show when={user.data!.about}>
                  <li class="py-2" innerHTML={user.data!.about} />{" "}
                </Show>
              </ul>
              <p class="text-sm">
                <a
                  class="leading-none underline text-orange-600 hover:text-orange-700"
                  href={`https://news.ycombinator.com/submitted?id=${
                    user.data!.id
                  }`}
                >
                  submissions
                </a>{" "}
                |{" "}
                <a
                  class="leading-none underline text-orange-600 hover:text-orange-700"
                  href={`https://news.ycombinator.com/threads?id=${
                    user.data!.id
                  }`}
                >
                  comments
                </a>
              </p>
            </div>
          </Show>
        </Show>
      </Suspense>
    </div>
  );
}
