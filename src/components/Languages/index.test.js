import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import each from "jest-each";
import { navigate } from "gatsby";

import languages from "../../i18n/languages";
import Languages from "../Languages";
import { LocaleContext } from "../Layout";

describe("Languages", () => {
  let localizedLinks = {};
  const handleLanguageSelectedMock = jest.fn();
  const allLanguages = Object.entries(languages).map(
    ([lang, langProps]) => langProps,
  );
  const createLocaleContext = (language) => ({
    language: {
      code: language,
    },
  });

  beforeEach(() => {
    navigate.mockClear();
    handleLanguageSelectedMock.mockClear();
    localizedLinks = {};
  });

  it("renders correctly when not active", () => {
    const { container } = render(
      <LocaleContext.Provider value={createLocaleContext("en")}>
        <Languages
          isActive={false}
          handleLanguageSelected={handleLanguageSelectedMock}
          localizedLinks={localizedLinks}
        />
      </LocaleContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  each(allLanguages).it("renders correctly with %s active", (language) => {
    const { container } = render(
      <LocaleContext.Provider value={createLocaleContext(language.code)}>
        <Languages
          isActive={true}
          handleLanguageSelected={handleLanguageSelectedMock}
          localizedLinks={localizedLinks}
        />
      </LocaleContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  each(allLanguages).describe("click %s", (language) => {
    describe("when active", () => {
      beforeEach(() => {
        //render with current language active in context
        render(
          <LocaleContext.Provider value={createLocaleContext(language.code)}>
            <Languages
              isActive={true}
              handleLanguageSelected={handleLanguageSelectedMock}
            />
          </LocaleContext.Provider>,
        );
      });

      it("does not navigate", () => {
        fireEvent.click(screen.getByText(language.name));

        expect(navigate).not.toHaveBeenCalled();
      });

      it("calls handleLanguageSelected", () => {
        fireEvent.click(screen.getByText(language.name));

        expect(handleLanguageSelectedMock).toHaveBeenCalledTimes(1);
      });
    });

    describe("when not active", () => {
      beforeEach(() => {
        //render with different language in context
        render(
          <LocaleContext.Provider value={createLocaleContext("xx")}>
            <Languages
              isActive={true}
              handleLanguageSelected={handleLanguageSelectedMock}
              localizedLinks={localizedLinks}
            />
          </LocaleContext.Provider>,
        );
      });

      it("calls handleLanguageSelected", () => {
        fireEvent.click(screen.getByText(language.name));

        expect(handleLanguageSelectedMock).toHaveBeenCalledTimes(1);
      });

      it("navigates to localized path", () => {
        const localizedPath = "/localized-path";
        localizedLinks[language.code] = { path: localizedPath };

        fireEvent.click(screen.getByText(language.name));

        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(language.path + localizedPath);
      });
    });
  });
});
