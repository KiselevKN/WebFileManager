(function () {
    'use strict';
    var app = angular.module('webFileManager', ['ui.bootstrap', 'ngAnimate', 'ngFileUpload', 'toastr', 'wfmDirectives', 'pascalprecht.translate']);
    app.config(function (toastrConfig) {
        angular.extend(toastrConfig, { closeButton: true, progressBar: true });
    });
})();
(function (app) {
    'use strict';
    app.constant('wfmConstants', {
        getIconsRoute: '/api/WebFileManager/Icons',
        getFolderRoute: '/api/WebFileManager/GetFolder',
        createFolderRoute: '/api/WebFileManager/CreateFolder',
        deleteFolderRoute: '/api/WebFileManager/DeleteFolder',
        deleteFoldersRoute: '/api/WebFileManager/DeleteFolders',
        renameFolderRoute: '/api/WebFileManager/RenameFolder',
        uploadFileRoute: '/api/WebFileManager/UploadFile',
        deleteFileRoute: '/api/WebFileManager/DeleteFile',
        deleteFilesRoute: '/api/WebFileManager/DeleteFiles',
        resizeFilesRoute: '/api/WebFileManager/ResizeImages',
        renameFileRoute: '/api/WebFileManager/RenameFile',
        templateSortingFilesRoute: '/Templates/SortingFiles',
        templateAddNewFolderRoute: '/Templates/AddNewFolder',
        templateResizeImageRoute: '/Templates/ResizeImage',
        templateDeleteSelectedRoute: '/Templates/DeleteSelected',
        templateDeleteFolderRoute: '/Templates/DeleteFolder',
        templateDeleteFileRoute: '/Templates/DeleteFile',
        templateRenameFolderRoute: '/Templates/RenameFolder',
        templateRenameFileRoute: '/Templates/RenameFile',
        templateWebFileManagerRoute: '/Templates/WebFileManager'
    });
})(angular.module('webFileManager'));
(function (app) {
    'use strict';
    app.config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('en', {
            SORT_NAME: 'Name',
            SORT_DATE: 'Date',
            SORT_TYPE: 'Type',
            SORT_SIZE: 'Size',
            NEW_FOLDER_NAME: 'Folder Name ...',
            NEW_FILE_NAME: 'File Name ...',
            ADD_NEW_FOLDER: 'Add new folder',
            WIDTH: 'W:',
            HEIGHT: 'H:',
            MAX_WIDTH: 'Max Width',
            MAX_HEIGHT: 'Max Height',
            RESIZE_SELECTED_IMAGE: 'Resize selected image',
            DELETE_SELECTED: 'Delete Selected Folders And Files',
            DELETE_FOLDER: 'Delete Folder',
            DELETE_FILE: 'Delete File',
            CONF_DELETE_SELECTED: 'Are you sure you want to delete the selected folders and files?',
            CONF_DELETE_FOLDER: 'Are you sure you want to delete this folder?',
            CONF_DELETE_FILE: 'Are you sure you want to delete this file?',
            RENAME_FOLDER: 'Rename Folder',
            RENAME_FILE: 'Rename File',
            CREATION_DATE: 'Creation Date:',
            SIZE: 'Size:',
            UPLOAD_FILES: 'Upload files',
            SORTING: 'Sorting',
            KB: ' kB',
            ADD_A_FOLDER: 'Adding Folder',
            TIMEOUT_EXPIRED: 'Timeout expired!',
            DELETING_SELECTED_FOLDERS: 'Deleting Selected Folders',
            DELETING_SELECTED_FILES: 'Deleting Selected Files',
            DELETING_FOLDER: 'Deleting Folder',
            DELETING_FILE: 'Deleting File',
            RENAMING_FOLDER: 'Renaming Folder',
            RENAMING_FILE: 'Renaming File',
            RESIZING_IMAGES: 'Resizing Images',
            UPLOADING_FILE: 'Uploading File',
            INIT: 'Initialization'
        });

        $translateProvider.translations('ru', {
            SORT_NAME: 'Имя',
            SORT_DATE: 'Дата',
            SORT_TYPE: 'Тип',
            SORT_SIZE: 'Размер',
            NEW_FOLDER_NAME: 'Имя папки ...',
            NEW_FILE_NAME: 'Имя файла ...',
            ADD_NEW_FOLDER: 'Добавить новую папку',
            WIDTH: 'Ш:',
            HEIGHT: 'В:',
            MAX_WIDTH: 'Ширина',
            MAX_HEIGHT: 'Высота',
            RESIZE_SELECTED_IMAGE: 'Изменить размер выбраных изображений',
            DELETE_SELECTED: 'Удалить выбранные каталоги и файлы',
            DELETE_FOLDER: 'Удалить каталог',
            DELETE_FILE: 'Удалить файл',
            CONF_DELETE_SELECTED: 'Удалить выбранные каталоги и файлы?',
            CONF_DELETE_FOLDER: 'Удалить выбранный каталог?',
            CONF_DELETE_FILE: 'Удалить выбранный файл?',
            RENAME_FOLDER: 'Переименовать каталог',
            RENAME_FILE: 'Переименовать файл',
            CREATION_DATE: 'Дата создания:',
            SIZE: 'Размер:',
            UPLOAD_FILES: 'Загрузка файлов',
            SORTING: 'Сортировать',
            KB: ' кБ',
            ADDING_A_FOLDER: 'Добавление папки',
            TIMEOUT_EXPIRED: 'Время ожидания истекло!',
            DELETING_SELECTED_FOLDERS: 'Удаление выбранных папок',
            DELETING_SELECTED_FILES: 'Удаление выбранных файлов',
            DELETING_FOLDER: 'Удаление каталога',
            DELETING_FILE: 'Удаление файла',
            RENAMING_FOLDER: 'Переименование каталога',
            RENAMING_FILE: 'Переименование файла',
            RESIZING_IMAGES: 'Изменение размера изображений',
            UPLOADING_FILE: 'Загрузка файла на сервер',
            INIT: 'Инициализация'
        });
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.preferredLanguage('ru');
    }]);
})(angular.module('webFileManager'));
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
(function (app) {
    'use strict';

    app.factory('wfmFolderService', wfmFolderService);

    wfmFolderService.$inject = [];

    function wfmFolderService() {

        var getSelectedSubFolderNames = function (folder) {
            var names = [];
            angular.forEach(folder.SubFolders, function (value, key) {
                if(value.Selected == true)
                    this.push(value.Name);
            }, names);
            return names;
        }

        var getSelectedFileNames = function (folder) {
            var names = [];
            angular.forEach(folder.Files, function (value, key) {
                if (value.Selected == true)
                    this.push(value.Name);
            }, names);
            return names;
        }

        var getSelectedImageNames = function (folder) {
            var names = [];
            angular.forEach(folder.Files, function (value, key) {
                if (isImage(value.Name) && value.Selected == true)
                    this.push(value.Name);
            }, names);
            return names;
        }

        var getSelectedFiles = function (folder) {
            var names = [];
            angular.forEach(folder.Files, function (value, key) {
                if (value.Selected == true)
                    this.push(value);
            }, names);
            return names;
        }

        var getSelectedImages= function (folder) {
            var names = [];
            angular.forEach(folder.Files, function (value, key) {
                if (isImage(value.Name) && value.Selected == true)
                    this.push(value);
            }, names);
            return names;
        }

        var anySubFoldersIsSelected = function (folder) {

            for (var i = 0; i < folder.SubFolders.length; ++i) {
                if (folder.SubFolders[i].Selected === true) {
                    return true;
                }
            }
            return false;
        }

        var anyFilesIsSelected = function (folder) {

            for (var i = 0; i < folder.Files.length; ++i) {
                if (folder.Files[i].Selected === true) {
                    return true;
                }
            }
            return false;
        }

        var anyImageIsSelected = function (folder) {

            for (var i = 0; i < folder.Files.length; ++i) {
                if (isImage(folder.Files[i].Name) &&  folder.Files[i].Selected === true) {
                    return true;
                }
            }
            return false;
        }

        var findIconByExtension = function(icons, extension) {
            for (var i = 0; i < icons.length; i++) {
                if (icons[i].extension === extension) {
                    return icons[i].base64;
                }
            }
            return findIconByExtension(icons, "unknown");
        }

        var isImage = function (fileName) {
            return (fileName.toLowerCase().match(/\.(jpg|jpeg|png|bmp|gif|ico)$/)) ? true : false;
        }

        var getFileExtension = function (fileName) {
            return fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
        }

        var correctFolder = function (folder, icons, size) {
            if (folder.SubFolders != null) {
                for (var i = 0; i < folder.SubFolders.length; i++) {
                    folder.SubFolders[i].Icon = findIconByExtension(icons, "folder");
                    folder.SubFolders[i].Selected = false;
                    folder.SubFolders[i].Type = "folder";
                    folder.SubFolders[i].Size = 0;
                }
            }
            if (folder.Files != null) {
                for (var j = 0; j < folder.Files.length; j++) {
                    if (!isImage(folder.Files[j].Name) || size == "Small")
                    {
                        folder.Files[j].Icon = findIconByExtension(icons, getFileExtension(folder.Files[j].Name));
                    }
                    folder.Files[j].Selected = false;
                    folder.Files[j].Type = getFileExtension(folder.Files[j].Name);

                    var path = "\\".concat(folder.Path).concat("\\");
                    path = path.concat(folder.Files[j].Name);

                    folder.Files[j].Path = path.replace(/\\/g, '/');
                }
            }
        }

        var getPathArray = function(path)
        {
            var array = path.split("\\");
            var pathArray = [];
            var subArray = [];

            for (var i = 0; i < array.length; i++) {
                subArray.push(array[i]);
                pathArray.push({ name: array[i], path: subArray.join("\\"), active: false });
            }

            pathArray[array.length - 1].active = true;

            return pathArray;
        }

        return {
            getSelectedSubFolderNames: getSelectedSubFolderNames,
            getSelectedFileNames: getSelectedFileNames,
            getSelectedImageNames: getSelectedImageNames,
            getSelectedFiles: getSelectedFiles,
            getSelectedImages: getSelectedImages,
            anySubFoldersIsSelected: anySubFoldersIsSelected,
            anyFilesIsSelected: anyFilesIsSelected,
            anyImageIsSelected: anyImageIsSelected,
            correctFolder: correctFolder,
            getPathArray: getPathArray
        };
    }
})(angular.module('webFileManager'));
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
angular.module('wfmDirectives', [])
    .directive('bigSubfolder', function () {
        return {
            restrict: 'E',
            templateUrl: 'bigSubFolderTemplate.html'
        };
    }).directive('bigFile', function () {
        return {
            restrict: 'E',
            templateUrl: 'bigFileTemplate.html'
        };
    }).directive('medSubfolder', function () {
        return {
            restrict: 'E',
            templateUrl: 'medSubFolderTemplate.html'
        };
    }).directive('medFile', function () {
        return {
            restrict: 'E',
            templateUrl: 'medFileTemplate.html'
        };
    }).directive('smSubfolder', function () {
        return {
            restrict: 'E',
            templateUrl: 'smSubFolderTemplate.html'
        };
    }).directive('smFile', function () {
        return {
            restrict: 'E',
            templateUrl: 'smFileTemplate.html'
        };
    }).directive('fileManager', ['$window','wfmConstants', function ($window, wfmConstants) {
        return {
            restrict: 'E',
            scope: {
                changeSelection: '&'
            },

            controller: ['$scope', 'wfmHttpExService', 'wfmFolderService', 'wfmConstants', function ($scope, wfmHttpExService, wfmFolderService, wfmConstants) {

                $scope.icons = [];
                $scope.folder = {};
                $scope.pathArray = [""];
                $scope.progress = false;
                $scope.deleteSelectedDisabled = true;
                $scope.resizeSelectedImageDisabled = true;
                $scope.size = "Medium";
                $scope.selectedSize = $scope.size;

                $scope.getIcons = function (size) {
                    $scope.progress = true;
                    $scope.icons = [];
                    wfmHttpExService.getIcons(size, function (response) {
                        angular.forEach(response.data, function (value, key) { this.push({ extension: key, base64: value }); }, $scope.icons);
                        $scope.getFolder("FileStorage", $scope.size);
                    });
                }

                $scope.getFolder = function (path, size) {
                    $scope.progress = true;
                    wfmHttpExService.getFolder(path, size, function (response) {
                        $scope.folder = response.data;
                        wfmFolderService.correctFolder($scope.folder, $scope.icons, $scope.size);
                        $scope.pathArray = wfmFolderService.getPathArray($scope.folder.Path);
                        $scope.progress = false;
                        $scope.deleteSelectedDisable();
                        $scope.selectedSize = $scope.size;
                    });
                }

                $scope.addNewFolder = {
                    templateUrl: wfmConstants.templateAddNewFolderRoute,
                    folderName: "",
                    ok: function (folderName) {
                        $scope.progress = true;
                        wfmHttpExService.createFolder($scope.folder.Path, folderName, function (response) {
                            $scope.getFolder($scope.folder.Path, $scope.size);
                        }, function (response) {                        
                            $scope.progress = false;
                        });
                        $scope.addNewFolder.folderName = "";
                    }
                };

                $scope.deleteFolder = {
                    templateUrl: wfmConstants.templateDeleteFolderRoute,
                    ok: function (folderName) {
                        $scope.progress = true;
                        wfmHttpExService.deleteFolder($scope.folder.Path, folderName, function (response) {
                            $scope.getFolder($scope.folder.Path, $scope.size);
                        }, function (response) {
                            $scope.progress = false;
                        });
                    }
                }

                $scope.deleteSelected = {
                    templateUrl: wfmConstants.templateDeleteSelectedRoute,
                    ok: function () {
                        $scope.progress = true;

                        var subNames = wfmFolderService.getSelectedSubFolderNames($scope.folder);
                        var fileNames = wfmFolderService.getSelectedFileNames($scope.folder);

                        if (subNames.length > 0 && fileNames.length > 0) {
                            wfmHttpExService.deleteFolders($scope.folder.Path, subNames,
                                function (response) {
                                    wfmHttpExService.deleteFiles($scope.folder.Path, fileNames,
                                        function (response) {
                                            $scope.getFolder($scope.folder.Path, $scope.size);
                                        }, function (response) {
                                            $scope.progress = false;
                                        });
                                }, function (response) {
                                    $scope.progress = false;
                                });
                        }
                        else if (subNames.length > 0 && fileNames.length == 0) {
                            wfmHttpExService.deleteFolders($scope.folder.Path, subNames,
                                function (response) {
                                    $scope.getFolder($scope.folder.Path, $scope.size);
                                }, function (response) {
                                    $scope.progress = false;
                                });
                        }

                        else if (subNames.length == 0 && fileNames.length > 0) {
                            wfmHttpExService.deleteFiles($scope.folder.Path, fileNames,
                                function (response) {
                                    $scope.getFolder($scope.folder.Path, $scope.size);
                                }, function (response) {
                                    $scope.progress = false;
                                });
                        }
                    }
                }

                $scope.renameFolder = {
                    templateUrl: wfmConstants.templateRenameFolderRoute,
                    newFolderName: "",
                    ok: function (oldName, newName) {
                        $scope.progress = true;
                        wfmHttpExService.renameFolder($scope.folder.Path, oldName, newName, function (response) {
                            $scope.getFolder($scope.folder.Path, $scope.size);                            
                        }, function (response) {
                            $scope.progress = false;
                        });
                        $scope.renameFolder.newFolderName = "";
                    }
                }

                $scope.deleteFile = {
                    templateUrl: wfmConstants.templateDeleteFileRoute,
                    ok: function (fileName) {
                        $scope.progress = true;
                        wfmHttpExService.deleteFile($scope.folder.Path, fileName, function (response) {
                            $scope.getFolder($scope.folder.Path, $scope.size);
                        }, function (response) {
                            $scope.progress = false;
                        });
                    }
                }

                $scope.renameFile = {
                    templateUrl: wfmConstants.templateRenameFileRoute,
                    newFileName: "",
                    ok: function (oldName, newName) {
                        $scope.progress = true;
                        wfmHttpExService.renameFile($scope.folder.Path, oldName, newName, function (response) {
                            $scope.getFolder($scope.folder.Path, $scope.size);                          
                        }, function (response) {
                            $scope.progress = false;
                        });
                        $scope.renameFile.newFileName = "";
                    }
                }

                $scope.resizeSelectedImage = {
                    templateUrl: wfmConstants.templateResizeImageRoute,
                    width: "",
                    height: "",
                    ok: function (width, height) {
                        $scope.progress = true;
                        var names = wfmFolderService.getSelectedImageNames($scope.folder);
                        wfmHttpExService.resizeFiles($scope.folder.Path, names, width, height,
                                function (response) {
                                    $scope.getFolder($scope.folder.Path, $scope.size);
                                }, function (response) {
                                    $scope.progress = false;
                                });
                    }
                }

                $scope.sortingFiles = {
                    templateUrl: wfmConstants.templateSortingFilesRoute,
                    filter: 'Name',
                    direction: 'Asc',
                    dir: true,
                    changeDir: function (_dir) {
                        $scope.sortingFiles.dir = (_dir == 'Asc') ? false : true;
                    }
                }

                $scope.changeSize = function () {
                    $scope.getIcons($scope.size);
                }

                $scope.deleteSelectedDisable = function () {
                    var result = (wfmFolderService.anySubFoldersIsSelected($scope.folder) || wfmFolderService.anyFilesIsSelected($scope.folder));
                    $scope.deleteSelectedDisabled = !result;
                    $scope.resizeSelectedImageDisabled = !wfmFolderService.anyImageIsSelected($scope.folder);
                     $scope.changeSelection({
                            files: wfmFolderService.getSelectedFiles($scope.folder),
                            images: wfmFolderService.getSelectedImages($scope.folder)
                     });
                }

                $scope.selectFolder = function (name) {
                    var path = $scope.folder.Path.concat("\\").concat(name);
                    $scope.getFolder(path, $scope.size);
                }

                $scope.selectRootFolder = function (path) {
                    $scope.getFolder(path, $scope.size);
                }

                $scope.uploadFiles = function (files) {
                    if (files) {
                        $scope.progress = true;
                        wfmHttpExService.uploadFiles($scope.folder.Path, files, function (response) {
                            $scope.getFolder($scope.folder.Path, $scope.size);
                        }, function (response) {
                        }, function (response) {
                            $scope.progress = false;
                        });
                    }
                }

                $scope.getIcons($scope.size);
            }],
            link: function (scope, elem, attrs) {
                scope.onResize = function () {
                    var h = $('.wfm').height();
                    var hm = $('.wfmMenu').height();
                    var hb = $('.wfmBreadcrumb').height();
                    $('.wfmBody').height(h - hm - hb - 2);

                }
                scope.onResize();

                var w = angular.element($window);
                w.bind('resize', function () {
                    scope.onResize();
                });

                scope.$watch(
                    function () {
                        return {
                            width: elem.parent().width(),
                            height: elem.parent().height(),
                        }
                    },
                   function () {
                       scope.onResize();
                   },
                   true
                );
            },
            templateUrl: wfmConstants.templateWebFileManagerRoute
        };
    }]);