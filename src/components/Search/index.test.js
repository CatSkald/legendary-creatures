import React from "react";
import { fireEvent, render } from "@testing-library/react";

import Search from "../Search";
import useTranslations from "../../i18n/translations/useTranslations";

import { mockWindowLocation } from "../../../__mocks__/window-location-mock";

mockWindowLocation();
jest.mock("../../i18n/translations/useTranslations");

useTranslations.mockImplementation(() => ({
  useTranslations: () => ({
    SearchUsing: () => "Search using",
    Search: () => "Search",
  }),
}));

describe("Search", () => {
  const queryTemplate = "https://localhost/?q=";

  test("renders correctly", () => {
    const { container } = render(
      <Search searchEngine="Search Me" queryTemplate={queryTemplate} />,
    );
    expect(container).toMatchSnapshot();
  });

  test("update link with entered search term", () => {
    const searchText = "text";
    const { container } = render(
      <Search searchEngine="Search Me" queryTemplate={queryTemplate} />,
    );
    const input = container.querySelector("input[type=search");
    fireEvent.change(input, { target: { value: searchText } });
    const link = container.querySelector("a");
    expect(link.href).toBe(`${queryTemplate}${searchText}`);
  });

  test("pressing Enter clicks link", () => {
    const searchText = "text";
    const { container } = render(
      <Search searchEngine="Search Me" queryTemplate={queryTemplate} />,
    );
    const input = container.querySelector("input[type=search");
    fireEvent.change(input, { target: { value: searchText } });
    fireEvent.keyPress(input, { key: "Enter", code: "Enter", charCode: 13 });

    expect(window.location.assign).toHaveBeenCalledTimes(1);
    expect(window.location.assign).toHaveBeenCalledWith(
      `${queryTemplate}${searchText}`,
    );
  });
});
