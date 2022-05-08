import React from "react";
import { render } from "@testing-library/react";

import { LocaleContext } from "../Layout";
import Header from "../Header";
import useTranslations from "../../i18n/translations/useTranslations";

import { allLanguages } from "../../../__test-helpers__/all-languages.helper";

jest.mock("../../i18n/translations/useTranslations");

useTranslations.mockImplementation(() => ({
  ChangeLanguage: "Change language",
  clickToChange: "click to change",
  ChangeColorTheme: "Change color",
}));

//TODO validate props are being used properly
describe("Header", () => {
  const theme = Object.freeze({
    name: "Test Theme",
    icon: "⨀",
    cssClassName: "theme-custom",
  });

  test.each(allLanguages)("renders correctly for language %s", (language) => {
    const { container } = render(
      <LocaleContext.Provider value={{ language }}>
        <Header handleToggleColorTheme={jest.fn()} selectedTheme={theme} />
      </LocaleContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
