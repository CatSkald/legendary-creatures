import React from "react";
import * as Gatsby from "gatsby";
import { render } from "@testing-library/react";
import each from "jest-each";

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

  each(["en", "uk", "ru"]).it(
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
