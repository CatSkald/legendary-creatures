import React from "react";
import { render } from "@testing-library/react";

import { allLanguages } from "../../../__mocks__/all-languages";
import { LocaleContext } from "../Layout";
import NavigationBar from "../NavigationBar";

describe("NavigationBar", () => {
  const handleToggleMenuMock = jest.fn();

  beforeEach(() => {
    handleToggleMenuMock.mockClear();
  });

  describe.each(allLanguages)(
    "renders correctly for language %s",
    (language) => {
      test.each([true, false])("when isActive %s", (isActive) => {
        const { container } = render(
          <LocaleContext.Provider value={{ language }}>
            <NavigationBar
              handleToggleMenu={handleToggleMenuMock}
              isActive={isActive}
            />
          </LocaleContext.Provider>,
        );
        expect(container).toMatchSnapshot();
      });
    },
  );
});
