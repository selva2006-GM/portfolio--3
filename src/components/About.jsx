export default function About() {
  return (
    <section
      id="about"
      className="flex justify-center px-8 pt-24"
    >
      <div className="max-w-4xl">
        <h1 className="text-5xl font-bold mb-8">About Me</h1>

        <p className="text-xl leading-9 text-gray-600">
          Hello! I'm <span className="font-semibold text-black">Selva Ganesh</span>,
          a Computer Science and Engineering student with a curious mind and a
          passion for learning. I enjoy exploring new ideas, taking on challenges,
          and turning them into meaningful experiences.
        </p>

        <p className="text-xl leading-9 text-gray-600 mt-6">
          I believe that growth comes from consistency and curiosity. Whether it's
          learning something new, solving a difficult problem, or working on a
          personal project, I always strive to improve and become a better version
          of myself.
        </p>

        <p className="text-xl leading-9 text-gray-600 mt-6">
          Outside of academics, I enjoy playing chess, dancing, and spending time
          building projects that inspire creativity and continuous learning. My goal
          is to create work that is useful, impactful, and reflects my dedication to
          lifelong learning.
        </p>
      </div>
    </section>
  );
}