
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
