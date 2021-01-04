import { Card, CardContent, CardMedia, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import * as React from "react";
import { Config } from "../../data/Config";
import { getConfigFromCookie } from "../../service/CookieService";
import { useConfig } from "../context/ConfigContext";
import HelpDialog from "./elements/HelpDialog";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(10),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  media: {
    height: 140,
    backgroundSize: "contain",
  },
}));

function checkConfig(config: Partial<Config>): config is Config {
  return (
    config.spreadsheetKey &&
    config.spreadsheetKey.length > 0 &&
    config.pokemonSheet &&
    config.pokemonSheet.length > 0
  );
}

export const ConfigView = () => {
  const classes = useStyles();
  const cookieConfig = getConfigFromCookie();
  const [newConfig, setNewConfig] = React.useState<Partial<Config>>(
    !cookieConfig ? {} : {
          spreadsheetKey: cookieConfig.spreadsheetKey,
          pokemonSheet: cookieConfig.pokemonSheet,
          pokedexSheet: cookieConfig.pokedexSheet,
          newScanSheet: cookieConfig.newScanSheet,
        }
  );
  const [, setConfig] = useConfig();
  const [validate, setValidate] = React.useState<boolean>(false);

  const spreadsheetKeyError = validate && !newConfig.spreadsheetKey;
  const pokemonSheetError = validate && !newConfig.pokemonSheet;

  const onsubmit = () =>
    checkConfig(newConfig) ? setConfig(newConfig as Config) : setValidate(true);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card className={classes.root}>
        <CardContent>
          <CardMedia
            image="img/go-logo.png"
            title="Logo"
            className={classes.media}
          />
          <TextField
            id="spreadsheetKey"
            name="spreadsheetKey"
            label="Google Spreadsheet Key"
            variant="outlined"
            margin="normal"
            defaultValue={newConfig.spreadsheetKey}
            required
            fullWidth
            autoFocus
            error={spreadsheetKeyError}
            helperText={spreadsheetKeyError ? "This field is required" : null}
            onChange={event =>
              setNewConfig({ ...newConfig, spreadsheetKey: event.target.value })
            }
          />
          <TextField
            id="pokemonSheet"
            name="pokemonSheet"
            label="Pokemon Sheet"
            variant="outlined"
            margin="normal"
            defaultValue={newConfig.pokemonSheet}
            required
            fullWidth
            error={pokemonSheetError}
            helperText={pokemonSheetError ? "This field is required" : null}
            onChange={event =>
              setNewConfig({ ...newConfig, pokemonSheet: event.target.value })
            }
          />
          <TextField
            id="newScanSheet"
            name="newScanSheet"
            label="New Scan Sheet (optional)"
            variant="outlined"
            margin="normal"
            defaultValue={newConfig.newScanSheet}
            fullWidth
            onChange={event =>
              setNewConfig({ ...newConfig, newScanSheet: event.target.value })
            }
          />
          <TextField
            id="pokedexSheet"
            name="pokedexSheet"
            label="Moves Sheet (optional)"
            variant="outlined"
            margin="normal"
            defaultValue={newConfig.pokedexSheet}
            fullWidth
            onChange={event =>
              setNewConfig({ ...newConfig, pokedexSheet: event.target.value })
            }
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
            startIcon={<SaveIcon />}
            onClick={onsubmit}
          >
            Save
          </Button>
          <HelpDialog/>
        </CardContent>
      </Card>
    </Container>
  );
};
