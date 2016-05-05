using System;
using System.Drawing;
using System.IO;
using WebFileManager.Core.Configuration;
using WebFileManager.Core.Enums;
using WebFileManager.Core.Models;
using WebFileManager.Core.Extensions;
using WebFileManager.Core.Properties;

namespace WebFileManager.Core.Managers
{
    public class FolderManager:  BaseFileManager, IFolderManager
    {
        #region fields

        private ICacheManager cacheManager;

        #endregion

        #region ctors

        private FolderManager()
        {

        }

        public FolderManager(string pathToRootFolder, string rootFolderName, ICacheManager cacheManager) : base(pathToRootFolder, rootFolderName)
        {
            this.cacheManager = cacheManager;
        }

        #endregion

        #region IFolderManager

        public FolderInfo GetFolder(string path, IconSize size)
        {
            var folderInfo = new FolderInfo();
            folderInfo.Path = path;

            var dir = new DirectoryInfo(Path.Combine(pathToRootFolder, path));

            var subDirs = dir.GetDirectories();

            foreach(var subDir in subDirs)
            {
                folderInfo.SubFolders.Add(new SubFolderInfo() {
                    Name = subDir.Name,
                    CreationTime = subDir.CreationTime,
                    ModificationTime = subDir.LastWriteTime
                });
            }

            var files = dir.GetFiles();

            foreach(var file in files)
            {
                var extension = file.Name.GetExtension().ToLowerInvariant();

                if (extension == "jpg")
                    extension = "jpeg";

                string iconExBase64 = null;

                if(extension.IsImage() && ((size == IconSize.Medium) || (size == IconSize.Large)))
                {
                    if (!cacheManager.Exist(file.FullName))
                    {
                        var iconSize = GetIconSizeFromConfig(size);

                        using (var sourceImage = Image.FromFile(file.FullName))
                        {
                            var image = sourceImage.ScaleImage(iconSize, iconSize);
                            iconExBase64 = image.ImageToExBase64(string.Format("data:image/{0};base64", extension));

                            cacheManager.Insert(file.FullName, iconExBase64);
                        }
                    }
                    else
                        iconExBase64 = (string)cacheManager.Get(file.FullName);
                }

                folderInfo.Files.Add(new Models.FileInfo() {
                    Name = file.Name,
                    Icon = iconExBase64,
                    CreationTime = file.CreationTime,
                    ModificationTime = file.LastWriteTime,
                    IsReadOnly = file.IsReadOnly,
                    Size = file.Length
                });
            }

            return folderInfo;
        }

        public void Create(string path, string newFolderName)
        {
            if (string.IsNullOrEmpty(newFolderName))
                throw new Exception(Resources.EmptyFolderName);

            var _path = Path.Combine(pathToRootFolder, path, newFolderName);

            if (Directory.Exists(_path))
                throw new Exception(string.Format(Resources.FolderAlreadyExists, newFolderName));

            Directory.CreateDirectory(_path);
        }

        public void Delete(string path, string folderName)
        {
            var _path = Path.Combine(pathToRootFolder, path, folderName);

            if (!Directory.Exists(_path))
                throw new Exception(string.Format(Resources.FolderNotFound, folderName));

            Directory.Delete(_path, true);
        }

        public void Delete(string path, string[] folderNames)
        {
            foreach(var folderName in folderNames)
            {
                var _path = Path.Combine(pathToRootFolder, path, folderName);
                if (Directory.Exists(_path))
                    Directory.Delete(_path, true);
            }
        }

        public bool Exists(string path, string folderName)
        {
            var _path = Path.Combine(pathToRootFolder, path, folderName);
            return Directory.Exists(_path);
        }

        public void Rename(string path, string oldFolderName, string newFolderName)
        {
            if (string.IsNullOrEmpty(newFolderName))
                throw new Exception(Resources.EmptyFolderName);

            var oldPath = Path.Combine(pathToRootFolder, path, oldFolderName);
            var newPath = Path.Combine(pathToRootFolder, path, newFolderName);

            if (Directory.Exists(newPath))
                throw new Exception(string.Format(Resources.FolderAlreadyExists, newFolderName));

            if (!Directory.Exists(oldPath))
                throw new Exception(string.Format(Resources.FolderNotFound, oldFolderName));

            Directory.Move(oldPath, newPath);
        }

        #endregion

        #region private methods

        private int GetIconSizeFromConfig(IconSize size)
        {
            if (size == IconSize.Large)
                return WebFileManagerConfigurationSection.GetSection().IconSize.Large;
            else if (size == IconSize.Medium)
                return WebFileManagerConfigurationSection.GetSection().IconSize.Medium;
            else
                return WebFileManagerConfigurationSection.GetSection().IconSize.Small;
        }

        #endregion
    }
}
