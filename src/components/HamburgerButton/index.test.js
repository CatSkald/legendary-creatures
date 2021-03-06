import React from "react";
import { render, fireEvent } from "@testing-library/react";
import each from "jest-each";

import HamburgerButton from "../HamburgerButton";

describe("HamburgerButton", () => {
  each([true, false]).it("renders correctly when active is %s", (active) => {
    const { container } = render(
      <HamburgerButton handleClick={jest.fn()} isActive={active} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("click invokes handleClick", () => {
    const mockCallback = jest.fn();
    const { container } = render(
      <HamburgerButton handleClick={mockCallback} isActive={true} />,
    );

    fireEvent.click(container.firstChild);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
