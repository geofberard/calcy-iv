import { useEffect, useState } from "react";

export const useSpreadSheet: () => boolean = () => {
  const [isAvailable, setAvailable] = useState(false);

  useEffect(() => {
    /* global google */
    /* eslint no-undef: "error" */

    // @ts-ignore
    google.load("visualization", "1.0", { packages: ["controls", "corechart", "table"] });

    // @ts-ignore
    google.setOnLoadCallback(() => {
      setAvailable(true);
    });
  });

  return isAvailable;
};
