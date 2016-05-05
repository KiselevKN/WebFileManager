using System;
using System.Drawing;
using System.IO;
using WebFileManager.Core.Extensions;
using WebFileManager.Core.Properties;

namespace WebFileManager.Core.Managers
{
    public class FileManager:  BaseFileManager, IFileManager
    {
        #region fields

        private ICacheManager cacheManager;

        #endregion

        #region ctors

        private FileManager()
        {

        }

        public FileManager(string pathToRootFolder, string rootFolderName, ICacheManager cacheManager) : base(pathToRootFolder, rootFolderName)
        {
            this.cacheManager = cacheManager;
        }

        #endregion

        #region IFileManager

        public void Delete(string path, string fileName)
        {
            var _path = Path.Combine(pathToRootFolder, path, fileName);

            cacheManager.Remove(_path);

            if (!File.Exists(_path))
                throw new Exception(string.Format(Resources.FileNotFound, fileName));

            File.Delete(_path);
        }

        public void Delete(string path, string[] fileNames)
        {
            foreach (var fileName in fileNames)
            {
                var _path = Path.Combine(pathToRootFolder, path, fileName);

                cacheManager.Remove(_path);

                if (File.Exists(_path))
                    File.Delete(_path);
            }
        }

        public void ResizeFiles(string path, string[] fileNames, int width, int height)
        {
            foreach (var fileName in fileNames)
            {
                var _path = Path.Combine(pathToRootFolder, path, fileName);
                if (File.Exists(_path))
                {
                    Image image;
                    using (var sourceImage = Image.FromFile(_path))
                    {
                        image = sourceImage.ScaleImage(width, height);
                    }
                    File.Delete(_path);

                    var ext = fileName.GetExtension();
                    if (ext == "ico")
                        image.Save(_path);
                    else
                        image.Save(_path, ext.FileExtensionToImageFormat());
                }
            }
        }

        public void Rename(string path, string oldFileName, string newFileName)
        {
            if (string.IsNullOrEmpty(newFileName))
                throw new Exception(Resources.EmptyFileName);

            var oldPath = Path.Combine(pathToRootFolder, path, oldFileName);
            var newPath = Path.Combine(pathToRootFolder, path, newFileName);

            if (!File.Exists(oldPath))
                throw new Exception(string.Format(Resources.FileNotFound, oldFileName));

            if (File.Exists(newPath))
                throw new Exception(string.Format(Resources.FileAlreadyExists, newFileName));

            File.Move(oldPath, newPath);

            cacheManager.Remove(oldPath);
        }

        public bool Exists(string path, string fileName)
        {
            var _path = Path.Combine(pathToRootFolder, path, fileName);
            return File.Exists(_path);
        }

        public void ReadOnly(string path, string fileName, bool isReadOnly)
        {
            var _path = Path.Combine(pathToRootFolder, path, fileName);
            if (!File.Exists(_path))
                throw new Exception(string.Format(Resources.FileNotFound, fileName));
            FileInfo fileInfo = new FileInfo(_path);
            fileInfo.IsReadOnly = isReadOnly;
        }

        public string PathToRootFolder {
            get
            {
                return pathToRootFolder;
            }
        }

        #endregion
    }
}
