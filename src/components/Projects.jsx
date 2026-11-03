
{/* Project cards */}
{displayedProjects.length > 0 ? (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {displayedProjects.map((project) => (
      <article
        key={project.id}
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
          {project.name}
        </h3>

        {/* Project description */}
        <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-gray-500">
          {project.description || "No description available"}
        </p>

        {/* Repository link */}
        <div className="mt-auto border-t border-gray-100 pt-5">
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

{/* Navigation */}
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
