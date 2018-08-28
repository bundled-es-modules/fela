# fela

This is a mirror of [fela](https://www.npmjs.com/package/fela), bundled and exposed as ES module.

## Install

```
npm install @bundled-es-modules/fela
bower install bundled-es-modules/fela
```

## Use

```html
<script type="module">
  // from main file
  import { createRenderer, combineRules, enhance } from 'fela';
  // or directly
  import { createRenderer, combineRules, enhance } from 'fela/fela.js';
  console.log(createRenderer, combineRules, enhance);
</script>
```

Make sure you added `@bundled-es-modules` scope to the path if used via npm.
