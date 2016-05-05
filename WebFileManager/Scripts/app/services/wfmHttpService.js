(function (app) {
    'use strict';

    app.factory('wfmHttpService', wfmHttpService);

    wfmHttpService.$inject = ['$http', 'wfmConstants', 'Upload', '$timeout'];

    function wfmHttpService($http, wfmConstants, Upload, $timeout) {

        var httpPostBase = function (url, data, callbackSuccess, callbackError) {
            $http({
                url: url,
                method: "POST",
                data: data,
                timeout: 10000
            }).then(function successCallback(response) {
                callbackSuccess(response);
            }).catch(function errorCallback(response) {
                callbackError(response);
            });
        };

        var getIcons = function (size, callbackSuccess, callbackError) {
            httpPostBase(wfmConstants.getIconsRoute, { "Size": size }, callbackSuccess, callbackError);
        };

        var getFolder = function (path, size, callbackSuccess, callbackError) {
            httpPostBase(wfmConstants.getFolderRoute, { "Path": path, "Size": size }, callbackSuccess, callbackError);
        };

        var createFolder = function (path, name, callbackSuccess, callbackError) {
            httpPostBase(wfmConstants.createFolderRoute, { "Path": path, "Name": name }, callbackSuccess, callbackError);
        };

        var deleteFolder = function (path, name, callbackSuccess, callbackError) {
            httpPostBase(wfmConstants.deleteFolderRoute, { "Path": path, "Name": name }, callbackSuccess, callbackError);
        };

        var deleteFolders = function (path, names, callbackSuccess, callbackError) {
            httpPostBase(wfmConstants.deleteFoldersRoute, { "Path": path, "Names": names }, callbackSuccess, callbackError);
        };

        var renameFolder = function (path, oldName, newName, callbackSuccess, callbackError) {
            httpPostBase(wfmConstants.renameFolderRoute, { "Path": path, "OldName": oldName, "NewName": newName }, callbackSuccess, callbackError);
        };

        var uploadFiles = function (path, files, callbackSuccess, callbackProgress, callbackError) {
            var route = (wfmConstants.uploadFileRoute).concat('?').concat('Path=').concat(path);
            if (files && files.length) {
                var _file = files.pop();
                Upload.upload({ url: route, data: { file: _file } })
                    .then(function (response) {
                        if (files.length <= 0)
                            callbackSuccess(response);
                        else
                            callbackProgress(response);
                        uploadFiles(path, files, callbackSuccess, callbackProgress, callbackError);

                }, function (response) {
                    callbackError(response);
                });
            }
        };

        var deleteFile = function (path, name, callbackSuccess, callbackError) {
            httpPostBase(wfmConstants.deleteFileRoute, { "Path": path, "Name": name }, callbackSuccess, callbackError);
        };

        var deleteFiles = function (path, names, callbackSuccess, callbackError) {
            httpPostBase(wfmConstants.deleteFilesRoute, { "Path": path, "Names": names }, callbackSuccess, callbackError);
        };

        var resizeFiles = function (path, names, width, height, callbackSuccess, callbackError) {
            httpPostBase(wfmConstants.resizeFilesRoute, { "Path": path, "Names": names, "Width": width, "Height": height }, callbackSuccess, callbackError);
        };

        var renameFile = function (path, oldName, newName, callbackSuccess, callbackError) {
            httpPostBase(wfmConstants.renameFileRoute, { "Path": path, "OldName": oldName, "NewName": newName }, callbackSuccess, callbackError);
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