import * as React from "react";
import { FC } from "react";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CachedIcon from "@material-ui/icons/Cached";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShareIcon from "@material-ui/icons/Share";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import {
  fade,
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import { Page } from "../../data/navigation/Page";
import { useEventService } from "../context/EventServiceContext";
import { useConfig } from "../context/ConfigContext";
import { refreshEvent as REFRESH } from "../../data/event/AppEvents";
import { getUrlFromConfig } from "../../service/UrlParamService";
import { Config } from "../../data/Config";
import { useSearchQuery } from "../context/SearchQueryContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    menuButton: {
      display: "none",
      marginRight: theme.spacing(2),
    },
    exitButton: {
      marginLeft: theme.spacing(2),
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      // padding: theme.spacing(3),
    },
    logo: {
      height: 55,
      marginRight: 15,
    },
    drawerSelect: {
      paddingTop: 15,
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
  })
);

interface NavigationProps {
  pages: Page[];
  currentPage: Page;
  onChange: (page: Page) => void;
}

export const Navigation: FC<NavigationProps> = ({
  pages,
  currentPage,
  onChange,
  children,
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useSearchQuery();
  const classes = useStyles();
  const theme = useTheme();
  const eventService = useEventService();
  const [config, setConfig, resetConfig] = useConfig();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {pages.map(page => (
          <ListItem
            button
            key={page.label}
            onClick={() => {
              setMobileOpen(false);
              onChange(page);
            }}
            selected={page === currentPage}
          >
            <ListItemIcon>
              <page.Icon color={page === currentPage ? "primary" : "inherit"} />
            </ListItemIcon>
            <ListItemText primary={page.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            Pokemon Storage
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
            <IconButton
              aria-label="Refresh Data"
              color="inherit"
              onClick={() => eventService.trigger(REFRESH)}
            >
              <CachedIcon />
            </IconButton>
            <IconButton
              aria-label="Share"
              color="inherit"
              onClick={() =>
                navigator.clipboard.writeText(getUrlFromConfig(config))
              }
            >
              <ShareIcon />
            </IconButton>
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
      <nav aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};
