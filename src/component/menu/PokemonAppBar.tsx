import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CachedIcon from "@material-ui/icons/Cached";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import GetAppIcon from "@material-ui/icons/GetApp";
import ShareIcon from "@material-ui/icons/Share";
import * as React from "react";
import { refreshEvent as REFRESH } from "../../data/event/AppEvents";
import { EditMode } from "../../data/mode/Modes";
import { useConfig } from "../context/ConfigContext";
import { useEventService } from "../context/EventServiceContext";
import { useSearchQuery } from "../context/SearchQueryContext";
import { createModeButton } from "./ModeButton";
import { AckButton } from "./AckButton";
import { getUrlFromConfig } from "../../service/UrlParamService";
import { serializePokemons } from "../../service/PokemonService";
import { usePokemons } from "../context/PokemonsContext";

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  exitButton: {
    marginLeft: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const copy = (value: string) => navigator.clipboard.writeText(value);

interface PokemonAppBar {
  showMenu: boolean;
  toggleMenu: () => void;
}

export const PokemonAppBar = ({ showMenu, toggleMenu }: PokemonAppBar) => {
  const [searchQuery, setSearchQuery] = useSearchQuery();
  const classes = useStyles();
  const eventService = useEventService();
  const [config, setConfig, resetConfig] = useConfig();
  const [pokemon] = usePokemons();

  const EditButton = createModeButton(EditMode);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleMenu}
          className={classes.menuButton}
        >
          {showMenu ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h5" noWrap>
          Pokemon
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            defaultValue={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
          />
        </div>
        <div className={classes.grow} />
        <div>
          <EditButton />
          <IconButton
            aria-label="Refresh Data"
            color="inherit"
            onClick={() => eventService.trigger(REFRESH)}
          >
            <CachedIcon />
          </IconButton>
          <AckButton
            label="Download Data"
            ackMessage="Updated Data has been copied. You can past them in your spreadsheet."
            ackDuration={6000}
            onClick={() => copy(serializePokemons(pokemon))}
            Icon={GetAppIcon}
          />
          <AckButton
            label="Share"
            ackMessage="Sharing Url has been copied"
            onClick={() => copy(getUrlFromConfig(config))}
            Icon={ShareIcon}
          />
          <IconButton
            aria-label="Config"
            color="inherit"
            onClick={() => setConfig(null)}
          >
            <SettingsIcon />
          </IconButton>
          <IconButton
            aria-label="Exit"
            color="inherit"
            onClick={() => resetConfig()}
          >
            <ExitToAppIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};
