(function (app) {
    'use strict';

    app.filter('toKiloByte', function(){
        return function (input) {
            var kb = input / 1024.0;
            var result = kb.toFixed(2).toString();
            return result;
        };
    });
})(angular.module('webFileManager'));