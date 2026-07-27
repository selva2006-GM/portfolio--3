export default function Projects() {
    const projects = [
      {
        title: "FundBridge",
        description:
          "A crowdfunding platform that enables users to create campaigns, make secure donations, and manage payouts.",
        tech: "React • Node.js • PostgreSQL",
        github: "#",
        demo: "#",
      },
      {
        title: "Easy JSON",
        description:
          "A web application to upload, edit, and download JSON files through a user-friendly interface.",
        tech: "React • JavaScript",
        github: "#",
        demo: "#",
      },
      {
        title: "Portfolio Website",
        description:
          "A responsive personal portfolio showcasing my projects, skills, and achievements.",
        tech: "React • Tailwind CSS",
        github: "#",
        demo: "#",
      },
    ];
  
    return (
      <section id="projects" className="py-20 px-8">
        <h1 className="text-5xl font-bold text-center mb-12">
          Projects
        </h1>
  
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-bold mb-3">
                {project.title}
              </h2>
  
              <p className="text-gray-600 leading-7 mb-4">
                {project.description}
              </p>
  
              <p className="font-semibold mb-6">
                {project.tech}
              </p>
  
              <div className="flex gap-3">
                <a
                  href={project.github}
                  className="btn"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
  
                <a
                  href={project.demo}
                  className="btn"
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }