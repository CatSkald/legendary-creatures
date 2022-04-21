import React from "react";
import { render } from "@testing-library/react";

import SocialLinks from "../SocialLinks";

describe("SocialLinks", () => {
  test("renders correctly", () => {
    const { container } = render(<SocialLinks />);
    expect(container).toMatchSnapshot();
  });
});
