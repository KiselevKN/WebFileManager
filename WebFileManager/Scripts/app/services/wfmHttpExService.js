(function (app) {
    'use strict';

    app.factory('wfmHttpExService', wfmHttpExService);

    wfmHttpExService.$inject = ['wfmHttpService', 'wfmNotificationService', '$translate'];

    function wfmHttpExService(wfmHttpService, wfmNotificationService, $translate) {

        var getIcons = function (size, callbackSuccess, callbackError) {
            wfmHttpService.getIcons(size, function (response) {
                callbackSuccess(response);
            }, function (response) {
                wfmNotificationService.error($translate.instant('INIT'), (response.status == -1) ? $translate.instant('TIMEOUT_EXPIRED') : response.data.Message);
                callbackError(response);
            });
        };

        var getFolder = function (path, size, callbackSuccess, callbackError) {
            wfmHttpService.getFolder(path, size, function (response) {
                callbackSuccess(response);
            }, function (response) {
                wfmNotificationService.error($translate.instant('INIT'), (response.status == -1) ? $translate.instant('TIMEOUT_EXPIRED') : response.data.Message);
                callbackError(response);
            });
        };

        var createFolder = function (path, name, callbackSuccess, callbackError) {
            wfmHttpService.createFolder(path, name, function (response) {
                wfmNotificationService.success($translate.instant('ADDING_A_FOLDER'), response.data);
                callbackSuccess(response);
            }, function (response) {
                wfmNotificationService.error($translate.instant('ADDING_A_FOLDER'), (response.status == -1) ? $translate.instant('TIMEOUT_EXPIRED') : response.data.Message);
                callbackError(response);
            });
        };

        var deleteFolder = function (path, name, callbackSuccess, callbackError) {
            wfmHttpService.deleteFolder(path, name, function (response) {
                wfmNotificationService.success($translate.instant('DELETING_FOLDER'), response.data);
                callbackSuccess(response);
            }, function (response) {
                wfmNotificationService.error($translate.instant('DELETING_FOLDER'), (response.status == -1) ? $translate.instant('TIMEOUT_EXPIRED') : response.data.Message);
                callbackError(response);
            });
        };

        var deleteFolders = function (path, names, callbackSuccess, callbackError) {
            wfmHttpService.deleteFolders(path, names, function (response) {
                wfmNotificationService.success($translate.instant('DELETING_SELECTED_FOLDERS'), response.data);
                callbackSuccess(response);
            }, function (response) {
                wfmNotificationService.error($translate.instant('DELETING_SELECTED_FOLDERS'), (response.status == -1) ? $translate.instant('TIMEOUT_EXPIRED') : response.data.Message);
                callbackError(response);
            });
        };

        var deleteFiles = function (path, names, callbackSuccess, callbackError) {
            wfmHttpService.deleteFiles(path, names, function (response) {
                wfmNotificationService.success($translate.instant('DELETING_SELECTED_FILES'), response.data);
                callbackSuccess(response);
            }, function (response) {
                wfmNotificationService.error($translate.instant('DELETING_SELECTED_FILES'), (response.status == -1) ? $translate.instant('TIMEOUT_EXPIRED') : response.data.Message);
                callbackError(response);
            });
        };

        var renameFolder = function (path, oldName, newName, callbackSuccess, callbackError) {
            wfmHttpService.renameFolder(path, oldName, newName, function (response) {
                wfmNotificationService.success($translate.instant('RENAMING_FOLDER'), response.data);
                callbackSuccess(response);
            }, function (response) {
                wfmNotificationService.error($translate.instant('RENAMING_FOLDER'), (response.status == -1) ? $translate.instant('TIMEOUT_EXPIRED') : response.data.Message);
                callbackError(response);
            });
        };

        var deleteFile = function (path, name, callbackSuccess, callbackError) {
            wfmHttpService.deleteFile(path, name, function (response) {
                wfmNotificationService.success($translate.instant('DELETING_FILE'), response.data);
                callbackSuccess(response);
            }, function (response) {
                wfmNotificationService.error($translate.instant('DELETING_FILE'), (response.status == -1) ? $translate.instant('TIMEOUT_EXPIRED') : response.data.Message);
                callbackError(response);
            });
        };

        var renameFile = function (path, oldName, newName, callbackSuccess, callbackError) {
            wfmHttpService.renameFile(path, oldName, newName, function (response) {
                wfmNotificationService.success($translate.instant('RENAMING_FILE'), response.data);
                callbackSuccess(response);
            }, function (response) {
                wfmNotificationService.error($translate.instant('RENAMING_FILE'), (response.status == -1) ? $translate.instant('TIMEOUT_EXPIRED') : response.data.Message);
                callbackError(response);
            });
        };

        var resizeFiles = function (path, names, width, height, callbackSuccess, callbackError) {
            wfmHttpService.resizeFiles(path, names, width, height, function (response) {
                wfmNotificationService.success($translate.instant('RESIZING_IMAGES'), response.data);
                callbackSuccess(response);
            }, function (response) {
                wfmNotificationService.error($translate.instant('RESIZING_IMAGES'), (response.status == -1) ? $translate.instant('TIMEOUT_EXPIRED') : response.data.Message);
                callbackError(response);
            });
        };

        var uploadFiles = function (path, files, callbackSuccess, callbackProgress, callbackError) {
            wfmHttpService.uploadFiles(path, files, function (response) {
                wfmNotificationService.success($translate.instant('UPLOADING_FILE'), response.data);
                callbackSuccess(response);
            }, function (response) {
                wfmNotificationService.success($translate.instant('UPLOADING_FILE'), response.data);
                callbackProgress(response);
            }, function (response) {
                wfmNotificationService.error($translate.instant('UPLOADING_FILE'), (response.status == -1) ? $translate.instant('TIMEOUT_EXPIRED') : response.data.Message);
                callbackError(response);
            });
        };

        return {
            getIcons: getIcons,
            getFolder: getFolder,
            createFolder: createFolder,
            deleteFolder: deleteFolder,
            deleteFolders: deleteFolders,
            renameFolder: renameFolder,
            uploadFiles: uploadFiles,
            deleteFile: deleteFile,
            deleteFiles: deleteFiles,
            resizeFiles: resizeFiles,
            renameFile: renameFile
        };
    }
})(angular.module('webFileManager'));