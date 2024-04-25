import { A } from "@solidjs/router";
import { Component, Show } from "solid-js";

import type { StoryDefinition } from "../types";

const Story: Component<{ story: StoryDefinition }> = (props) => {
  return (
    <li class="bg-gray-50 px-4 py-2 border-b border-gray-200 flex gap-4">
      <div class="py-1.5 font-medium min-w-16 px-2 rounded-md border border-orange-300 text-orange-700 flex items-center justify-center tabular-nums bg-orange-50">
        {props.story.points || 0}
      </div>
      <div class="flex flex-col">
        <div class="py-[2px] leading-snug">
          <Show
            when={props.story.url}
            fallback={
              <A href={`/item/${props.story.id}`}>{props.story.title}</A>
            }
          >
            <a
              class="text-orange-700 font-medium hover:underline leading-none"
              href={props.story.url}
              target="_blank"
              rel="noreferrer"
            >
              {props.story.title}
            </a>
            <Show when={props.story.domain}>
              <span class="text-gray-600 text-sm leading-none">
                {" "}
                ({props.story.domain})
              </span>
            </Show>
          </Show>
        </div>
        <div class="text-sm text-gray-800">
          <Show
            when={props.story.type !== "job"}
            fallback={
              <A
                preload
                class="underline text-orange-700 hover:text-orange-700"
                href={`/stories/${props.story.id}`}
              >
                {props.story.time_ago}
              </A>
            }
          >
            by{" "}
            <A
              preload
              class="underline text-orange-700 hover:text-orange-700"
              href={`/users/${props.story.user}`}
            >
              {props.story.user}
            </A>{" "}
            {props.story.time_ago} |{" "}
            <A
              preload
              class="underline text-orange-700 hover:text-orange-700"
              href={`/stories/${props.story.id}`}
            >
              {props.story.comments_count
                ? `${props.story.comments_count} comments`
                : "discuss"}
            </A>
          </Show>
        </div>
      </div>
    </li>
  );
};

export default Story;
