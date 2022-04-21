import React from "react";
import * as Gatsby from "gatsby";
import { render } from "@testing-library/react";

import { LocaleContext } from "../Layout";
import PageList from "../PageList";

function createPage() {
  return {
    node: {
      frontmatter: {
        date: new Date().toString(),
        description: "test description",
        title: "My Title",
        image: "",
      },
      fields: { slug: "/" },
    },
  };
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PageList", () => {
  const createLocaleContext = (language) => ({
    language: {
      code: language,
    },
  });

  test.each(["en", "uk", "ru"])(
    "renders correct props for %s",
    (languageCode) => {
      const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
      useStaticQuery.mockImplementation(() => ({
        listImages: {
          edges: [
            {
              node: {
                childImageSharp: {
                  metadata: { relativePath: "cover.jpg" },
                },
              },
            },
          ],
        },
      }));

      const { container } = render(
        <LocaleContext.Provider value={createLocaleContext(languageCode)}>
          <PageList pages={[createPage()]} />
        </LocaleContext.Provider>,
      );
      expect(container).toMatchSnapshot();
    },
  );
});
