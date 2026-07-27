export default function Nav() {
    return (
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 bg-white rounded-full shadow-lg px-3 py-2">
  
          <a href="#home" className="btn rounded-l-full">Home</a>
          <a href="#about" className="btn">About</a>
          <a href="#skills" className="btn">Skills</a>
          <a href="#projects" className="btn">Projects</a>
          <a href="#education" className="btn">Education</a>
          <a href="#contact" className="btn rounded-r-full">Contact</a>
  
        </div>
      </nav>
    );
  }