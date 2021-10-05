import { useState, useEffect } from "react";
import { getAllGames } from "./services/games";
import "./App.css";

function App() {
  const [mmoData, setMmoData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialURL = "https://www.mmobomb.com/api1/games";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllGames(initialURL);
      console.log(response);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      setLoading(false);
    }
    fetchData();
  }, []);
  return <div>{loading ? <h1>Loading...</h1> : <h1>Data is fetched</h1>}</div>;
}

export default App;
