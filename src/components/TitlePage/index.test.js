import React from "react";
import renderer from "react-test-renderer";

import TitlePage from "../TitlePage";

describe("TitlePage", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<TitlePage text="Hello, World" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
