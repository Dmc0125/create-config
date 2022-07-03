# Config file generator

- Installs eslint and eslint-airbnb dependencies
- Generates modified Airbnb eslint config
- Can install and configure typescript

```sh
npx config-file-generator --tsc --pkg
```

## Options

- Without options, installs `eslint`, `eslint-config-airbnb-base`, `eslint-plugin-import` and creates slightly modified .eslintrc.js

### `-tsc`

- long: `--ts-config`
- Installs `Typescript`, `@types/node` and other needed eslint plugins and generates TS config and typescript ESLint config

### `-pkg`

- long: `--create-pkg`
- Runs `npm init -y`
- Creates 4 scrips:
  - build: `tsc`
  - build:watch: `tsc -w`
  - start: `node dist/index.js`
  - dev: `nodemon dist/index.js`
