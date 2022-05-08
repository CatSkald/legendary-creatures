import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import HamburgerButton from "../HamburgerButton";

describe("HamburgerButton", () => {
  test.each([true, false])("renders correctly when active is %s", (active) => {
    const { container } = render(
      <HamburgerButton handleClick={jest.fn()} isActive={active} />,
    );
    expect(container).toMatchSnapshot();
  });

  test("click invokes handleClick", () => {
    const mockCallback = jest.fn();
    render(<HamburgerButton handleClick={mockCallback} isActive={true} />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
