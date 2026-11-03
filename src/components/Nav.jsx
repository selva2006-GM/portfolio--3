export default function Nav({ page, setPage }) {
    const links = [
      ["Home", "home"],
      ["About", "about"],
      ["Skills", "skills"],
      ["Projects", "projects"],
    //   ["Education", "education"],
      ["Contact", "contact"],
    ];
  
    return (
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 bg-white rounded-full shadow-lg px-3 py-2">
          {links.map(([label, id]) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className="btn"
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
    );
  }