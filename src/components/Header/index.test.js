import React from "react";
import { render } from "@testing-library/react";
import { LocaleContext } from "../Layout";

import Header from "../Header";

import { allLanguages } from "../../../__mocks__/all-languages";

jest.mock("../../i18n/translations/useTranslations");

//TODO validate props are being used properly
describe("Header", () => {
  test.each(allLanguages)("renders correctly for language %s", (language) => {
    const { container } = render(
      <LocaleContext.Provider value={{ language }}>
        <Header handleToggleColorTheme={jest.fn()} isDarkColorTheme={false} />
      </LocaleContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  test.each([true, false])(
    "renders correctly for isDarkColorTheme %s",
    (isDarkColorTheme) => {
      const language = { code: "en", path: "/en" };
      const { container } = render(
        <LocaleContext.Provider value={{ language }}>
          <Header
            handleToggleColorTheme={jest.fn()}
            isDarkColorTheme={isDarkColorTheme}
          />
        </LocaleContext.Provider>,
      );
      expect(container).toMatchSnapshot();
    },
  );
});
