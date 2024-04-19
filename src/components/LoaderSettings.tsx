import { Suspense, createResource, createSignal } from "solid-js";
import { getLoaderDelay, setLoaderDelay } from "~/lib/api";
import { Loading } from "./Icons";

function LoaderSettings() {
  const [value, setValue] = createSignal(0);

  const [data, { refetch, mutate }] = createResource(() => {
    return getLoaderDelay();
  });

  const setDelayBtn = async (value: "fast" | "fast3g" | "slow3g") => {
    switch (value) {
      case "fast":
        await setLoaderDelay(150);
        break;
      case "fast3g":
        await setLoaderDelay(500);
        break;
      case "slow3g":
        await setLoaderDelay(2000);
        break;
    }
    refetch();
  };

  return (
    <div class="fixed text-sm bottom-4 right-4 bg-gray-50 rounded-md w-64 flex flex-col p-2 border border-gray-300 shadow-sm">
      <Suspense
        fallback={<div class="font-semibold text-gray-700">Loading...</div>}
      >
        <div class="font-semibold text-gray-700">API Loader Settings</div>
        <div class="flex gap-1 pt-1 items-center">
          <span>Delay:</span>

          <span class="text-orange-500 border border-orange-500 px-2 font-semibold inline-block bg-orange-100 rounded">
            {data.latest}ms
          </span>
        </div>
        <div class="pt-3">
          <input
            class="w-full accent-orange-600"
            type="range"
            min="0"
            max="5000"
            step="100"
            onChange={async (e) => {
              await setLoaderDelay(parseInt(e.target.value));
              refetch();
            }}
            onInput={(e) => {
              mutate(parseInt(e.target.value));
            }}
            value={data.latest}
          />
        </div>
        <div class="flex gap-2 pt-2">
          <button
            onClick={() => setDelayBtn("fast")}
            class="flex-1 bg-gray-100 border border-gray-300 rounded leading-relaxed hover:bg-gray-200"
          >
            Fast
          </button>
          <button
            onClick={() => setDelayBtn("fast3g")}
            class="flex-1 bg-gray-100 border border-gray-300 rounded leading-relaxed hover:bg-gray-200"
          >
            Fast 3G
          </button>
          <button
            onClick={() => setDelayBtn("slow3g")}
            class="flex-1 bg-gray-100 border border-gray-300 rounded leading-relaxed hover:bg-gray-200"
          >
            Slow 3G
          </button>
        </div>
      </Suspense>
    </div>
  );
}

export default LoaderSettings;
