import React from "react";
import { render } from "@testing-library/react";

import { LocaleContext } from "../Layout";
import LocalizedLink from "../LocalizedLink";

describe("LocalizedLink", () => {
  test.each([
    ["/", "en"],
    ["", "ru"],
    ["/uk/", "uk"],
  ])("renders correctly for path %s and code %s", (path, code) => {
    const language = { path: path, code: code };
    const { container } = render(
      <LocaleContext.Provider value={{ language }}>
        <LocalizedLink to="my-url" />
      </LocaleContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  test("renders correct props", () => {
    const language = { path: "/", code: "en" };
    const { container } = render(
      <LocaleContext.Provider value={{ language }}>
        <LocalizedLink to="my-url" className="my-class" aria-label="test" />
      </LocaleContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  test.each(["/", "/en/", "en", ""])(
    "renders link to homepage correctly",
    (path) => {
      const language = { path: path, code: "en" };
      const { container } = render(
        <LocaleContext.Provider value={{ language }}>
          <LocalizedLink to="/" />
        </LocaleContext.Provider>,
      );
      expect(container).toMatchSnapshot();
    },
  );
});
