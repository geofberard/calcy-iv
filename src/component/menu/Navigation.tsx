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
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import { Page } from "../../data/navigation/Page";
import { useEventService } from "../context/EventServiceContext";
import { useConfig } from "../context/ConfigContext";
import { refreshEvent as REFRESH } from "../../data/event/AppEvents";
import { removeCookie } from "../../service/CookieService";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
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
    title: {
      flexGrow: 1,
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
  const classes = useStyles();
  const theme = useTheme();
  const eventService = useEventService();
  const [, setConfig, resetConfig] = useConfig();

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
      <AppBar position="fixed" className={classes.appBar}>
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
          <Typography variant="h5" noWrap className={classes.title}>
            Hello World !
          </Typography>
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
              aria-label="Refresh Data"
              color="inherit"
              onClick={() => setConfig(null)}
            >
              <SettingsIcon />
            </IconButton>
            <IconButton
              aria-label="Refresh Data"
              color="inherit"
              onClick={() => resetConfig()}
            >
              <ExitToAppIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden mdUp implementation="css">
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
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};
