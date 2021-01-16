import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import each from "jest-each";

import Languages from "../Languages";
import { LocaleContext } from "../Layout";

describe("Languages", () => {
  const createLocaleContext = language => ({
    language: {
      code: language,
    },
  });

  each([
    ["en", true],
    ["en", false],
    ["uk", true],
    ["ru", true],
  ]).it("renders correctly for %s is active %s", (language, active) => {
    const { container } = render(
      <LocaleContext.Provider value={createLocaleContext(language)}>
        <Languages
          isActive={active}
          handleLanguageSelected={jest.fn()}
          localizedLinks={[]}
        />
      </LocaleContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
