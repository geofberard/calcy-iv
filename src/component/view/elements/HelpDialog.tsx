import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import * as React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    color: theme.palette.grey[500],
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
}));

export default function CustomizedDialogs() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Grid container justify="flex-end">
        <Button color="primary" size="small" onClick={handleClickOpen}>
          I need help
        </Button>
      </Grid>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        maxWidth="md"
        fullWidth
        open={open}
      >
        <MuiDialogTitle disableTypography className={classes.root}>
          <Typography variant="h6">Looking for help ?</Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <MuiDialogContent className={classes.dialogContent}>
          <video controls width="100%">
            <source src="video/setup.mp4" type="video/mp4" />
            <track kind="captions" />
            Sorry, your browser doesn&apos;t support embedded videos.
          </video>
        </MuiDialogContent>
      </Dialog>
    </div>
  );
}
