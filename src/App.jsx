import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <Nav page={page} setPage={setPage} />
      <Home page={page} setPage={setPage} />
    </>
  );
}

export default App;