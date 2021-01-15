import React from "react";
import renderer from "react-test-renderer";

import SocialLinks from "../SocialLinks";

describe("SocialLinks", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<SocialLinks />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
