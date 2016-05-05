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