import { IconButton, Snackbar, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import * as React from "react";

interface AckButtonProps {
  label: string;
  ackMessage: string;
  ackDuration?: number
  onClick: () => void;
  Icon: OverridableComponent<SvgIconTypeMap>;
}

export const AckButton = ({
  label,
  ackMessage,
  ackDuration = 4000,
  onClick,
  Icon,
}: AckButtonProps) => {
  const [isOpen, setOpen] = React.useState(false);

  const onClickInternal = () => {
    onClick();
    setOpen(true);
  };

  return (
    <>
      <IconButton aria-label={label} color="inherit" onClick={onClickInternal}>
        <Icon />
      </IconButton>
      <Snackbar
        open={isOpen}
        autoHideDuration={ackDuration}
        onClose={() => setOpen(false)}
        message={ackMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </>
  );
};
