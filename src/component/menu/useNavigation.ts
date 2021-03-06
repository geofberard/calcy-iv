import { useEffect, useMemo, useState } from "react";
import { createHashHistory } from "history";
import { Page } from "../../data/navigation/Page";
import { findById } from "../../data/Utils";

export const useNavigation: (
  pages: Page[]
) => [Page, (page: Page) => void] = pages => {
  const historyService = useMemo(
    () => createHashHistory({ hashType: "noslash" }),
    []
  );
  const [currentPage, setCurrentPage] = useState<Page>(
    () =>
      findById(
        historyService.location.pathname.replace("/", ""),
        pages
      ) || pages[0]
  );

  useEffect(() =>
    historyService.listen((location: Location) => {
      const target = findById(location.pathname.replace("/", ""), pages);

      if (currentPage.id !== target.id) {
        setCurrentPage(target);
      }
    })
  );

  const setCurrentPageAndHistory = (page: Page) => {
    historyService.push(page.id);
    setCurrentPage(page);
  };

  return [currentPage, setCurrentPageAndHistory];
};
