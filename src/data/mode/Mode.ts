import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export interface Mode {
  id: string;
  label: string;
  IconOff: OverridableComponent<SvgIconTypeMap>;
  IconOn: OverridableComponent<SvgIconTypeMap>;
}
