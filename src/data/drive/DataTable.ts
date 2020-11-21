export interface DataTable {
  getNumberOfRows: () => number;
  getValue: (row: number, column: number) => any;
}
