import { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useSnackbar } from "notistack";
import Recipe from "./components/Recipe";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: 50,
  },
  searchCard: {
    padding: theme.spacing(5),
    width: "100%",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

function App() {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const url = `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&from=0&to=9&calories=591-722&health=alcohol-free`;
  const { enqueueSnackbar } = useSnackbar();

  async function getData() {
    if (query.trim() !== "" || query === undefined) {
      const response = await axios.get(url);

      if (!response.data.more) {
        return enqueueSnackbar("No food with this name was found", {
          variant: "error",
        });
      }
      setRecipes(response.data.hits);
      setQuery("");
    } else {
      enqueueSnackbar("Please fill the form", { variant: "error" });
      setQuery("");
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    getData();
  }

  return (
    <div className="App">
      <Typography className={classes.title} variant="h2">
        Food App
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Search for recipes using ingredients you have at home
      </Typography>
      <br />
      <CssBaseline />
      <Container maxWidth="sm" align="center">
        <form noValidate autoComplete="off">
          <Card className={classes.searchCard} variant="outlined">
            <CardContent>
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                label="Enter ingredients"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
            </CardContent>
            <CardActions style={{ flexDirection: "row-reverse" }}>
              <Button size="small" variant="outlined" onClick={onSubmit}>
                Search
              </Button>
            </CardActions>
          </Card>
        </form>
      </Container>
      <br />
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {recipes !== [] &&
            recipes.map((recipe, index) => (
              <Recipe key={index} recipe={recipe.recipe} />
            ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
