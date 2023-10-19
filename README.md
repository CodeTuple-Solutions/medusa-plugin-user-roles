# medusa-plugin-user-roles

Provides roles and their permissions for users.

[Documentation](https://codetuple.io)

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
