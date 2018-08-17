# fela

This is a mirror of [fela](https://www.npmjs.com/package/fela) for bower, bundled and exposed as ES module.

## Install

```
bower install bundled-es-modules/fela
```

## Use

```html
<script type="module">
  // from main file
  import { createRenderer, combineRules, enhance } from './bower_components/fela/index.js';
  // or directly
  import { createRenderer, combineRules, enhance } from './bower_components/fela/fela.js';
  console.log(createRenderer, combineRules, enhance);
</script>
```
