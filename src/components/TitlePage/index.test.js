import React from "react";
import { render } from "@testing-library/react";

import TitlePage from "../TitlePage";

describe("TitlePage", () => {
  test("renders correctly", () => {
    const { container } = render(<TitlePage text="Hello, World" />);
    expect(container).toMatchSnapshot();
  });
});
