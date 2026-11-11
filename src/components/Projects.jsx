
import { useEffect, useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Projects({ setPage, preview = false }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("All");
  const [sort, setSort] = useState("updated");

  // Fetch projects from the API
  const GITHUB_TOKEN = import.meta.env.GITHUBACCESS;

useEffect(() => {
  const controller = new AbortController();

  async function fetchProjects() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://api.github.com/user/repos?per_page=100&affiliation=owner&sort=updated",
        {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "GitHub API failed");
      }

      setProjects(data.map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        private: repo.private,
        updated_at: repo.updated_at,
      })));

    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }

  fetchProjects();

  return () => controller.abort();
}, []);
  // Get available programming languages
  const languages = useMemo(() => {
    const availableLanguages = projects
      .map((project) => project.language)
      .filter(Boolean);

    return ["All", ...new Set(availableLanguages)];
  }, [projects]);

  // Search, filter and sort projects
  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects
      .filter((project) => {
        const name = project.name || "";
        const description = project.description || "";

        const matchesSearch =
          name.toLowerCase().includes(query) ||
          description.toLowerCase().includes(query);

        const matchesLanguage =
          language === "All" ||
          project.language === language;

        return matchesSearch && matchesLanguage;
      })
      .sort((a, b) => {
        if (sort === "name") {
          return (a.name || "").localeCompare(b.name || "");
        }

        if (sort === "updated") {
          const dateA = new Date(a.updated_at || 0).getTime();
          const dateB = new Date(b.updated_at || 0).getTime();

          return dateB - dateA;
        }

        return 0;
      });
  }, [projects, search, language, sort]);

  // Show only three projects on the Home page
  const displayedProjects = preview
    ? filteredProjects.slice(0, 3)
    : filteredProjects;

  const hasFilters = search !== "" || language !== "All";

  function clearFilters() {
    setSearch("");
    setLanguage("All");
  }

  // Loading state
  if (loading) {
    return (
      <section className="px-6 py-20 text-center">
        <p className="animate-pulse text-gray-500">
          Loading projects...
        </p>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="px-6 py-20 text-center">
        <p className="text-red-600">{error}</p>
        <p className="mt-2 text-sm text-gray-500">
          Check your API URL and try again.
        </p>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="px-6 py-20 sm:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
            My Work
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {preview ? "Featured Projects" : "All Projects"}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            A collection of things I've built, learned, and
            experimented with.
          </p>
        </div>

        {/* Search and filters */}
        {!preview && (
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 md:flex-row">

              {/* Search */}
              <div className="relative flex-1">
                <svg
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16 16 4 4" />
                </svg>

                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search projects..."
                  aria-label="Search projects"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200"
                />
              </div>

              {/* Language filter */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Filter by programming language"
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              >
                {languages.map((item) => (
                  <option key={item} value={item}>
                    {item === "All" ? "All Languages" : item}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort projects"
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              >
                <option value="updated">Recently updated</option>
                <option value="name">Name: A–Z</option>
              </select>
            </div>

            {/* Filter results */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredProjects.length}
                </span>{" "}
                matching projects
              </p>

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-gray-700 underline underline-offset-4 hover:text-black"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Project cards */}
        {displayedProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayedProjects.map((project, index) => (
              <article
                key={project.id ?? project.url ?? index}
                className="group flex h-full min-h-[300px] flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-400 hover:shadow-lg"
              >
                {/* Project icon and language */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition-colors group-hover:bg-gray-900 group-hover:text-white">
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="16"
                        rx="3"
                      />
                      <path d="M3 9h18M8 4v5" />
                    </svg>
                  </div>

                  {project.language && (
                    <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                      {project.language}
                    </span>
                  )}
                </div>

                {/* Project title */}
                <h3 className="min-h-[3.5rem] break-words text-lg font-bold leading-7 text-gray-900">
                  {project.name || "Untitled Project"}
                </h3>

                {/* Project description */}
                <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-gray-500">
                  {project.description || "No description available"}
                </p>

                {/* Repository link */}
                <div className="mt-auto border-t border-gray-100 pt-5">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 transition-colors hover:text-gray-500"
                    >
                      View Repository

                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M7 17 17 7M7 7h10v10" />
                      </svg>
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">
                      Repository unavailable
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              No projects found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try another search or change your language filter.
            </p>

            <button
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Single navigation button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setPage(preview ? "projects" : "home")}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:border-gray-400 hover:bg-gray-50"
          >
            {preview ? "View All Projects" : "Back to Home"}

            <span aria-hidden="true">
              {preview ? "→" : "←"}
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}
