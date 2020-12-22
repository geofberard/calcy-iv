import { Button, CircularProgress } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import { useConfig } from "../context/ConfigContext";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
  },
  button: {
    marginTop: 20,
  },
}));

export const LoadingView = () => {
  const classes = useStyles();
  const [displayReset, setDisplayReset] = React.useState(false);
  const [config, ,resetConfig] = useConfig();

  React.useEffect(() => {
    setTimeout(() => setDisplayReset(true), 5000);
  }, []);

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CircularProgress size={90} />
      {displayReset && (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          className={classes.button}
          onClick={() => resetConfig()}
        >
          Reset
        </Button>
      )}
    </Container>
  );
};
