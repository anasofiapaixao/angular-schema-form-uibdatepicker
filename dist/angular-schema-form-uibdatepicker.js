angular.module('schemaForm').run(['$templateCache', function($templateCache) {$templateCache.put('directives/decorators/bootstrap/uibdatepicker/directive.datepicker.html','\n<div class="datepicker">\n  <input\n      type="text"\n      class="form-control"\n      placeholder="YYYY-MM-DDTHH:mm:ssZ"\n      aria-label=\'date format YYYY-MM-DDTHH:mm:ssZ\'\n      ng-model="ngModel"\n      ng-change="inputChanged(ngModel)"\n  />\n\n  <a class="input-group-addon"\n     tabindex=\'0\'\n     ng-click=\'collapse = !collapse;\'\n     role=\'button\'\n  >\n    <span class=\'glyphicon glyphicon-calendar\'></span>\n  </a>\n\n  <div class="datepicker-popup" ng-show="collapse">\n    <div uib-datepicker\n         class="well well-sm"\n         ng-model="date"\n         ng-change="datepickerChanged(date)"\n         datepicker-options="{ showWeeks: false }"\n         style="margin-bottom:0;"\n    ></div>\n    <div uib-timepicker\n         class="well well-sm"\n         ng-model="dateTime"\n         ng-change="timepickerChanged(dateTime)"\n         show-meridian="false"\n         show-seconds="true"\n    ></div>\n  </div>\n</div>');
$templateCache.put('directives/decorators/bootstrap/uibdatepicker/plugin.datepicker.html','<div class="form-group {{form.htmlClass}} schema-form-datepicker"\n     ng-class="{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false}">\n\n  <label class="control-label" ng-show="showTitle()">{{form.title}}</label>\n\n  <datepicker form="form"\n             ng-model="$$value$$"\n             schema-validate="form">\n  </datepicker>\n\n\n  <span ng-if="form.feedback !== false"\n        class="form-control-feedback"\n        ng-class="evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }"\n        aria-hidden="true"></span>\n\n\n  <div class="help-block" aria-live=\'assertive\' ng-show="((hasError() && errorMessage(schemaError())))" ng-bind-html="(hasError() && errorMessage(schemaError()))"></div>\n\n  <div class="help-block success" aria-live=\'assertive\' ng-show="form.description" ng-bind-html="form.description"></div>\n\n</div>\n');}]);

angular.module('schemaForm').directive('datepicker', function () {

  return {
    restrict: 'EA',
    require: 'ngModel',
    scope: {
      ngModel: '=',
      form: '='
    },
    link: function (scope, element, attrs, ngModel) {
      let format = 'YYYY-MM-DDTHH:mm:ss[Z]';

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
    template: 'directives/decorators/bootstrap/uibdatepicker/directive.datepicker.html'
  };
});


angular.module('schemaForm').config(
    ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
      function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

        var asfFieldType = 'datepicker';

        //=== Schema config ===//
        var datepicker = function (name, schema, options) {

          if (schema.type === 'string' && (schema.format === 'date' || schema.format === 'date-time')) {
            var f = schemaFormProvider.stdFormObj(name, schema, options);
            f.key = options.path;
            f.type = asfFieldType;
            options.lookup[sfPathProvider.stringify(options.path)] = f;
            return f;
          }
        };

        //=== Put it first in the list of functions ===//
        schemaFormProvider.defaults.string.unshift(datepicker);

        //=== Add to the bootstrap directive ===//
        schemaFormDecoratorsProvider.addMapping(
            'bootstrapDecorator',
            asfFieldType,
            'directives/decorators/bootstrap/uibdatepicker/plugin.datepicker.html'
        );
      }
    ]);
