(function (app) {
    'use strict';

    app.factory('wfmNotificationService', wfmNotificationService);

    wfmNotificationService.$inject = ['toastr'];

    function wfmNotificationService(toastr) {

        var success = function (header, message) {
            toastr.success(message, header);
        }

        var error = function (header, message) {
            toastr.error(message, header);
        }

        return {
            success: success,
            error: error
        };
    }
})(angular.module('webFileManager'));