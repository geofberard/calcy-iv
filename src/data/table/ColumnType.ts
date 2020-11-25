export interface ColumnType {
  align: "left" | "center" | "right" | "justify" | "inherit";
  sort: (a: any, b: any) => number;
}

export const COL_STRING: ColumnType = {
  align: "left",
  sort: (a: string, b: string) => a.localeCompare(b),
};

export const COL_NUMBER: ColumnType = {
  align: "right",
  sort: (a: number, b: number) => a - b,
};
