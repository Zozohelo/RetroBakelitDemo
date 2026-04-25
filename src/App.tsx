import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Analytics } from "@vercel/analytics/react";
function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Analytics />
    </>
  );
}

export default App;
