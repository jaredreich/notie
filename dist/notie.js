(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["notie"] = factory();
	else
		root["notie"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// ====================
// options
// ====================

var positions = {
  top: 'top',
  bottom: 'bottom'
};

var options = {
  alertTime: 3,
  dateMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  overlayClickDismiss: true,
  overlayOpacity: 0.75,
  transitionCurve: 'ease',
  transitionDuration: 0.3,
  transitionSelector: 'all',
  classes: {
    container: 'notie-container',
    textbox: 'notie-textbox',
    textboxInner: 'notie-textbox-inner',
    button: 'notie-button',
    element: 'notie-element',
    elementHalf: 'notie-element-half',
    elementThird: 'notie-element-third',
    overlay: 'notie-overlay',
    backgroundSuccess: 'notie-background-success',
    backgroundWarning: 'notie-background-warning',
    backgroundError: 'notie-background-error',
    backgroundInfo: 'notie-background-info',
    backgroundNeutral: 'notie-background-neutral',
    backgroundOverlay: 'notie-background-overlay',
    alert: 'notie-alert',
    inputField: 'notie-input-field',
    selectChoiceRepeated: 'notie-select-choice-repeated',
    dateSelectorInner: 'notie-date-selector-inner',
    dateSelectorUp: 'notie-date-selector-up'
  },
  ids: {
    overlay: 'notie-overlay'
  },
  positions: {
    alert: positions.top,
    force: positions.top,
    confirm: positions.top,
    input: positions.top,
    select: positions.bottom,
    date: positions.top
  }
};

var setOptions = exports.setOptions = function setOptions(newOptions) {
  options = _extends({}, options, newOptions, {
    classes: _extends({}, options.classes, newOptions.classes),
    ids: _extends({}, options.ids, newOptions.ids),
    positions: _extends({}, options.positions, newOptions.positions)
  });
};

// ====================
// helpers
// ====================

var tick = function tick() {
  return new Promise(function (resolve) {
    return setTimeout(resolve, 0);
  });
};
var wait = function wait(time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time * 1000);
  });
};

var blur = function blur() {
  document.activeElement && document.activeElement.blur();
};

var generateRandomId = function generateRandomId() {
  // RFC4122 version 4 compliant UUID
  var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
  return 'notie-' + id;
};

var typeToClassLookup = {
  1: options.classes.backgroundSuccess,
  success: options.classes.backgroundSuccess,
  2: options.classes.backgroundWarning,
  warning: options.classes.backgroundWarning,
  3: options.classes.backgroundError,
  error: options.classes.backgroundError,
  4: options.classes.backgroundInfo,
  info: options.classes.backgroundInfo,
  5: options.classes.backgroundNeutral,
  neutral: options.classes.backgroundNeutral
};

var getTransition = function getTransition() {
  return options.transitionSelector + ' ' + options.transitionDuration + 's ' + options.transitionCurve;
};

var enterClicked = function enterClicked(event) {
  return event.keyCode === 13;
};
var escapeClicked = function escapeClicked(event) {
  return event.keyCode === 27;
};

var makeElement = function makeElement(elemType, classes) {
  var element = document.createElement(elemType);
  if (classes) {
    classes.forEach(function (c) {
      return element.classList.add(c);
    });
  }
  return element;
};

var addToDocument = function addToDocument(element, position) {
  element.classList.add(options.classes.container);
  element.style[position] = '-10000px';
  document.body.appendChild(element);
  element.style[position] = '-' + element.offsetHeight + 'px';

  if (element.listener) window.addEventListener('keydown', element.listener);

  tick().then(function () {
    element.style.transition = getTransition();
    element.style[position] = 0;
  });
};

var removeFromDocument = function removeFromDocument(id, position) {
  var element = document.getElementById(id);
  if (!element) return;
  element.style[position] = '-' + element.offsetHeight + 'px';

  if (element.listener) window.removeEventListener('keydown', element.listener);

  wait(options.transitionDuration).then(function () {
    if (element.parentNode) element.parentNode.removeChild(element);
  });
};

var addOverlayToDocument = function addOverlayToDocument(owner, position) {
  var element = makeElement('div', [options.classes.overlay, options.classes.backgroundOverlay]);
  element.id = options.ids.overlay;
  element.style.opacity = 0;
  if (owner && options.overlayClickDismiss) {
    element.onclick = function () {
      removeFromDocument(owner.id, position);
      removeOverlayFromDocument();
    };
  }

  document.body.appendChild(element);

  tick().then(function () {
    element.style.transition = getTransition();
    element.style.opacity = options.overlayOpacity;
  });
};

var removeOverlayFromDocument = function removeOverlayFromDocument() {
  var element = document.getElementById(options.ids.overlay);
  element.style.opacity = 0;
  wait(options.transitionDuration).then(function () {
    if (element.parentNode) element.parentNode.removeChild(element);
  });
};

var hideAlerts = exports.hideAlerts = function hideAlerts(callback) {
  var alertsShowing = document.getElementsByClassName(options.classes.alert);
  if (alertsShowing.length) {
    for (var i = 0; i < alertsShowing.length; i++) {
      var _alert = alertsShowing[i];
      removeFromDocument(_alert.id, _alert.position);
    }
    if (callback) wait(options.transitionDuration).then(function () {
      return callback();
    });
  }
};

// ====================
// shared elements
// ====================

var div = function div(classes) {
  var element = makeElement('div', classes);
  element.id = generateRandomId();
  return element;
};

var button = function button(innerHTML, classes, onclick) {
  var element = makeElement('div', classes);
  element.innerHTML = innerHTML;
  element.onclick = onclick;
  return element;
};

var textbox = function textbox(text, classes) {
  var element = div(classes);
  element.innerHTML = '<div class="' + options.classes.textboxInner + '">' + text + '</div>';
  return element;
};

// ====================
// exports
// ====================

var alert = exports.alert = function alert(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === undefined ? 4 : _ref$type,
      text = _ref.text,
      _ref$time = _ref.time,
      time = _ref$time === undefined ? options.alertTime : _ref$time,
      _ref$stay = _ref.stay,
      stay = _ref$stay === undefined ? false : _ref$stay,
      _ref$position = _ref.position,
      position = _ref$position === undefined ? options.positions.alert || position.top : _ref$position;

  blur();
  hideAlerts();

  var element = textbox(text, [options.classes.textbox, typeToClassLookup[type], options.classes.alert]);
  element.position = position;
  element.onclick = function () {
    return removeFromDocument(element.id, position);
  };

  element.listener = function (event) {
    if (enterClicked(event) || escapeClicked(event)) hideAlerts();
  };

  addToDocument(element, position);

  if (time && time < 1) time = 1;
  if (!stay && time) wait(time).then(function () {
    return removeFromDocument(element.id, position);
  });
};

var force = exports.force = function force(_ref2, callbackArg) {
  var _ref2$type = _ref2.type,
      type = _ref2$type === undefined ? 5 : _ref2$type,
      text = _ref2.text,
      _ref2$buttonText = _ref2.buttonText,
      buttonText = _ref2$buttonText === undefined ? 'OK' : _ref2$buttonText,
      callback = _ref2.callback,
      _ref2$position = _ref2.position,
      position = _ref2$position === undefined ? options.positions.force || position.top : _ref2$position;

  blur();
  hideAlerts();

  var element = div();

  var elementText = textbox(text, [options.classes.textbox, options.classes.backgroundInfo]);

  var elementButton = button(buttonText, [options.classes.button, typeToClassLookup[type]], function () {
    removeFromDocument(element.id, position);
    removeOverlayFromDocument();
    if (callback) callback();else if (callbackArg) callbackArg();
  });

  element.appendChild(elementText);
  element.appendChild(elementButton);

  element.listener = function (event) {
    if (enterClicked(event)) elementButton.click();
  };

  addToDocument(element, position);

  addOverlayToDocument();
};

var confirm = exports.confirm = function confirm(_ref3, submitCallbackArg, cancelCallbackArg) {
  var text = _ref3.text,
      _ref3$submitText = _ref3.submitText,
      submitText = _ref3$submitText === undefined ? 'Yes' : _ref3$submitText,
      _ref3$cancelText = _ref3.cancelText,
      cancelText = _ref3$cancelText === undefined ? 'Cancel' : _ref3$cancelText,
      submitCallback = _ref3.submitCallback,
      cancelCallback = _ref3.cancelCallback,
      _ref3$position = _ref3.position,
      position = _ref3$position === undefined ? options.positions.confirm || position.top : _ref3$position;

  blur();
  hideAlerts();

  var element = div();

  var elementText = textbox(text, [options.classes.textbox, options.classes.backgroundInfo]);

  var elementButtonLeft = button(submitText, [options.classes.button, options.classes.elementHalf, options.classes.backgroundSuccess], function () {
    removeFromDocument(element.id, position);
    removeOverlayFromDocument();
    if (submitCallback) submitCallback();else if (submitCallbackArg) submitCallbackArg();
  });

  var elementButtonRight = button(cancelText, [options.classes.button, options.classes.elementHalf, options.classes.backgroundError], function () {
    removeFromDocument(element.id, position);
    removeOverlayFromDocument();
    if (cancelCallback) cancelCallback();else if (cancelCallbackArg) cancelCallbackArg();
  });

  element.appendChild(elementText);
  element.appendChild(elementButtonLeft);
  element.appendChild(elementButtonRight);

  element.listener = function (event) {
    if (enterClicked(event)) elementButtonLeft.click();else if (escapeClicked(event)) elementButtonRight.click();
  };

  addToDocument(element, position);

  addOverlayToDocument(element, position);
};

var input = function input(_ref4, submitCallbackArg, cancelCallbackArg) {
  var text = _ref4.text,
      _ref4$submitText = _ref4.submitText,
      submitText = _ref4$submitText === undefined ? 'Submit' : _ref4$submitText,
      _ref4$cancelText = _ref4.cancelText,
      cancelText = _ref4$cancelText === undefined ? 'Cancel' : _ref4$cancelText,
      submitCallback = _ref4.submitCallback,
      cancelCallback = _ref4.cancelCallback,
      _ref4$position = _ref4.position,
      position = _ref4$position === undefined ? options.positions.input || position.top : _ref4$position,
      settings = _objectWithoutProperties(_ref4, ['text', 'submitText', 'cancelText', 'submitCallback', 'cancelCallback', 'position']);

  blur();
  hideAlerts();

  var element = div();

  var elementText = textbox(text, [options.classes.textbox, options.classes.backgroundInfo]);

  var elementInput = makeElement('input', [options.classes.inputField]);

  elementInput.setAttribute('autocapitalize', settings.autocapitalize || 'none');
  elementInput.setAttribute('autocomplete', settings.autocomplete || 'off');
  elementInput.setAttribute('autocorrect', settings.autocorrect || 'off');
  elementInput.setAttribute('autofocus', settings.autofocus || 'true');
  elementInput.setAttribute('inputmode', settings.inputmode || 'verbatim');
  elementInput.setAttribute('max', settings.max || '');
  elementInput.setAttribute('maxlength', settings.maxlength || '');
  elementInput.setAttribute('min', settings.min || '');
  elementInput.setAttribute('minlength', settings.minlength || '');
  elementInput.setAttribute('placeholder', settings.placeholder || '');
  elementInput.setAttribute('spellcheck', settings.spellcheck || 'default');
  elementInput.setAttribute('step', settings.step || 'any');
  elementInput.setAttribute('type', settings.type || 'text');

  elementInput.value = settings.value || '';

  // As-you-type input restrictions
  if (settings.allowed) {
    elementInput.oninput = function () {
      var regex = void 0;
      if (Array.isArray(settings.allowed)) {
        var regexString = '';
        var allowed = settings.allowed;
        for (var i = 0; i < allowed.length; i++) {
          if (allowed[i] === 'an') regexString += '0-9a-zA-Z';else if (allowed[i] === 'a') regexString += 'a-zA-Z';else if (allowed[i] === 'n') regexString += '0-9';
          if (allowed[i] === 's') regexString += ' ';
        }
        regex = new RegExp('[^' + regexString + ']', 'g');
      } else if (_typeof(settings.allowed) === 'object') {
        regex = settings.allowed;
      }
      elementInput.value = elementInput.value.replace(regex, '');
    };
  }

  var elementButtonLeft = button(submitText, [options.classes.button, options.classes.elementHalf, options.classes.backgroundSuccess], function () {
    removeFromDocument(element.id, position);
    removeOverlayFromDocument();
    if (submitCallback) submitCallback(elementInput.value);else if (submitCallbackArg) submitCallbackArg(elementInput.value);
  });

  var elementButtonRight = button(cancelText, [options.classes.button, options.classes.elementHalf, options.classes.backgroundError], function () {
    removeFromDocument(element.id, position);
    removeOverlayFromDocument();
    if (cancelCallback) cancelCallback(elementInput.value);else if (cancelCallbackArg) cancelCallbackArg(elementInput.value);
  });

  element.appendChild(elementText);
  element.appendChild(elementInput);
  element.appendChild(elementButtonLeft);
  element.appendChild(elementButtonRight);

  element.listener = function (event) {
    if (enterClicked(event)) elementButtonLeft.click();else if (escapeClicked(event)) elementButtonRight.click();
  };

  addToDocument(element, position);

  elementInput.focus();

  addOverlayToDocument(element, position);
};

exports.input = input;
var select = exports.select = function select(_ref5, cancelCallbackArg) {
  var text = _ref5.text,
      _ref5$cancelText = _ref5.cancelText,
      cancelText = _ref5$cancelText === undefined ? 'Cancel' : _ref5$cancelText,
      cancelCallback = _ref5.cancelCallback,
      choices = _ref5.choices,
      _ref5$position = _ref5.position,
      position = _ref5$position === undefined ? options.positions.select || position.top : _ref5$position;

  blur();
  hideAlerts();

  var element = div();

  var elementText = textbox(text, [options.classes.textbox, options.classes.backgroundInfo]);

  element.appendChild(elementText);

  choices.forEach(function (_ref6, index) {
    var _ref6$type = _ref6.type,
        type = _ref6$type === undefined ? 1 : _ref6$type,
        text = _ref6.text,
        handler = _ref6.handler;

    var elementChoice = div([typeToClassLookup[type], options.classes.button, options.classes.selectChoice]);

    var nextChoice = choices[index + 1];
    if (nextChoice && !nextChoice.type) nextChoice.type = 1;
    if (nextChoice && nextChoice.type === type) {
      elementChoice.classList.add(options.classes.selectChoiceRepeated);
    }

    elementChoice.innerHTML = text;
    elementChoice.onclick = function () {
      removeFromDocument(element.id, position);
      removeOverlayFromDocument();
      handler();
    };

    element.appendChild(elementChoice);
  });

  var elementCancel = button(cancelText, [options.classes.backgroundNeutral, options.classes.button], function () {
    removeFromDocument(element.id, position);
    removeOverlayFromDocument();
    if (cancelCallback) cancelCallback();else if (cancelCallbackArg) cancelCallbackArg();
  });

  element.appendChild(elementCancel);

  element.listener = function (event) {
    if (escapeClicked(event)) elementCancel.click();
  };

  addToDocument(element, position);

  addOverlayToDocument(element, position);
};

var date = exports.date = function date(_ref7, submitCallbackArg, cancelCallbackArg) {
  var _ref7$value = _ref7.value,
      value = _ref7$value === undefined ? new Date() : _ref7$value,
      _ref7$submitText = _ref7.submitText,
      submitText = _ref7$submitText === undefined ? 'OK' : _ref7$submitText,
      _ref7$cancelText = _ref7.cancelText,
      cancelText = _ref7$cancelText === undefined ? 'Cancel' : _ref7$cancelText,
      submitCallback = _ref7.submitCallback,
      cancelCallback = _ref7.cancelCallback,
      _ref7$position = _ref7.position,
      position = _ref7$position === undefined ? options.positions.date || position.top : _ref7$position;

  blur();
  hideAlerts();

  var arrow = '&#9662';

  var elementDateThird = function elementDateThird() {
    return div([options.classes.element, options.classes.elementThird]);
  };

  var elementDateMonth = elementDateThird();
  var elementDateDay = elementDateThird();
  var elementDateYear = elementDateThird();

  var setValueHTML = function setValueHTML(date) {
    elementDateMonth.innerHTML = options.dateMonths[date.getMonth()];
    elementDateDay.innerHTML = date.getDate();
    elementDateYear.innerHTML = date.getFullYear();
  };

  var handleDayInput = function handleDayInput(event) {
    var daysInMonth = new Date(value.getFullYear(), value.getMonth() + 1, 0).getDate();
    var day = event.target.textContent.replace(/^0+/, '').replace(/[^\d]/g, '').slice(0, 2);
    if (Number(day) > daysInMonth) day = daysInMonth.toString();
    event.target.textContent = day;
    if (Number(day) < 1) day = '1';
    value.setDate(Number(day));
  };

  var handleYearInput = function handleYearInput(event) {
    var year = event.target.textContent.replace(/^0+/, '').replace(/[^\d]/g, '').slice(0, 4);
    event.target.textContent = year;
    value.setFullYear(Number(year));
  };

  var handleBlur = function handleBlur(event) {
    setValueHTML(value);
  };

  var updateMonth = function updateMonth(amount) {
    var daysInNextMonth = new Date(value.getFullYear(), value.getMonth() + amount + 1, 0).getDate();
    if (value.getDate() > daysInNextMonth) value.setDate(daysInNextMonth);
    value.setMonth(value.getMonth() + amount);
    setValueHTML(value);
  };

  var updateDay = function updateDay(amount) {
    value.setDate(value.getDate() + amount);
    setValueHTML(value);
  };

  var updateYear = function updateYear(amount) {
    var nextYear = value.getFullYear() + amount;
    if (nextYear < 0) value.setFullYear(0);else value.setFullYear(value.getFullYear() + amount);
    setValueHTML(value);
  };

  var element = div();
  var elementDateSelector = div([options.classes.backgroundInfo]);
  var elementDateSelectorInner = div([options.classes.dateSelectorInner]);

  var downButton = function downButton(onclick) {
    return button(arrow, [options.classes.button, options.classes.elementThird], onclick);
  };

  var upButton = function upButton(onclick) {
    var element = downButton(onclick);
    element.classList.add(options.classes.dateSelectorUp);
    return element;
  };

  var elementDateUpMonth = upButton(function () {
    return updateMonth(1);
  });
  var elementDateUpDay = upButton(function () {
    return updateDay(1);
  });
  var elementDateUpYear = upButton(function () {
    return updateYear(1);
  });

  elementDateMonth.innerHTML = options.dateMonths[value.getMonth()];

  elementDateDay.setAttribute('contentEditable', true);
  elementDateDay.addEventListener('input', handleDayInput);
  elementDateDay.addEventListener('blur', handleBlur);
  elementDateDay.innerHTML = value.getDate();

  elementDateYear.setAttribute('contentEditable', true);
  elementDateYear.addEventListener('input', handleYearInput);
  elementDateYear.addEventListener('blur', handleBlur);
  elementDateYear.innerHTML = value.getFullYear();

  var elementDateDownMonth = downButton(function () {
    return updateMonth(-1);
  });
  var elementDateDownDay = downButton(function () {
    return updateDay(-1);
  });
  var elementDateDownYear = downButton(function () {
    return updateYear(-1);
  });

  var elementButtonLeft = button(submitText, [options.classes.button, options.classes.elementHalf, options.classes.backgroundSuccess], function () {
    removeFromDocument(element.id, position);
    removeOverlayFromDocument();
    if (submitCallback) submitCallback(value);else if (submitCallbackArg) submitCallbackArg(value);
  });

  var elementButtonRight = button(cancelText, [options.classes.button, options.classes.elementHalf, options.classes.backgroundError], function () {
    removeFromDocument(element.id, position);
    removeOverlayFromDocument();
    if (cancelCallback) cancelCallback(value);else if (cancelCallbackArg) cancelCallbackArg(value);
  });

  elementDateSelectorInner.appendChild(elementDateUpMonth);
  elementDateSelectorInner.appendChild(elementDateUpDay);
  elementDateSelectorInner.appendChild(elementDateUpYear);
  elementDateSelectorInner.appendChild(elementDateMonth);
  elementDateSelectorInner.appendChild(elementDateDay);
  elementDateSelectorInner.appendChild(elementDateYear);
  elementDateSelectorInner.appendChild(elementDateDownMonth);
  elementDateSelectorInner.appendChild(elementDateDownDay);
  elementDateSelectorInner.appendChild(elementDateDownYear);
  elementDateSelector.appendChild(elementDateSelectorInner);
  element.appendChild(elementDateSelector);
  element.appendChild(elementButtonLeft);
  element.appendChild(elementButtonRight);

  element.listener = function (event) {
    if (enterClicked(event)) elementButtonLeft.click();else if (escapeClicked(event)) elementButtonRight.click();
  };

  addToDocument(element, position);

  addOverlayToDocument(element, position);
};

exports.default = {
  alert: alert,
  force: force,
  confirm: confirm,
  input: input,
  select: select,
  date: date,
  setOptions: setOptions,
  hideAlerts: hideAlerts
};

/***/ })
/******/ ]);
});