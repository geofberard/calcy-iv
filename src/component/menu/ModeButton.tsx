import { IconButton, Snackbar } from "@material-ui/core";
import * as React from "react";
import { Mode } from "../../data/mode/Mode";
import { EditMode } from "../../data/mode/Modes";
import { useMode } from "../context/ModeContext";

export const createModeButton = (mode: Mode) => () => {
  const [isOpen, setOpen] = React.useState(false);
  const [isEnabled, setEnabled] = useMode(EditMode);

  const Icon = isEnabled ? mode.IconOn : mode.IconOff;

  const onClick = () => {
    setEnabled(!isEnabled);
    setOpen(true);
  };

  return (
    <>
      <IconButton aria-label="Share" color="inherit" onClick={onClick}>
        <Icon />
      </IconButton>
      <Snackbar
        open={isOpen}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message={`${mode.label} is now ${isEnabled ? "enabled" : "disabled"}.`}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </>
  );
};
