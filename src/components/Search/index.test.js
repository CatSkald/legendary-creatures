import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Search from "../Search";
import useTranslations from "../../i18n/translations/useTranslations";

import { mockWindowLocation } from "../../../__test-helpers__/window-location-mock.helper";

mockWindowLocation();
jest.mock("../../i18n/translations/useTranslations");

const searchTitle = "Search";

useTranslations.mockImplementation(() => ({
  SearchUsing: "Search using",
  Search: searchTitle,
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
    render(<Search searchEngine="Search Me" queryTemplate={queryTemplate} />);

    const input = screen.getByTitle(searchTitle);
    fireEvent.change(input, { target: { value: searchText } });

    const link = screen.getByRole("button");
    expect(link.href).toBe(`${queryTemplate}${searchText}`);
  });

  test("pressing Enter clicks link", () => {
    const searchText = "text";
    render(<Search searchEngine="Search Me" queryTemplate={queryTemplate} />);

    const input = screen.getByTitle(searchTitle);
    fireEvent.change(input, { target: { value: searchText } });
    fireEvent.keyPress(input, { key: "Enter", code: "Enter", charCode: 13 });

    expect(window.location.assign).toHaveBeenCalledTimes(1);
    expect(window.location.assign).toHaveBeenCalledWith(
      `${queryTemplate}${searchText}`,
    );
  });
});
