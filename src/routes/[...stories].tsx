import { Title } from "@solidjs/meta";
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
import { For, Show, Suspense, createEffect, createResource } from "solid-js";
import { LeftChevron, Loading, RightChevron } from "~/components/Icons";
import LoadingBoundary from "~/components/LoadingBoundary";
import Story from "~/components/Story";
import { getStories } from "~/lib/api";
import { StoryTypes } from "~/types";

export const route = {
  load({ location, params, intent }) {
    // Preload Data on link hover
    // Do not preload data on initial page load
    // Since the data will be streamed from the server
    if (intent !== "initial") {
      const client = useQueryClient();
      const page = +location.query.page || 1;
      const type = (params.stories as StoryTypes) || "top";
      client.ensureQueryData({
        queryKey: ["stories", type, page],
        queryFn: () => getStories(type, page),
      });
    }
  },
} satisfies RouteDefinition;

const properCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function Stories(props: RouteSectionProps) {
  const page = () => +props.location.query.page || 1;
  const type = () => (props.params.stories || "top") as StoryTypes;

  const stories = createQuery(() => ({
    queryKey: ["stories", type(), page()] as const,
    queryFn: async ({ queryKey }) => {
      return getStories(queryKey[1], queryKey[2]);
    },
    placeholderData: keepPreviousData,
    reconcile: "id",
  }));

  return (
    <div>
      <Title>Solid Hacker News</Title>
      <Suspense fallback={<LoadingBoundary />}>
        <div class="h-12 bg-gray-50 border-b border-gray-200 text-gray-600 flex gap-4 justify-center items-center">
          <Show
            when={page() > 1}
            fallback={
              <span
                class="h-6 w-6 rounded border border-gray-300 flex items-center cursor-not-allowed justify-center opacity-40"
                aria-disabled="true"
              >
                <span class="h-5 w-5">
                  <LeftChevron />
                </span>
              </span>
            }
          >
            <A
              preload
              class="h-6 w-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              href={`/${type()}?page=${page() - 1}`}
              aria-label="Previous Page"
            >
              <span class="h-5 w-5">
                <LeftChevron />
              </span>
            </A>
          </Show>

          <span class="tabular-nums">{page()}</span>

          <Show
            when={page() < 10 && stories.data && stories.data.length >= 29}
            fallback={
              <span
                class="h-6 w-6 rounded border border-gray-300 flex items-center cursor-not-allowed justify-center opacity-40"
                aria-disabled="true"
              >
                <span class="h-5 w-5">
                  <RightChevron />
                </span>
              </span>
            }
          >
            <A
              preload
              class="h-6 w-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              href={`/${type()}?page=${page() + 1}`}
              onClick={() => {}}
              aria-label="Next Page"
            >
              <span class="h-5 w-5">
                <RightChevron />
              </span>
            </A>
          </Show>
        </div>
        <main class="bg-gray-100 pt-4">
          <Show when={stories.data}>
            <ul
              class="flex flex-col transition-opacity"
              style={{
                opacity: stories.isFetching && !stories.isFetched ? 0.5 : 1,
              }}
            >
              <For each={stories.data}>
                {(story) => <Story story={story} />}
              </For>
            </ul>
          </Show>
        </main>
      </Suspense>
    </div>
  );
}
