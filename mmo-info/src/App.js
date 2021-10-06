import { useState, useEffect } from "react";
import { getAllGames } from "./services/games";
import "./App.css";
import { Card, CardContent, Button, Grid } from "@mui/material";

function App() {
  const [mmoData, setMmoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialURL = "https://www.mmobomb.com/api1/games";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllGames(initialURL);
      setMmoData(response);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>MMOs for Every Taste</h1>
          <h3>Looking for a new MMO to try? Look no further!</h3>
          <div>
            {mmoData.map((data) => {
              return (
                <li key={data.id} {...data}>
                  <Card sx={{ minWidth: 345, padding: 2 }} variant="outlined">
                    <CardContent>
                      <h3>{data.title}</h3>
                      {data.short_description}
                      <br />
                      <br />
                      <Button
                        variant="contained"
                        size="small"
                        href={data.game_url}
                      >
                        LEARN MORE
                      </Button>
                      <br />
                      <br />
                      {data.platform}
                    </CardContent>
                  </Card>
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
