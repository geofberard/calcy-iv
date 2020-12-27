import AppsIcon from "@material-ui/icons/Apps";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import TableChartIcon from "@material-ui/icons/TableChart";
import { Page } from "./Page";

export const TableView: Page = {
  id: "table",
  label: "Statistics",
  Icon: TableChartIcon,
};

export const GridView: Page = {
  id: "grid",
  label: "App View",
  Icon: AppsIcon,
};

export const UpdateView: Page = {
  id: "update",
  label: "Update Scan",
  Icon: PlaylistAddIcon,
  isActive: config => !!config.newScanSheet,
};
