import {
  A,
  createAsync,
  type RouteDefinition,
  type RouteSectionProps,
} from "@solidjs/router";
import { createQuery } from "@tanstack/solid-query";
import { For, Show, Suspense, createResource } from "solid-js";
import { LeftChevron, Loading, RightChevron } from "~/components/Icons";
import { getStories } from "~/lib/api";
import { StoryTypes } from "~/types";

export default function Stories(props: RouteSectionProps) {
  const page = () => +props.location.query.page || 1;
  const type = () => (props.params.stories || "top") as StoryTypes;

  const [data] = createResource(
    () => [page(), type()],
    async () => {
      console.log("fetching", type(), page());
      const data = await getStories(type(), page());
      console.log(data.map((d) => d.title));
      return data;
    }
  );

  return (
    <div>
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
            when={data() && data()!.length >= 29}
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
            <a
              class="h-6 w-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              href={`/${type()}?page=${page() + 1}`}
              aria-label="Next Page"
            >
              <span class="h-5 w-5">
                <RightChevron />
              </span>
            </a>
          </Show>
        </div>
        <main class="news-list">
          <Show when={data()}>
            <pre>
              {JSON.stringify(
                data()!.map((d) => d.title),
                null,
                2
              )}
            </pre>
          </Show>
        </main>
      </Suspense>
    </div>
  );
}

const LoadingBoundary = () => {
  return (
    <div class="h-12 bg-gray-50 border-b border-gray-200 items-center flex justify-center">
      <span class="h-5 w-5 text-gray-500 animate-spin">
        <Loading />
      </span>
    </div>
  );
};
