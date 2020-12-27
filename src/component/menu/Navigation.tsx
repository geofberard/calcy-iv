import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, Theme } from "@material-ui/core/styles";
import * as React from "react";
import { FC } from "react";
import { Page } from "../../data/navigation/Page";
import { useConfig } from "../context/ConfigContext";
import { PokemonAppBar } from "./PokemonAppBar";

const useStyles = makeStyles<Theme, boolean>((theme: Theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  drawer: {
    width: showMenu => (showMenu ? 240 : theme.spacing(7) + 1),
    flexShrink: 0,
    whiteSpace: "nowrap",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
  },
}));

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
  const [showMenu, setShowMenu] = React.useState(false);
  const classes = useStyles(showMenu);
  const [config] = useConfig();

  return (
    <div className={classes.root}>
      <PokemonAppBar
        showMenu={showMenu}
        toggleMenu={() => setShowMenu(!showMenu)}
      />
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{ paper: classes.drawer }}
      >
        <div>
          <div className={classes.toolbar} />
          <Divider />
          <List>
            {pages
              .filter(page => !page.isActive || page.isActive(config))
              .map(page => (
                <ListItem
                  button
                  key={page.label}
                  onClick={() => onChange(page)}
                  selected={page === currentPage}
                >
                  <ListItemIcon>
                    <page.Icon
                      color={page === currentPage ? "primary" : "inherit"}
                    />
                  </ListItemIcon>
                  <ListItemText primary={page.label} />
                </ListItem>
              ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};
