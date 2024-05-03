import {
  A,
  createAsync,
  type RouteDefinition,
  type RouteSectionProps,
} from "@solidjs/router";
import {
  createQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/solid-query";
import { For, Show, Suspense } from "solid-js";
import Comment from "~/components/Comment";
import LoadingBoundary from "~/components/LoadingBoundary";
import { getStory } from "~/lib/api";

export const route = {
  load({ params, intent }) {
    // Preload Data on link hover
    // Do not preload data on initial page load
    // Since the data will be streamed from the server
    if (intent !== "initial") {
      const client = useQueryClient();
      client.ensureQueryData({
        queryKey: ["story", params.id],
        queryFn: () => getStory(params.id),
      });
    }
  },
} satisfies RouteDefinition;

export default function Story(props: RouteSectionProps) {
  const story = createQuery(() => ({
    queryKey: ["story", props.params.id] as const,
    queryFn: async ({ queryKey }) => {
      return getStory(queryKey[1]);
    },
    placeholderData: keepPreviousData,
    reconcile: "id",
  }));

  return (
    <div>
      <Suspense fallback={<LoadingBoundary />}>
        <Show when={story.data}>
          <div class="bg-gray-100">
            <div class="bg-gray-50 flex flex-col gap-1 border-b border-gray-200 p-4">
              <div class="align-bottom">
                <h1 class="text-orange-700 pr-1 text-xl font-semibold hover:underline leading-snug inline-block">
                  <a href={story.data!.url} target="_blank">
                    {story.data!.title}
                  </a>
                </h1>
                <Show when={story.data!.domain}>
                  <span class="text-gray-600 leading-none inline-block">
                    {story.data!.domain}
                  </span>
                </Show>
              </div>
              <p class="text-gray-700 text-sm">
                {story.data!.points || 0} points | by{" "}
                <A
                  preload
                  class="underline text-orange-700 hover:text-orange-800"
                  href={`/users/${story.data!.user}`}
                >
                  {story.data!.user}
                </A>{" "}
                {story.data!.time_ago} ago
              </p>
            </div>

            <div class=" bg-gray-50">
              <Show
                when={!!story.data!.comments_count}
                fallback={
                  <p class="py-2 px-4 text-sm mt-4 bg-gray-50 text-gray-700">
                    No comments yet.
                  </p>
                }
              >
                <p class="px-4 text-sm py-1.5 mt-4 border-b bg-gray-50 text-gray-700">
                  {story.data!.comments_count} comments
                </p>
                <div class="bg-gray-50 px-4 py-4">
                  <For each={story.data!.comments}>
                    {(comment) => <Comment comment={comment} />}
                  </For>
                </div>
              </Show>
            </div>
          </div>
        </Show>
      </Suspense>
    </div>
  );
}
