using System.Linq;
using System.Collections.Generic;
using WebFileManager.Core.Configuration;
using WebFileManager.Core.Enums;
using WebFileManager.Core.Extensions;
using System.Collections;

namespace WebFileManager.Core.Managers
{
    public class IconsManager : IIconsManager
    {
        #region fields

        private ICacheManager cacheManager;

        #endregion

        #region ctors

        private IconsManager()
        {

        }

        public IconsManager(ICacheManager cacheManager)
        {
            this.cacheManager = cacheManager;
        }

        #endregion

        #region IIconManager

        public Dictionary<string, string> GetFileTypeIcons(IconSize size)
        {
            cacheManager.Clear();

            var dictionary = new Dictionary<string, string>();

            dictionary.Add("folder", GetFolderIconExBase64(size));
            dictionary.Add("unknown", GetUnknownFileIconBase64(size));
            GetFileTypeIconsBase64(size, dictionary);

            return dictionary;
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

        private string GetFolderIconExBase64(IconSize size)
        {
            var iconSize = GetIconSizeFromConfig(size);
            var iconExBase64 = WebFileManagerConfigurationSection.GetSection().FolderIcon.FileBase64;

            return CorrectIcon(iconSize, iconExBase64);
        }

        private string GetUnknownFileIconBase64(IconSize size)
        {
            var iconSize = GetIconSizeFromConfig(size);
            var iconExBase64 = WebFileManagerConfigurationSection.GetSection().UnknownFileTypeIcon.FileBase64;

            return CorrectIcon(iconSize, iconExBase64);
        }

        private void GetFileTypeIconsBase64(IconSize size, Dictionary<string, string> icons)
        {
            var iconSize = GetIconSizeFromConfig(size);

            foreach(var element in 
                WebFileManagerConfigurationSection.GetSection().FileTypeIcons.OfType<FileTypeIconConfigurationElement>())
            {
                icons.Add(element.FileExtension, CorrectIcon(iconSize, element.FileBase64));
            }
        }

        private string CorrectIcon(int size, string iconExBase64)
        {
            var tuple = iconExBase64.ParseExBase64();
            var data = tuple.Item1;
            var iconBase64 = tuple.Item2;

            return iconBase64.Base64ToImage().ScaleImage(size, size).ImageToExBase64(data);
        }

        #endregion
    }
}
