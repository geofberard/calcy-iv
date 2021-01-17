import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import HelpIcon from "@material-ui/icons/Help";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { Mode } from "./Mode";

export const EditMode: Mode = {
  id: "edit",
  label: "Edit",
  IconOff: EditIcon,
  IconOn: DoneIcon,
};

export const DetailsMode: Mode = {
  id: "details",
  label: "Details",
  IconOff: HelpIcon,
  IconOn: HelpOutlineIcon,
};
