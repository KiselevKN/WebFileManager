using System.IO;
using System.Linq;

namespace WebFileManager.Core.Extensions
{
    public static class FileExtensions
    {
        public static string GetFileName(this string path)
        {
            return Path.GetFileName(path);
        }

        public static string GetExtension(this string fileName)
        {
            return Path.GetExtension(fileName).TrimStart(new char[] {'.'}).ToLowerInvariant();
        }

        public static bool IsImage(this string extension)
        {
            return (new string[] { "jpg", "jpeg", "bmp", "gif", "png", "ico" }).Contains(extension.ToLowerInvariant());
        }
    }
}