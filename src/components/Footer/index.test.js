import React from "react";
import { render } from "@testing-library/react";
import { LocaleContext } from "../Layout";

import Footer from "../Footer";
import useTranslations from "../../i18n/translations/useTranslations";

import { allLanguages } from "../../../__test-helpers__/all-languages.helper";

jest.mock("../../i18n/translations/useTranslations");

useTranslations.mockImplementation(() => ({
  footerMoto: "hello, world",
}));

describe("Footer", () => {
  test.each(allLanguages)("renders correctly for language %s", (language) => {
    const { container } = render(
      <LocaleContext.Provider value={{ language }}>
        <Footer />
      </LocaleContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
