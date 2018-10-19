(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (factory((global.index = {}),global.React));
}(this, (function (exports,React) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

  var index = (function () {
    console.log("myFunc called thjjj");
  });

  var index$1 = (function () {
    return React.createElement("p", null, "MyReactComponent");
  });

  exports.myFunc = index;
  exports.MyReactComponent = index$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
