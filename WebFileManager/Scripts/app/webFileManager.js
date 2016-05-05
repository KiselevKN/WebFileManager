(function () {
    'use strict';
    var app = angular.module('webFileManager', ['ui.bootstrap', 'ngAnimate', 'ngFileUpload', 'toastr', 'wfmDirectives', 'pascalprecht.translate']);
    app.config(function (toastrConfig) {
        angular.extend(toastrConfig, { closeButton: true, progressBar: true });
    });
})();