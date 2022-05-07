import React from "react";
import { render } from "@testing-library/react";

import { allLanguages } from "../../../__mocks__/all-languages";
import { LocaleContext } from "../Layout";
import NavigationBarButtons from "../NavigationBarButtons";

describe("NavigationBarButtons", () => {
  const mock = jest.fn();

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
                selectedThemeIcon="⨁"
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
