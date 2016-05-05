using System.Configuration;

namespace WebFileManager.Core.Configuration
{
    public class FileTypeIconConfigurationElement : ConfigurationElement
    {
        [ConfigurationProperty("fileExtension", IsKey = true, IsRequired = true)]
        public string FileExtension
        {
            get { return (string)this["fileExtension"]; }
            set { this["fileExtension"] = value; }
        }

        [ConfigurationProperty("fileBase64", IsRequired = true)]
        public string FileBase64
        {
            get { return (string)this["fileBase64"]; }
            set { this["fileBase64"] = value; }
        }
    }
}
