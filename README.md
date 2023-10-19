<p align="center">
  <a href="https://www.medusa-commerce.com">
    <img alt="Medusa" src="https://user-images.githubusercontent.com/7554214/129161578-19b83dc8-fac5-4520-bd48-53cba676edd2.png" width="100" />
  </a>
  <a href="https://codetuple.io/">
    <img alt="CodeTuple" src="https://avatars.githubusercontent.com/u/97082103" width="100" />
  </a>
</p>
<h1 align="center">
  Medusa Plugin User Roles
</h1>

<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Medusa is released under the MIT license." />
  </a>
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>
Provides roles and their permissions for users.

[Need Help ?](https://codetuple.io)

If you are not familiar with Medusa, you can learn more on [the project web site](https://www.medusajs.com/).

> Medusa is a set of commerce modules and tools that allow you to build rich, reliable, and performant commerce applications without reinventing core commerce logic. The modules can be customized and used to build advanced ecommerce stores, marketplaces, or any product that needs foundational commerce primitives. All modules are open-source and freely available on npm.

### This plugin is under development and should be considered experimental.

Breaking changes are very likely to occur.

## Features

- Admin user create roles and permissions.
- Admin user assign roles to users.

## Add Plugin Configuration

To pass a plugin its configurations on a Medusa backend, you have to add it to the _plugins_ array in `medusa-config.js`:

```js
const plugins = [
  // ...
  {
    resolve: "medusa-plugin-user-roles",
    options: {
      enableUI: true,
    },
  },
];
```

## Test the Plugin

1. Run the following command in the directory of the Medusa backend to run the backend:

```js
npm run start
```
