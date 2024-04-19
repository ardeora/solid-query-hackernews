import { A } from "@solidjs/router";
import { Component, For, Match, Show, Switch, createSignal } from "solid-js";
import { CommentDefinition } from "~/types";
import Toggle from "./Toggle";
import { Circle, Minus, Plus } from "./Icons";

const Comment: Component<{ comment: CommentDefinition; nested?: boolean }> = (
  props
) => {
  const [showChildren, setShowChildren] = createSignal(true);

  return (
    <div
      class={`${!!props.nested ? "ml-2 pl-4 border-l border-gray-300" : ""}`}
    >
      <div>
        <div class="text-sm flex items-center leading-none gap-2">
          <button
            class="h-4 w-4 border flex items-center justify-center rounded hover:bg-gray-100 border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={props.comment.comments.length === 0}
            onClick={() => setShowChildren(!showChildren())}
          >
            <Switch>
              <Match when={props.comment.comments.length === 0}>
                <span class="h-2 w-2 text-gray-600">
                  <Circle />
                </span>
              </Match>
              <Match when={showChildren()}>
                <span class="h-3 w-3 text-gray-600">
                  <Minus />
                </span>
              </Match>
              <Match when={!showChildren()}>
                <span class="h-3 w-3 text-gray-600">
                  <Plus />
                </span>
              </Match>
            </Switch>
          </button>
          <A
            class="leading-none underline text-orange-600 hover:text-orange-700"
            href={`/users/${props.comment.user}`}
          >
            {props.comment.user}
          </A>
          <span class="leading-none text-gray-500">
            {props.comment.time_ago} ago
          </span>
        </div>
        <div
          class="text-sm text-gray-800 py-1 pb-1 ml-2 pl-4 border-l border-gray-300"
          innerHTML={props.comment.content}
        />
      </div>

      <Show when={showChildren() && props.comment.comments.length}>
        <For each={props.comment.comments}>
          {(comment) => <Comment comment={comment} nested />}
        </For>
      </Show>
    </div>
  );
};

export default Comment;
