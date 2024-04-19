import { A, useLocation } from "@solidjs/router";

function Nav() {
  const location = useLocation();

  const active = (path: string) =>
    path == location.pathname
      ? "bg-orange-400 border border-orange-600"
      : "hover:bg-orange-400 border-orange-300 hover:border hover:border-orange-400";

  const commonLinkClasses = "font-semibold px-2 py-1 rounded-md border";
  return (
    <header class="bg-orange-300 h-12 text-orange-900 flex justify-center border-b border-orange-400">
      <nav class="container max-w-5xl flex items-center px-4">
        <div class="flex gap-1">
          <A
            class={`${commonLinkClasses} border-orange-300 hover:bg-orange-400`}
            href="/"
            preload
          >
            Hacker News
          </A>
          <A
            class={`${commonLinkClasses} ${active("/new")}`}
            href="/new"
            preload
          >
            New
          </A>
          <A
            class={`${commonLinkClasses} ${active("/show")}`}
            href="/show"
            preload
          >
            Show
          </A>
          <A
            class={`${commonLinkClasses} ${active("/ask")}`}
            href="/ask"
            preload
          >
            Ask
          </A>
          <A
            class={`${commonLinkClasses} ${active("/job")}`}
            href="/job"
            preload
          >
            Jobs
          </A>
        </div>
        <div class="flex-1"></div>
        <a
          class={`${commonLinkClasses} border-orange-300 hover:bg-orange-400 hidden sm:block`}
          href="http://github.com/Tanstack/query"
          target="_blank"
          rel="noreferrer"
        >
          Built with Solid Query
        </a>
      </nav>
    </header>
  );
}

export default Nav;
