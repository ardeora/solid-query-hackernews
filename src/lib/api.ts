import { getCookie, setCookie } from "vinxi/http";
import { StoryDefinition, StoryTypes, UserDefinition } from "~/types";

const story = (path: string) => `https://node-hnapi.herokuapp.com/${path}`;
const user = (path: string) =>
  `https://hacker-news.firebaseio.com/v0/${path}.json`;

async function fetchAPI(path: string) {
  const url = path.startsWith("user") ? user(path) : story(path);
  const headers: Record<string, string> = { "User-Agent": "chrome" };
  const loaderDelay = await getLoaderDelay();
  await new Promise((resolve) => setTimeout(resolve, loaderDelay));
  try {
    let response = await fetch(url, { headers });
    let text = await response.text();
    try {
      if (text === null) {
        return { error: "Not found" };
      }
      return JSON.parse(text);
    } catch (e) {
      console.error(`Received from API: ${text}`);
      console.error(e);
      return { error: e };
    }
  } catch (error) {
    return { error };
  }
}

const mapStories = {
  top: "news",
  new: "newest",
  show: "show",
  ask: "ask",
  job: "jobs",
} as const;

export const getStories = async (
  type: StoryTypes,
  page: number
): Promise<StoryDefinition[]> => {
  "use server";
  return fetchAPI(`${mapStories[type]}?page=${page}`);
};

export const getStory = async (id: string): Promise<StoryDefinition> => {
  "use server";
  return fetchAPI(`item/${id}`);
};

export const getUser = async (id: string): Promise<UserDefinition> => {
  "use server";
  return fetchAPI(`user/${id}`);
};

export const setLoaderDelay = async (delay: number) => {
  "use server";
  setCookie("loaderDelay", delay.toString(), {
    httpOnly: true,
  });
  return delay;
};

export const getLoaderDelay = async () => {
  "use server";
  return parseInt(getCookie("loaderDelay") || "0");
};
