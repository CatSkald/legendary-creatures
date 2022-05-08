import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { navigate } from "gatsby";

import { allLanguages } from "../../../__test-helpers__/all-languages.helper";
import Languages from "../Languages";
import { LocaleContext } from "../Layout";

describe("Languages", () => {
  let localizedLinks = {};
  const handleLanguageSelectedMock = jest.fn();
  const createLocaleContext = (language) => ({
    language: {
      code: language,
    },
  });

  const renderLanguages = (languageCode, isActive = true) =>
    render(
      <LocaleContext.Provider value={createLocaleContext(languageCode)}>
        <Languages
          isActive={isActive}
          handleLanguageSelected={handleLanguageSelectedMock}
          localizedLinks={localizedLinks}
        />
      </LocaleContext.Provider>,
    );

  beforeEach(() => {
    navigate.mockClear();
    handleLanguageSelectedMock.mockClear();
    localizedLinks = {};
  });

  test("renders correctly when not active", () => {
    const { container } = renderLanguages("en", false);

    expect(container).toMatchSnapshot();
  });

  test.each(allLanguages)("renders correctly with %s active", (language) => {
    const { container } = renderLanguages(language.code);

    expect(container).toMatchSnapshot();
  });

  describe.each(allLanguages)("click %s", (language) => {
    describe("when active", () => {
      test("does not navigate", () => {
        renderLanguages(language.code);

        fireEvent.click(screen.getByText(language.name));

        expect(navigate).not.toHaveBeenCalled();
      });

      test("calls handleLanguageSelected", () => {
        renderLanguages(language.code);

        fireEvent.click(screen.getByText(language.name));

        expect(handleLanguageSelectedMock).toHaveBeenCalledTimes(1);
      });
    });

    describe("when not active", () => {
      test("calls handleLanguageSelected", () => {
        renderLanguages("xx");

        fireEvent.click(screen.getByText(language.name));

        expect(handleLanguageSelectedMock).toHaveBeenCalledTimes(1);
      });

      test("navigates to localized path", () => {
        const localizedPath = "/localized-path";
        localizedLinks[language.code] = { path: localizedPath };
        renderLanguages("xx");

        fireEvent.click(screen.getByText(language.name));

        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(language.path + localizedPath);
      });
    });
  });
});
