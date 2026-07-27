import personal from "../assets/personal.jpeg";

export default function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-10"
    >
      <div className="max-w-6xl w-full flex items-center justify-between">

        {/* Left */}
        <div className="max-w-xl">

        <h1 className="text-6xl font-bold">
  Hi, I'm Selva Ganesh
</h1>

<div className="mt-6 text-2xl text-gray-600 space-y-2">
  <p>Computer Science Student</p>
  <p>AI & ML Enthusiast</p>
  <p>Problem Solver</p>
</div>

<div className="mt-8 flex gap-4">
  <a
    href="#projects"
    className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-white font-medium transition hover:bg-gray-500"
  >
    View Projects
  </a>

  <a
    href="/SSelva_Ganesh_Resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-white font-medium transition hover:bg-gray-500"
  >
    Resume
  </a>
</div>
        </div>

        {/* Right */}
        <img
  src={personal}
  alt="Selva"
  className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover"
/>

      </div>
    </section>
  );
}