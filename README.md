# Config file generator

- Installs eslint and eslint-airbnb dependencies
- Generates modified Airbnb eslint config
- Can install and configure typescript

```sh
npx config-file-generator --tsc --pkg
```

## Options

- Without options, installs `eslint`, `eslint-config-airbnb-base`, `eslint-plugin-import` and creates slightly modified .eslintrc.js

### `--tsc`

- long: `--ts-config`
- Installs `Typescript`, `@types/node` and other needed eslint plugins and generates TS config and typescript ESLint config

### `--pkg`

- long: `--create-pkg`
- Runs `npm init -y`
