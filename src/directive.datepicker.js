
const template = require('./directive.datepicker.html');

angular.module('schemaForm').directive('datepicker', ['moment', function (moment) {

  return {
    restrict: 'EA',
    require: 'ngModel',
    scope: {
      ngModel: '=',
      form: '='
    },
    link: function (scope, element, attrs, ngModel) {
      const defaultOptions = {
        format: 'YYYY-MM-DDTHH:mm:ss[Z]',
        placeholder: '',
        datepickerOptions: { showWeeks: false },
        showMeridian: false,
        showSeconds: true
      };

      scope.options = angular.extend({}, defaultOptions, scope.form.options || {});
      let format = scope.options.format;

      if(!scope.options.placeholder) {
        scope.options.placeholder = 'e.g.: ' + moment(new Date()).format(format);
      }

      let toDate = dateString =>
          dateString ? moment(dateString, format).toDate() : null;

      let toDateString = date =>
          date ? moment(date).format(format) : "";

      let isValidDate = date =>
          !date && !scope.form.required ||
          angular.isDate(date) && !isNaN(date);

      let isValidDateString = dateString =>
          (!dateString || moment(dateString, format, true).isValid()) &&
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
}]);
