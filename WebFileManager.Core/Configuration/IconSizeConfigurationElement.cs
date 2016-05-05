using System.Configuration;

namespace WebFileManager.Core.Configuration
{
    public class IconSizeConfigurationElement : ConfigurationElement
    {
        [ConfigurationProperty("large", IsRequired = true)]
        public int Large
        {
            get { return (int)this["large"]; }
            set { this["large"] = value; }
        }

        [ConfigurationProperty("medium", IsRequired = true)]
        public int Medium
        {
            get { return (int)this["medium"]; }
            set { this["medium"] = value;
            }
        }

        [ConfigurationProperty("small", IsRequired = true)]
        public int Small
        {
            get { return (int)this["small"]; }
            set { this["small"] = value; }
        }
    }
}
