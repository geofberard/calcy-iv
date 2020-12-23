import { IconButton, Snackbar } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import * as React from "react";
import { getUrlFromConfig } from "../../service/UrlParamService";
import { useConfig } from "../context/ConfigContext";

export const ShareButton = () => {
  const [isOpen, setOpen] = React.useState(false);
  const [config] = useConfig();

  const onClick = () => {
    navigator.clipboard.writeText(getUrlFromConfig(config));
    setOpen(true);
  };

  return (
    <>
      <IconButton aria-label="Share" color="inherit" onClick={onClick}>
        <ShareIcon />
      </IconButton>
      <Snackbar
        open={isOpen}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message="Sharing Url has been copied"
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </>
  );
};
