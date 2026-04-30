import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Analytics } from "@vercel/analytics/react";
import ChampionsLeagueModal from "./components/ChampionsLeagueModal";
function App() {
  return (
    <>
      <Navbar />
      <ChampionsLeagueModal />
      <Home />
      <Analytics />
    </>
  );
}

export default App;
