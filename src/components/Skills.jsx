export default function Skills() {
    return (
      <section
        id="skills"
        className="min-h-screen flex flex-col items-center justify-center px-8 py-20"
      >
        <h1 className="text-5xl font-bold mb-12">Skills</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
  
          {/* Languages */}
          <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Languages</h2>
            <div className="flex flex-wrap gap-2">
              <span className="skill">C</span>
              <span className="skill">C++</span>
              <span className="skill">Java</span>
              <span className="skill">Python</span>
              <span className="skill">JavaScript</span>
            </div>
          </div>
  
          {/* Frontend */}
          <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Frontend</h2>
            <div className="flex flex-wrap gap-2">
              <span className="skill">HTML</span>
              <span className="skill">CSS</span>
              <span className="skill">React</span>
              <span className="skill">Tailwind CSS</span>
            </div>
          </div>
  
          {/* Backend */}
          <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Backend</h2>
            <div className="flex flex-wrap gap-2">
              <span className="skill">Node.js</span>
              <span className="skill">Express.js</span>
              <span className="skill">JWT</span>
              <span className="skill">REST API</span>
            </div>
          </div>
  
          {/* Database */}
        <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Database</h2>
        <div className="flex flex-wrap gap-2">
            <span className="skill">PostgreSQL</span>
            <span className="skill">MySQL</span>
            <span className="skill">MongoDB</span>
            <span className="skill">Redis</span>
        </div>
        </div>
        {/* DevOps */}
<div className="bg-gray-100 rounded-xl p-6 shadow-sm">
  <h2 className="text-2xl font-bold mb-4">DevOps</h2>
  <div className="flex flex-wrap gap-2">
    <span className="skill">Docker</span>
    <span className="skill">GitHub Actions</span>
    <span className="skill">Render</span>
    <span className="skill">Vercel</span>
  </div>
</div>
  
          {/* Tools */}
          <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Tools</h2>
            <div className="flex flex-wrap gap-2">
              <span className="skill">Git</span>
              <span className="skill">GitHub</span>
              <span className="skill">VS Code</span>
              <span className="skill">Postman</span>
              <span className="skill">Vercel</span>
            </div>
          </div>
  
        </div>
      </section>
    );
  }