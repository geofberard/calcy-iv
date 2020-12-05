import { CircularProgress } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
}));

export const LoadingView = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CircularProgress size={70} />
    </Container>
  );
};
