using System.Configuration;

namespace WebFileManager.Core.Configuration
{
    public class WebFileManagerConfigurationSection : ConfigurationSection
    {
        public static WebFileManagerConfigurationSection GetSection()
        {
            return (WebFileManagerConfigurationSection)ConfigurationManager.GetSection("webFileManagerConfig") ?? 
                new WebFileManagerConfigurationSection();
        }

        [ConfigurationProperty("fileTypeIcons")]
        public FileTypeIconsConfigurationElement FileTypeIcons
        {
            get { return (FileTypeIconsConfigurationElement)this["fileTypeIcons"]; }
            set { this["fileTypeIcons"] = value; }
        }

        [ConfigurationProperty("folderIcon")]
        public FolderIconConfigurationElement FolderIcon
        {
            get { return (FolderIconConfigurationElement)this["folderIcon"]; }
            set { this["folderIcon"] = value; }
        }

        [ConfigurationProperty("unknownFileTypeIcon")]
        public UnknownFileTypeIconConfigurationElement UnknownFileTypeIcon
        {
            get { return (UnknownFileTypeIconConfigurationElement)this["unknownFileTypeIcon"]; }
            set { this["unknownFileTypeIcon"] = value; }
        }

        [ConfigurationProperty("iconSize")]
        public IconSizeConfigurationElement IconSize
        {
            get { return (IconSizeConfigurationElement)this["iconSize"]; }
            set { this["iconSize"] = value; }
        }
    }
}
