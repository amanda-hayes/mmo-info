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
      setMmoData(response);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllGames(nextUrl);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllGames(prevUrl);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setMmoData(data);
    setLoading(false);
  };

  return (
    <div className="App">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <button onClick={prev}>Prev</button>
          <button onClick={next}>Next</button>
          <h1>Most Popular MMOs</h1>
          <h3>Looking for a new MMO to try? Look no further!</h3>
          <div>
            {mmoData.map((data) => {
              return (
                <li key={data.id} {...data}>
                  {data.title}
                  {data.short_description}
                  {data.game_url}
                  {data.platform}
                </li>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
