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