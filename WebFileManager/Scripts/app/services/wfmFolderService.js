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