
const parse = require('date-fns/parse');
const format = require('date-fns/format');
const isValid = require('date-fns/is_valid');
const template = require('./directive.datepicker.html');

angular.module('schemaForm').directive('datepicker', function () {

  return {
    restrict: 'EA',
    require: 'ngModel',
    scope: {
      ngModel: '=',
      form: '='
    },
    link: function (scope, element, attrs, ngModel) {
      let formatString = 'YYYY-MM-DDTHH:mm:ss[Z]';

      let toDate = dateString =>
          dateString ? parse(dateString, formatString) : null;

      let toDateString = date =>
          date ? format(date, formatString) : "";

      let isValidDate = date =>
          !date && !scope.form.required ||
          angular.isDate(date) && !isNaN(date);

      let isValidDateString = dateString =>
          (!dateString || isValid(parse(dateString, formatString))) &&
          isValidDate(toDate(dateString));

      // uib-datepicker clears the time information, so we need two models
      scope.date = toDate(scope.ngModel);
      scope.dateTime = toDate(scope.ngModel);

      scope.ctrl = ngModel;


      scope.timepickerChanged = newDate => {
        ngModel.$setDirty();
        scope.ngModel = toDateString(newDate);
        scope.date = toDate(scope.ngModel);
      };
      scope.datepickerChanged = newDate => {
        ngModel.$setDirty();
        if(!scope.dateTime) {
          scope.dateTime = new Date(newDate);
        } else {
          scope.dateTime.setFullYear(newDate.getFullYear());
          scope.dateTime.setMonth(newDate.getMonth());
          scope.dateTime.setDate(newDate.getDate());
        }

        // set a new object to trigger the uib-timepicker model update
        scope.dateTime = new Date(scope.dateTime);

        scope.ngModel = toDateString(scope.dateTime);
        scope.date = new Date(scope.dateTime);
      };
      scope.inputChanged = newDateString => {
        ngModel.$setDirty();
        scope.date = toDate(newDateString);
        scope.dateTime = toDate(newDateString);
      };


      ngModel.$validators.date = (modelValue) =>
          isValidDateString(modelValue);
    },
    template: template
  };
});
