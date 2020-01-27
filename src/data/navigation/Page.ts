import { SvgIconTypeMap } from "@material-ui/core/SvgIcon/SvgIcon";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export interface Page {
    id: string,
    label: string,
    Icon: OverridableComponent<SvgIconTypeMap>
}
