import React from "react";
import { render } from "@testing-library/react";

import { allLanguages } from "../../../__test-helpers__/all-languages.helper";
import { LocaleContext } from "../Layout";
import NavigationBarButtons from "../NavigationBarButtons";
import useTranslations from "../../i18n/translations/useTranslations";

jest.mock("../../i18n/translations/useTranslations");

useTranslations.mockImplementation(() => ({
  ChangeLanguage: "Change language",
  clickToChange: "click to change",
  ChangeColorTheme: "Change color",
}));

describe("NavigationBarButtons", () => {
  const mock = jest.fn();
  const theme = Object.freeze({
    name: "Test Theme",
    icon: "⨁",
    cssClassName: "theme-custom",
  });

  beforeEach(() => {
    mock.mockClear();
  });

  describe.each(allLanguages)(
    "renders correctly for language %s",
    (language) => {
      test.each([false, true])(
        "when isLanguageSelectionActive %s",
        (isLanguageSelectionActive) => {
          const { container } = render(
            <LocaleContext.Provider value={{ language }}>
              <NavigationBarButtons
                handleToggleColorTheme={mock}
                handleToggleLanguageSelection={mock}
                selectedTheme={theme}
                isLanguageSelectionActive={isLanguageSelectionActive}
              />
            </LocaleContext.Provider>,
          );
          expect(container).toMatchSnapshot();
        },
      );
    },
  );
});
