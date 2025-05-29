# eslint-plugin-play

eslint plugin by generator eslint

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-play`:

```sh
npm install eslint-plugin-play --save-dev
```

## Usage

In your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file), import the plugin `eslint-plugin-play` and add `play` to the `plugins` key:

```js
import play from "eslint-plugin-play";

export default [
    {
        plugins: {
            play
        }
    }
];
```


Then configure the rules you want to use under the `rules` key.

```js
import play from "eslint-plugin-play";

export default [
    {
        plugins: {
            play
        },
        rules: {
            "play/rule-name": "warn"
        }
    }
];
```



## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


## generator-eslint
```bash
npm i -g yo
npm i -g generator-eslint
yo eslint:plugin
```
