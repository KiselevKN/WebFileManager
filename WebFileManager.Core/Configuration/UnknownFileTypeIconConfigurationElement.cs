using System.Configuration;

namespace WebFileManager.Core.Configuration
{
    public class UnknownFileTypeIconConfigurationElement : ConfigurationElement
    {
        [ConfigurationProperty("fileBase64", IsRequired = true)]
        public string FileBase64
        {
            get { return (string)this["fileBase64"]; }
            set { this["fileBase64"] = value; }
        }
    }
}
