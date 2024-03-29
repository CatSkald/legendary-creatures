import React from "react";
import { render } from "@testing-library/react";
import { LocaleContext } from "../Layout";

import TagList from "../TagList";
import useTranslations from "../../i18n/translations/useTranslations";

import { allLanguages } from "../../../__test-helpers__/all-languages.helper";

jest.mock("../../i18n/translations/useTranslations");

useTranslations.mockImplementation(() => ({
  tag1: "tag 1",
  tag2: "tag 2",
  tag3: "tag 3",
}));

describe("TagList", () => {
  test.each(allLanguages)("renders correctly for language %s", (language) => {
    const tags = {
      tag1: ["value1", "value2"],
      tag2: ["value3"],
      tag3: [],
    };
    const { container } = render(
      <LocaleContext.Provider value={{ language }}>
        <TagList tags={tags} />
      </LocaleContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
