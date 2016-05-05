using WebFileManager.Core.Extensions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace WebFileManager.Tests
{
    [TestClass]
    public class FileExtensionsTests
    {
        [TestMethod]
        public void GetFileNameTest()
        {
            var path = "c:/folder/fileName.ext";
            Assert.AreEqual("fileName.ext", path.GetFileName());
        }

        [TestMethod]
        public void GetExtensionTest()
        {
            var fileName = "fileName.ext";
            Assert.AreEqual("ext", fileName.GetExtension());
        }

        [TestMethod]
        public void IsImageTest()
        {
            Assert.IsFalse("txt".IsImage());
            Assert.IsTrue("jpg".IsImage());
        }
    }
}
