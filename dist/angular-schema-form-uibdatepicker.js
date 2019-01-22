(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("angular-schema-form-uibdatepicker", [], factory);
	else if(typeof exports === 'object')
		exports["angular-schema-form-uibdatepicker"] = factory();
	else
		root["angular-schema-form-uibdatepicker"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/plugin.datepicker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/directive.datepicker.html":
/*!***************************************!*\
  !*** ./src/directive.datepicker.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var v1='<div class=datepicker><input type=text class=form-control placeholder={{options.placeholder}} aria-label={{options.placeholder}} ng-model=ngModel ng-change="inputChanged(ngModel)"> <a class=input-group-addon tabindex=0 ng-click="collapse = !collapse;" role=button><span class="glyphicon glyphicon-calendar"></span></a><div class=datepicker-popup ng-show=collapse><div uib-datepicker class="well well-sm" ng-model=date ng-change=datepickerChanged(date) datepicker-options=options.datepickerOptions style=margin-bottom:0></div><div uib-timepicker class="well well-sm" ng-model=dateTime ng-change=timepickerChanged(dateTime) show-meridian=options.showMeridian show-seconds=options.showSeconds></div></div></div>';
angular.module('ng').run(['$templateCache', function ($templateCache) {$templateCache.put('src/directive.datepicker.html', v1);}]);
module.exports=v1

/***/ }),

/***/ "./src/directive.datepicker.js":
/*!*************************************!*\
  !*** ./src/directive.datepicker.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var template = __webpack_require__(/*! ./directive.datepicker.html */ "./src/directive.datepicker.html");

angular.module('schemaForm').directive('datepicker', ['moment', function (moment) {
  return {
    restrict: 'EA',
    require: 'ngModel',
    scope: {
      ngModel: '=',
      form: '='
    },
    link: function link(scope, element, attrs, ngModel) {
      var defaultOptions = {
        format: 'YYYY-MM-DDTHH:mm:ss[Z]',
        placeholder: '',
        datepickerOptions: {
          showWeeks: false
        },
        showMeridian: false,
        showSeconds: true
      };
      scope.options = angular.extend({}, defaultOptions, scope.form.options || {});
      var format = scope.options.format;

      if (!scope.options.placeholder) {
        scope.options.placeholder = moment(new Date()).format(format);
      }

      var toDate = function toDate(dateString) {
        return dateString ? moment(dateString, format).toDate() : null;
      };

      var toDateString = function toDateString(date) {
        return date ? moment(date).format(format) : "";
      };

      var isValidDate = function isValidDate(date) {
        return !date && !scope.form.required || angular.isDate(date) && !isNaN(date);
      };

      var isValidDateString = function isValidDateString(dateString) {
        return (!dateString || moment(dateString, format, true).isValid()) && isValidDate(toDate(dateString));
      }; // uib-datepicker clears the time information, so we need two models


      scope.date = toDate(scope.ngModel);
      scope.dateTime = toDate(scope.ngModel);
      scope.ctrl = ngModel;

      scope.timepickerChanged = function (newDate) {
        ngModel.$setDirty();
        scope.ngModel = toDateString(newDate);
        scope.date = toDate(scope.ngModel);
      };

      scope.datepickerChanged = function (newDate) {
        ngModel.$setDirty();

        if (!scope.dateTime) {
          scope.dateTime = new Date(newDate);
        } else {
          scope.dateTime.setFullYear(newDate.getFullYear());
          scope.dateTime.setMonth(newDate.getMonth());
          scope.dateTime.setDate(newDate.getDate());
        } // set a new object to trigger the uib-timepicker model update


        scope.dateTime = new Date(scope.dateTime);
        scope.ngModel = toDateString(scope.dateTime);
        scope.date = new Date(scope.dateTime);
      };

      scope.inputChanged = function (newDateString) {
        ngModel.$setDirty();
        scope.date = toDate(newDateString);
        scope.dateTime = toDate(newDateString);
      };

      ngModel.$validators.date = function (modelValue) {
        return isValidDateString(modelValue);
      };
    },
    template: template
  };
}]);

/***/ }),

/***/ "./src/plugin.datepicker.html":
/*!************************************!*\
  !*** ./src/plugin.datepicker.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var v1='<div class="form-group {{form.htmlClass}} schema-form-datepicker" ng-class="{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false}"><label class=control-label ng-show=showTitle()>{{form.title}}</label><datepicker form=form ng-model=$$value$$ schema-validate=form></datepicker><span ng-if="form.feedback !== false" class=form-control-feedback ng-class="evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }" aria-hidden=true></span><div class=help-block aria-live=assertive ng-show="((hasError() && errorMessage(schemaError())))" ng-bind-html="(hasError() && errorMessage(schemaError()))"></div><div class="help-block success" aria-live=assertive ng-show=form.description ng-bind-html=form.description></div></div>';
angular.module('ng').run(['$templateCache', function ($templateCache) {$templateCache.put('src/plugin.datepicker.html', v1);}]);
module.exports=v1

/***/ }),

/***/ "./src/plugin.datepicker.js":
/*!**********************************!*\
  !*** ./src/plugin.datepicker.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./directive.datepicker.js */ "./src/directive.datepicker.js");

var template = __webpack_require__(/*! ./plugin.datepicker.html */ "./src/plugin.datepicker.html");

angular.module('schemaForm').config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider', function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {
  var asfFieldType = 'datepicker'; //=== Schema config ===//

  var datepicker = function datepicker(name, schema, options) {
    if (schema.type === 'string' && (schema.format === 'date' || schema.format === 'date-time')) {
      var f = schemaFormProvider.stdFormObj(name, schema, options);
      f.key = options.path;
      f.type = asfFieldType;
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  }; //=== Put it first in the list of functions ===//


  schemaFormProvider.defaults.string.unshift(datepicker); //=== Add to the bootstrap directive ===//

  schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', asfFieldType, 'src/plugin.datepicker.html');
}]);

/***/ })

/******/ });
});
//# sourceMappingURL=angular-schema-form-uibdatepicker.js.map