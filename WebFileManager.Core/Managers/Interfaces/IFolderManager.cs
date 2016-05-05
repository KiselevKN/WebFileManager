using WebFileManager.Core.Enums;
using WebFileManager.Core.Models;

namespace WebFileManager.Core.Managers
{
    public interface IFolderManager
    {
        FolderInfo GetFolder(string path, IconSize size);

        void Create(string path, string newFolderName);
        void Delete(string path, string folderName);
        void Delete(string path, string[] folderNames);
        void Rename(string path, string oldFolderName, string newFolderName);
        bool Exists(string path, string folderName);
    }
}
