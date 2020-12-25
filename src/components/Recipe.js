import React, { useState } from "react";
import RecipeDetails from "./RecipeDetails";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function Recipe({ recipe }) {
  const classes = useStyles();
  const { label, image, healthLabels, url, ingredients } = recipe;
  const [show, setShow] = useState(false);

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={image}
            title={label}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {label}
            </Typography>
            <Typography variant="body1">
              {healthLabels.map((health, index) => (
                <span key={index}>{health} </span>
              ))}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              style={{ flexGrow: 1 }}
              onClick={() => setShow(true)}
            >
              ingredients
            </Button>
            <Button
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              color="primary"
              style={{ flexGrow: 1 }}
            >
              recipe
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <RecipeDetails ingredients={ingredients} open={show} setOpen={setShow} />
    </>
  );
}
