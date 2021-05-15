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
- Run website locally: `yarn develop`
- Run CMS locally: `yarn build-serve`
- Deploy: `yarn deploy`

### Debug

- If using [![Visual Studio Code](https://img.shields.io/badge/VSCode-007ACC?logo=visual-studio-code)](https://code.visualstudio.com/): set setting `Auto Attach: On`
- Run: `node --nolazy --inspect-brk node_modules/gatsby/dist/bin/gatsby develop`

### Local URLs

- [Website](http://localhost:8000/)
- [GraphQL](http://localhost:8000/___graphql)
- [CMS](http://localhost:9000/admin/)

## Thanks

Inspired by [Gatsby starter](https://github.com/diogorodrigues/iceberg-gatsby-multilang) from [diogorodrigues](https://github.com/diogorodrigues).
