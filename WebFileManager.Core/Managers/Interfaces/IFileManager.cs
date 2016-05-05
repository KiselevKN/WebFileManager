namespace WebFileManager.Core.Managers
{
    public interface IFileManager
    {
        void Delete(string path, string fileName);
        void Delete(string path, string[] fileNames);
        void ResizeFiles(string path, string[] fileNames, int width, int height);
        void Rename(string path, string oldFileName, string newFileName);
        bool Exists(string path, string fileName);
        void ReadOnly(string path, string fileName, bool isReadOnly);
        string PathToRootFolder { get; }
    }
}
