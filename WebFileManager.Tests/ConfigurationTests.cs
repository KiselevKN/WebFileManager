using Microsoft.VisualStudio.TestTools.UnitTesting;
using WebFileManager.Core.Configuration;

namespace WebFileManager.Tests
{
    [TestClass]
    public class ConfigurationTests
    {
        [TestMethod]
        public void WebFileManagerConfigurationSectionTest()
        {
            var section = WebFileManagerConfigurationSection.GetSection();

            Assert.AreEqual(128, section.IconSize.Large);
            Assert.AreEqual(64, section.IconSize.Medium);
            Assert.AreEqual(24, section.IconSize.Small);

            Assert.AreEqual("folder", section.FolderIcon.FileBase64);
            Assert.AreEqual("unknownFile", section.UnknownFileTypeIcon.FileBase64);

            Assert.AreEqual(4, section.FileTypeIcons.Count);

            Assert.AreEqual("txt", section.FileTypeIcons[0].FileExtension);
            Assert.AreEqual("txtFile", section.FileTypeIcons[0].FileBase64);
            Assert.AreEqual("jpg", section.FileTypeIcons[1].FileExtension);
            Assert.AreEqual("jpgFile", section.FileTypeIcons[1].FileBase64);
            Assert.AreEqual("pdf", section.FileTypeIcons[2].FileExtension);
            Assert.AreEqual("pdfFile", section.FileTypeIcons[2].FileBase64);
            Assert.AreEqual("doc", section.FileTypeIcons[3].FileExtension);
            Assert.AreEqual("docFile", section.FileTypeIcons[3].FileBase64);
        }
    }
}
