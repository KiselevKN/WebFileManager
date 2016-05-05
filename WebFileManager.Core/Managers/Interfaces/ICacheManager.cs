namespace WebFileManager.Core.Managers
{
    public interface ICacheManager
    {
        void Insert(string key, object obj);
        bool Exist(string key);
        void Remove(string key);
        object Get(string key);
        void Clear();
        int Count { get; }
    }
}
