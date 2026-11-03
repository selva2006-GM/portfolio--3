import Profile from "./Profile";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Education from "./Education";
import Contact from "./Contact";

export default function Home({ page, setPage }) {
  if (page === "projects") {
    return <Projects setPage={setPage} />;
  }

  return (
    <>
      <div id="home">
        <Profile setPage={setPage} />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="skills">
        <Skills />
      </div>

      <div id="projects">
        <Projects setPage={setPage} preview />
      </div>

      {/* <div id="education">
        <Education />
      </div> */}

      <div id="contact">
        <Contact />
      </div>
    </>
  );
}