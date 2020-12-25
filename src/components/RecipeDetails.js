import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

export default function RecipeDetails({ ingredients, open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Ingredients"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          These are the ingredients you need to have before starting this recipe
        </DialogContentText>
        {ingredients.map((ingredient, index) => (
          <ul key={index}>
            <li>{ingredient.text}</li>
            <li>Weight - {ingredient.weight.toFixed(0)}g</li>
          </ul>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
