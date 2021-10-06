import { useState, useEffect } from "react";
import { getAllGames } from "./services/games";
import "./App.css";
import { Card, CardContent, Button, Box, Grid } from "@mui/material";

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
          <Button onClick={prev}>Prev</Button>
          <Button onClick={next}>Next</Button>
          <h1>MMOs for Every Taste</h1>
          <h3>Looking for a new MMO to try? Look no further!</h3>
          <div>
            {mmoData.map((data) => {
              return (
                <Grid container sx={{ flexGrow: 1 }} spacing={2}>
                  <Grid item sx={4}>
                    <li key={data.id} {...data}>
                      <Card
                        sx={{ minWidth: 345, padding: 2 }}
                        variant="outlined"
                      >
                        <CardContent>
                          <h3>{data.title}</h3>
                          {data.short_description}
                          <br />
                          <Button variant="contained" href="#contained-buttons">
                            <a href={data.game_url}>LEARN MORE</a>
                          </Button>
                          <br />
                          {data.platform}
                        </CardContent>
                      </Card>
                    </li>
                  </Grid>
                </Grid>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
