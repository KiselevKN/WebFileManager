using System.Configuration;

namespace WebFileManager.Core.Configuration
{
    public class FileTypeIconsConfigurationElement: ConfigurationElementCollection
    {
        public FileTypeIconConfigurationElement this[int index]
        {
            get { return BaseGet(index) as FileTypeIconConfigurationElement; }
            set
            {
                if (BaseGet(index) != null)
                    BaseRemoveAt(index);

                BaseAdd(index, value);
            }
        }
        protected override ConfigurationElement CreateNewElement()
        {
            return new FileTypeIconConfigurationElement();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            return ((FileTypeIconConfigurationElement)element).FileExtension;
        }

    }
}
