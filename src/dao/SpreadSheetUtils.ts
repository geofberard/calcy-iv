/* eslint-disable no-undef */
import { DataTable } from "../data/drive/DataTable";

const getUrl = (driveKey: string, sheet: string) =>
  `https://docs.google.com/spreadsheets/d/${driveKey}/gviz/tq?sheet=${sheet}&headers=1`;

export const loadFromSpreadSheet = (driveKey: string, sheet: string) =>
  new Promise<DataTable>(resolve => {
    // @ts-ignore
    const query = new google.visualization.Query(getUrl(driveKey, sheet));
    query.send(response => resolve(response.getDataTable()));
  });