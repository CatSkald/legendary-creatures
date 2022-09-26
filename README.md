# Legendary Creatures and Fabulous Beasts

[![legendary-creatures.github.io](https://img.shields.io/badge/legendary--creatures.github.io-247329)](https://legendary-creatures.github.io)

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen)](/LICENSE)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-brightgreen?logo=Creative-Commons)](https://creativecommons.org/licenses/by-sa/4.0/)

[![Framework: Gatsby](https://img.shields.io/badge/Framework-Gatsby-663399?logo=Gatsby)](https://www.gatsbyjs.org/)
[![CMS: Forestry](https://img.shields.io/badge/CMS-Forestry-21e09e)](https://forestry.io/)

## Local Development

### Prerequisites

[![npm](https://img.shields.io/badge/Install-npm-CB3837?logo=NPM)](https://www.npmjs.com/)
[![Yarn](https://img.shields.io/badge/Install-Yarn-2C8EBB?logo=Yarn)](https://yarnpkg.com/)
[![Gatsby CLI](https://img.shields.io/badge/Install-Gatsby_CLI-663399?logo=Gatsby)](https://www.gatsbyjs.com/docs/reference/gatsby-cli/)

### Setup

- Clone the repository: `git clone ...`
- Add upstream to the production environment (only if you need to release to prod): `git remote add upstream ...`
- Install the project dependencies by running `yarn` in the root folder

### Run

- Build: `yarn build`
- Run website locally: `yarn start`
- Run CMS locally: `yarn serve`
- Deploy: `yarn deploy`
- Fix vulnerabilities: `npx yarn-audit-fix && yarn dedupe`
- Upgrade packages: `yarn up "*" "@*/*" && yarn dedupe`

### Debug

The `launch.json` contains the setup for [![Visual Studio Code](https://img.shields.io/badge/VSCode-007ACC?logo=visual-studio-code)](https://code.visualstudio.com/). Just run the app (`yarn develop`) and choose `Debug in Chrome` from the debug menu.

### Local URLs

- [Website](http://localhost:8000/)
- [GraphQL](http://localhost:8000/___graphql)
- [CMS](http://localhost:9000/admin/)

## Thanks

- Inspired by [![Gatsby starter Iceberg](https://img.shields.io/badge/Gatsby_starter-Iceberg-663399)](https://github.com/diogorodrigues/iceberg-gatsby-multilang) by [diogorodrigues](https://github.com/diogorodrigues)
- [![Font Vollkorn](https://img.shields.io/badge/Font-Vollkorn-000b1d?logo=Google-Fonts)](https://fonts.google.com/specimen/Vollkorn#about) by [Friedrich Althausen](https://github.com/FAlthausen)
- [![Typographic Scale Calculator](https://img.shields.io/badge/Typography-Typographic_Scale_Calculator-b1cbe0)](https://www.layoutgridcalculator.com/typographic-scale/)
- [![Accessible Colors](https://img.shields.io/badge/a11y-Accessible_Colors-c9d6de)](https://accessible-colors.com/)
