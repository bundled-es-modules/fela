function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};

function hyphenateStyleName(string) {
    return string in cache
    ? cache[string]
    : cache[string] = string
      .replace(uppercasePattern, '-$&')
      .toLowerCase()
      .replace(msPattern, '-ms-');
}

var hyphenateStyleName_1 = hyphenateStyleName;

var hyphenateProperty_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphenateProperty;



var _hyphenateStyleName2 = _interopRequireDefault(hyphenateStyleName_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hyphenateProperty(property) {
  return (0, _hyphenateStyleName2.default)(property);
}
module.exports = exports['default'];
});

unwrapExports(hyphenateProperty_1);

var cssifyDeclaration_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cssifyDeclaration;



var _hyphenateProperty2 = _interopRequireDefault(hyphenateProperty_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cssifyDeclaration(property, value) {
  return (0, _hyphenateProperty2.default)(property) + ':' + value;
}
module.exports = exports['default'];
});

var cssifyDeclaration = unwrapExports(cssifyDeclaration_1);

/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var isobject = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};

var assignStyle_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assignStyle;



var _isobject2 = _interopRequireDefault(isobject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assignStyle(base) {
  for (var _len = arguments.length, extendingStyles = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    extendingStyles[_key - 1] = arguments[_key];
  }

  for (var i = 0, len = extendingStyles.length; i < len; ++i) {
    var style = extendingStyles[i];

    for (var property in style) {
      var value = style[property];
      var baseValue = base[property];

      if ((0, _isobject2.default)(value)) {
        base[property] = assignStyle({}, baseValue, value);
        continue;
      }

      base[property] = value;
    }
  }

  return base;
}
module.exports = exports['default'];
});

var assignStyle = unwrapExports(assignStyle_1);

var arrayEach_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = arrayEach;
function arrayEach(arr, iterator) {
  for (var i = 0, len = arr.length; i < len; ++i) {
    iterator(arr[i], i, len, arr);
  }
}
});

var arrayEach = unwrapExports(arrayEach_1);

var arrayReduce_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = arrayReduce;
function arrayReduce(arr, reducer, initialValue) {
  for (var i = 0, len = arr.length; i < len; ++i) {
    initialValue = reducer(initialValue, arr[i], i, len, arr);
  }

  return initialValue;
}
});

var arrayReduce = unwrapExports(arrayReduce_1);

var objectReduce = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = objectReducer;
function objectReducer(obj, reducer, initialValue) {
  for (var key in obj) {
    initialValue = reducer(initialValue, obj[key], key, obj);
  }

  return initialValue;
}
});

var objectReduce$1 = unwrapExports(objectReduce);

function generateCSSRule(selector, cssDeclaration) {
  return selector + "{" + cssDeclaration + "}";
}

var RULE_TYPE = 'RULE';
var KEYFRAME_TYPE = 'KEYFRAME';
var FONT_TYPE = 'FONT';
var STATIC_TYPE = 'STATIC';
var CLEAR_TYPE = 'CLEAR';

var _handlers;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var handlers = (_handlers = {}, _defineProperty(_handlers, RULE_TYPE, function (cluster, _ref) {
  var selector = _ref.selector,
      declaration = _ref.declaration,
      support = _ref.support,
      media = _ref.media;

  var cssRule = generateCSSRule(selector, declaration);

  if (support) {
    if (media) {
      if (!cluster.supportMediaRules[media]) {
        cluster.supportMediaRules[media] = {};
      }

      if (!cluster.supportMediaRules[media][support]) {
        cluster.supportMediaRules[media][support] = '';
      }

      cluster.supportMediaRules[media][support] += cssRule;
    } else {
      if (!cluster.supportRules[support]) {
        cluster.supportRules[support] = '';
      }

      cluster.supportRules[support] += cssRule;
    }
  } else {
    if (media) {
      if (!cluster.mediaRules[media]) {
        cluster.mediaRules[media] = '';
      }

      cluster.mediaRules[media] += cssRule;
    } else {
      cluster.rules += cssRule;
    }
  }
}), _defineProperty(_handlers, FONT_TYPE, function (cluster, _ref2) {
  var fontFace = _ref2.fontFace;

  cluster.fontFaces += fontFace;
}), _defineProperty(_handlers, KEYFRAME_TYPE, function (cluster, _ref3) {
  var keyframe = _ref3.keyframe;

  cluster.keyframes += keyframe;
}), _defineProperty(_handlers, STATIC_TYPE, function (cluster, _ref4) {
  var css = _ref4.css,
      selector = _ref4.selector;

  if (selector) {
    cluster.statics += generateCSSRule(selector, css);
  } else {
    cluster.statics += css;
  }
}), _handlers);

function generateCombinedMediaQuery(currentMediaQuery, nestedMediaQuery) {
  if (currentMediaQuery.length === 0) {
    return nestedMediaQuery;
  }

  return currentMediaQuery + " and " + nestedMediaQuery;
}

function generateCSSSelector(className) {
  var pseudo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return '.' + className + pseudo;
}

function isMediaQuery(property) {
  return property.substr(0, 6) === '@media';
}

var regex = /^(:|\[|>|&)/;

function isNestedSelector(property) {
  return regex.test(property);
}

function isSupport(property) {
  return property.substr(0, 9) === '@supports';
}

function isUndefinedValue(value) {
  return value === undefined || value === null || typeof value === 'string' && value.match(/(undefined|null)/) !== null;
}

function normalizeNestedProperty(nestedProperty) {
  if (nestedProperty.charAt(0) === '&') {
    return nestedProperty.slice(1);
  }

  return nestedProperty;
}

function processStyleWithPlugins(renderer, style, type) {
  var props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (renderer.plugins.length > 0) {
    return arrayReduce(renderer.plugins, function (processedStyle, plugin) {
      return plugin(processedStyle, type, renderer, props);
    }, style);
  }

  return style;
}

var cssifyObject_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cssifyObject;



var _cssifyDeclaration2 = _interopRequireDefault(cssifyDeclaration_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cssifyObject(style) {
  var css = '';

  for (var property in style) {
    var value = style[property];
    if (typeof value !== 'string' && typeof value !== 'number') {
      continue;
    }

    // prevents the semicolon after
    // the last rule declaration
    if (css) {
      css += ';';
    }

    css += (0, _cssifyDeclaration2.default)(property, value);
  }

  return css;
}
module.exports = exports['default'];
});

var cssifyObject = unwrapExports(cssifyObject_1);

function cssifyFontFace(fontFace) {
  return '@font-face{' + cssifyObject(fontFace) + '}';
}

function cssifyKeyframe(frames, animationName) {
  var prefixes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [''];

  var keyframe = objectReduce$1(frames, function (css, frame, percentage) {
    return '' + css + percentage + '{' + cssifyObject(frame) + '}';
  }, '');

  return arrayReduce(prefixes, function (cssKeyframe, prefix) {
    return cssKeyframe + '@' + prefix + 'keyframes ' + animationName + '{' + keyframe + '}';
  }, '');
}

function minifyCSSString(style) {
  return style.replace(/\s{2,}/g, '');
}

function cssifyStaticStyle(staticStyle, renderer) {
  if (typeof staticStyle === 'string') {
    return minifyCSSString(staticStyle);
  }

  var processedStaticStyle = processStyleWithPlugins(renderer, staticStyle, STATIC_TYPE);

  return cssifyObject(processedStaticStyle);
}

function generateAnimationName(id) {
  return "k" + id;
}

var chars = 'abcdefghijklmnopqrstuvwxyz';
var charLength = chars.length;

function generateClassName(getId) {
  var filterClassName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return true;
  };

  var startId = getId();
  var generatedClassName = generateUniqueClassName(startId);

  if (!filterClassName(generatedClassName)) {
    return generateClassName(getId, filterClassName);
  }

  return generatedClassName;
}

function generateUniqueClassName(id) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (id <= charLength) {
    return chars[id - 1] + className;
  }

  // Bitwise floor as safari performs much faster
  // https://jsperf.com/math-floor-vs-math-round-vs-parseint/55
  return generateUniqueClassName(id / charLength | 0, chars[id % charLength] + className);
}

function isBase64(property) {
  return property.substr(0, 5) === 'data:';
}

function getFontUrl(src) {
  if (isBase64(src)) {
    return src;
  }

  return '\'' + src + '\'';
}

var formats = {
  '.woff': 'woff',
  '.woff2': 'woff2',
  '.eot': 'embedded-opentype',
  '.ttf': 'truetype',
  '.otf': 'opentype',
  '.svg': 'svg',
  '.svgz': 'svg'
};

var base64Formats = {
  'image/svg+xml': 'svg',
  'application/x-font-woff': 'woff',
  'application/font-woff': 'woff',
  'application/x-font-woff2': 'woff2',
  'application/font-woff2': 'woff2',
  'font/woff2': 'woff2',
  'application/octet-stream': 'truetype',
  'application/x-font-ttf': 'truetype',
  'application/x-font-truetype': 'truetype',
  'application/x-font-opentype': 'opentype',
  'application/vnd.ms-fontobject': 'embedded-opentype',
  'application/font-sfnt': 'sfnt'
};

function getFontFormat(src) {
  if (isBase64(src)) {
    var mime = '';
    for (var i = 5;; i++) {
      // 'data:'.length === 5
      var c = src.charAt(i);

      if (c === ';' || c === ',') {
        break;
      }

      mime += c;
    }

    var fmt = base64Formats[mime];
    if (fmt) {
      return fmt;
    }

    console.warn('A invalid base64 font was used. Please use one of the following mime type: ' + Object.keys(base64Formats).join(', ') + '.');
  } else {
    var extension = '';
    for (var _i = src.length - 1;; _i--) {
      var _c = src.charAt(_i);

      if (_c === '.') {
        extension = _c + extension;
        break;
      }

      extension = _c + extension;
    }

    var _fmt = formats[extension];
    if (_fmt) {
      return _fmt;
    }

    console.warn('A invalid font-format was used in "' + src + '". Use one of these: ' + Object.keys(formats).join(', ') + '.');
  }
  return '';
}

function generateFontSource() {
  var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var fontLocals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var localSource = arrayReduce(fontLocals, function (src, local) {
    var localUrl = getFontUrl(local);
    return '{src} local(' + localUrl + '), ';
  }, '');

  return arrayReduce(files, function (src, fileSource, index) {
    var prefix = index > 0 ? ',' : '';
    var fileFormat = getFontFormat(fileSource);
    var fileUrl = getFontUrl(fileSource);

    return '' + src + prefix + 'url(' + fileUrl + ') format(\'' + fileFormat + '\')';
  }, localSource);
}

function generateStaticReference(style, selector) {
  if (typeof style === 'string') {
    return style;
  }

  if (selector) {
    return selector + JSON.stringify(style);
  }

  return '';
}

function getFontLocals(localAlias) {
  if (typeof localAlias === 'string') {
    return [localAlias];
  }

  if (Array.isArray(localAlias)) {
    return localAlias.slice();
  }

  return [];
}

function isSafeClassName(className) {
  return className.indexOf('ad') === -1;
}

function toCSSString(value) {
  if (value.charAt(0) === '"') {
    return value;
  }

  return '"' + value + '"';
}

function validateSelectorPrefix() {
  var selectorPrefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (selectorPrefix.length > 0 && selectorPrefix.match(selectorPrefix) === null) {
    console.error('An invalid selectorPrefix (' + selectorPrefix + ') has been used to create a new Fela renderer.\nIt must only contain a-Z, 0-9, - and _ while it must start with either _ or a-Z.\nSee http://fela.js.org/docs/advanced/RendererConfiguration.html');
  }

  return selectorPrefix;
}

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function createRenderer() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var renderer = {
    listeners: [],
    keyframePrefixes: config.keyframePrefixes || ['-webkit-', '-moz-'],
    plugins: config.plugins || [],
    mediaQueryOrder: config.mediaQueryOrder || [],
    supportQueryOrder: config.supportQueryOrder || [],
    ruleOrder: [/^:link/, /^:visited/, /^:hover/, /^:focus-within/, /^:focus/, /^:active/],

    selectorPrefix: validateSelectorPrefix(config.selectorPrefix),
    filterClassName: config.filterClassName || isSafeClassName,
    devMode: config.devMode || false,

    uniqueRuleIdentifier: 0,
    uniqueKeyframeIdentifier: 0,

    nodes: {},
    // use a flat cache object with pure string references
    // to achieve maximal lookup performance and memoization speed
    cache: {},

    getNextRuleIdentifier: function getNextRuleIdentifier() {
      return ++renderer.uniqueRuleIdentifier;
    },
    renderRule: function renderRule(rule) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return renderer._renderStyle(rule(props, renderer), props);
    },
    renderKeyframe: function renderKeyframe(keyframe) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var resolvedKeyframe = keyframe(props, renderer);
      var keyframeReference = JSON.stringify(resolvedKeyframe);

      if (!renderer.cache.hasOwnProperty(keyframeReference)) {
        // use another unique identifier to ensure minimal css markup
        var animationName = generateAnimationName(++renderer.uniqueKeyframeIdentifier);

        var processedKeyframe = processStyleWithPlugins(renderer, resolvedKeyframe, KEYFRAME_TYPE, props);

        var cssKeyframe = cssifyKeyframe(processedKeyframe, animationName, renderer.keyframePrefixes);

        var change = {
          type: KEYFRAME_TYPE,
          keyframe: cssKeyframe,
          name: animationName
        };

        renderer.cache[keyframeReference] = change;
        renderer._emitChange(change);
      }

      return renderer.cache[keyframeReference].name;
    },
    renderFont: function renderFont(family, files) {
      var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var localAlias = properties.localAlias,
          otherProperties = _objectWithoutProperties(properties, ['localAlias']);

      var fontReference = family + JSON.stringify(properties);
      var fontLocals = getFontLocals(localAlias);

      if (!renderer.cache.hasOwnProperty(fontReference)) {
        var fontFamily = toCSSString(family);

        var fontFace = _extends({}, otherProperties, {
          src: generateFontSource(files, fontLocals),
          fontFamily: fontFamily
        });

        var cssFontFace = cssifyFontFace(fontFace);

        var change = {
          type: FONT_TYPE,
          fontFace: cssFontFace,
          fontFamily: fontFamily
        };

        renderer.cache[fontReference] = change;
        renderer._emitChange(change);
      }

      return renderer.cache[fontReference].fontFamily;
    },
    renderStatic: function renderStatic(staticStyle, selector) {
      var staticReference = generateStaticReference(staticStyle, selector);

      if (!renderer.cache.hasOwnProperty(staticReference)) {
        var cssDeclarations = cssifyStaticStyle(staticStyle, renderer);

        var change = {
          type: STATIC_TYPE,
          css: cssDeclarations,
          selector: selector
        };

        renderer.cache[staticReference] = change;
        renderer._emitChange(change);
      }
    },
    subscribe: function subscribe(callback) {
      renderer.listeners.push(callback);

      return {
        unsubscribe: function unsubscribe() {
          return renderer.listeners.splice(renderer.listeners.indexOf(callback), 1);
        }
      };
    },
    clear: function clear() {
      renderer.uniqueRuleIdentifier = 0;
      renderer.uniqueKeyframeIdentifier = 0;
      renderer.cache = {};

      renderer._emitChange({
        type: CLEAR_TYPE
      });
    },


    _mergeStyle: assignStyle,

    _renderStyle: function _renderStyle() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var processedStyle = processStyleWithPlugins(renderer, style, RULE_TYPE, props);

      return renderer._renderStyleToClassNames(processedStyle).slice(1);
    },
    _renderStyleToClassNames: function _renderStyleToClassNames(_ref) {
      var pseudo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var media = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var support = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

      var _className = _ref._className,
          style = _objectWithoutProperties(_ref, ['_className']);

      var classNames = _className ? ' ' + _className : '';

      for (var property in style) {
        var value = style[property];

        if (isobject(value)) {
          if (isNestedSelector(property)) {
            classNames += renderer._renderStyleToClassNames(value, pseudo + normalizeNestedProperty(property), media, support);
          } else if (isMediaQuery(property)) {
            var combinedMediaQuery = generateCombinedMediaQuery(media, property.slice(6).trim());
            classNames += renderer._renderStyleToClassNames(value, pseudo, combinedMediaQuery, support);
          } else if (isSupport(property)) {
            var combinedSupport = generateCombinedMediaQuery(support, property.slice(9).trim());
            classNames += renderer._renderStyleToClassNames(value, pseudo, media, combinedSupport);
          } else {
            console.warn('The object key "' + property + '" is not a valid nested key in Fela. \nMaybe you forgot to add a plugin to resolve it? \nCheck http://fela.js.org/docs/basics/Rules.html#styleobject for more information.');
          }
        } else {
          var declarationReference = support + media + pseudo + property + value;

          if (!renderer.cache.hasOwnProperty(declarationReference)) {
            // we remove undefined values to enable
            // usage of optional props without side-effects
            if (isUndefinedValue(value)) {
              renderer.cache[declarationReference] = {
                className: ''
                /* eslint-disable no-continue */
              };continue;
              /* eslint-enable */
            }

            var className = renderer.selectorPrefix + generateClassName(renderer.getNextRuleIdentifier, renderer.filterClassName);

            var declaration = cssifyDeclaration(property, value);
            var selector = generateCSSSelector(className, pseudo);

            var change = {
              type: RULE_TYPE,
              className: className,
              selector: selector,
              declaration: declaration,
              pseudo: pseudo,
              media: media,
              support: support
            };

            renderer.cache[declarationReference] = change;
            renderer._emitChange(change);
          }

          var cachedClassName = renderer.cache[declarationReference].className;

          // only append if we got a class cached
          if (cachedClassName) {
            classNames += ' ' + cachedClassName;
          }
        }
      }

      return classNames;
    },
    _emitChange: function _emitChange(change) {
      arrayEach(renderer.listeners, function (listener) {
        return listener(change);
      });
    }
  };

  // initial setup
  renderer.keyframePrefixes.push('');

  if (config.enhancers) {
    arrayEach(config.enhancers, function (enhancer) {
      renderer = enhancer(renderer);
    });
  }

  return renderer;
}

function combineRules() {
  for (var _len = arguments.length, rules = Array(_len), _key = 0; _key < _len; _key++) {
    rules[_key] = arguments[_key];
  }

  return function (props, renderer) {
    var merge = renderer._mergeStyle || assignStyle;

    return arrayReduce(rules, function (style, rule) {
      return merge(style, rule(props, renderer));
    }, {});
  };
}

function enhance() {
  for (var _len = arguments.length, enhancers = Array(_len), _key = 0; _key < _len; _key++) {
    enhancers[_key] = arguments[_key];
  }

  return function (createRenderer) {
    return function (config) {
      return arrayReduce(enhancers, function (enhancedRenderer, enhancer) {
        enhancedRenderer = enhancer(enhancedRenderer);
        return enhancedRenderer;
      }, createRenderer(config));
    };
  };
}

export { createRenderer, combineRules, enhance };
