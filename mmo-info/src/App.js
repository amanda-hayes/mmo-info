import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [mmoData, setMmoData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialURL =
    "https://www.mmobomb.com/api1/games?platform=browser&category=mmorpg&sort-by=release-date";
  return <div></div>;
}

export default App;
