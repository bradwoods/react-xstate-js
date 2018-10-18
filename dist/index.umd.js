(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.index = {})));
}(this, (function (exports) { 'use strict';

  var index = (function () {
    console.log("myFunc called");
  });

  exports.myFunc = index;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
