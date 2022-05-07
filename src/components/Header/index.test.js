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
        <Header handleToggleColorTheme={jest.fn()} selectedThemeIcon="⨀" />
      </LocaleContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
