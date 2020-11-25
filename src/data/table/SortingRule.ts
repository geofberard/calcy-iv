import { ColumnDesc } from "./ColumnDesc";

export interface SortingRule {
  column: ColumnDesc;
  ascending: boolean;
}