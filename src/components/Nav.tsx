import { A, useLocation } from "@solidjs/router";

function Nav() {
  const location = useLocation();

  const active = (path: string) =>
    path == location.pathname
      ? "bg-lime-400 border border-lime-500"
      : "hover:bg-lime-400 border-lime-300 hover:border hover:border-lime-400";

  const commonLinkClasses = "font-semibold px-2 py-1 rounded-md border";
  return (
    <header class="bg-lime-300 h-12 text-lime-900 flex justify-center border-b border-lime-400">
      <nav class="container max-w-5xl flex items-center px-4">
        <div class="flex gap-1">
          <A
            class={`${commonLinkClasses} border-lime-300 hover:bg-lime-400`}
            href="/"
          >
            Hacker News
          </A>
          <A class={`${commonLinkClasses} ${active("/new")}`} href="/new">
            New
          </A>
          <A class={`${commonLinkClasses} ${active("/show")}`} href="/show">
            Show
          </A>
          <A class={`${commonLinkClasses} ${active("/ask")}`} href="/ask">
            Ask
          </A>
          <A class={`${commonLinkClasses} ${active("/job")}`} href="/job">
            Jobs
          </A>
        </div>
        <div class="flex-1"></div>
        <a
          class={`${commonLinkClasses} border-lime-300 hover:bg-lime-400 hidden sm:block`}
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
