using System.IO;

namespace WebFileManager.Core
{
    public class BaseFileManager
    {
        #region fields

        protected string pathToRootFolder;
        protected string rootFolderName;    

        #endregion

        #region ctors

        protected BaseFileManager() {}

        public BaseFileManager(string pathToRootFolder, string rootFolderName)
        {
            this.pathToRootFolder = pathToRootFolder;
            this.rootFolderName = rootFolderName;        

            CreateRootFolderIfNoExist();
        }

        #endregion

        #region private methods

        private void CreateRootFolderIfNoExist()
        {
            var path = Path.Combine(pathToRootFolder, rootFolderName);
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
        }

        #endregion
    }
}