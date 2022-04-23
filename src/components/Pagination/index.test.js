import React from "react";
import { render } from "@testing-library/react";
import { LocaleContext } from "../Layout";

import Pagination from "../Pagination";
import useTranslations from "../../i18n/translations/useTranslations";

jest.mock("../../i18n/translations/useTranslations");

useTranslations.mockImplementation(() => ({
  Prev: "Previous",
  of: "of",
  Next: "Next",
}));

describe("Pagination", () => {
  test.each([
    [0, 1, null, null],
    [0, 2, null, "a"],
    [1, 2, "b", null],
    [1, 3, "c", "d"],
  ])("renders correctly", (currentPage, numPages, prevPage, nextPage) => {
    const language = { path: "/", code: "en" };
    const { container } = render(
      <LocaleContext.Provider value={{ language }}>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </LocaleContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
