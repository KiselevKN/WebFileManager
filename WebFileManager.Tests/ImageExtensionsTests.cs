using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Drawing;
using System.IO;
using System.Drawing.Imaging;
using WebFileManager.Core.Extensions;

namespace WebFileManager.Tests
{
    [TestClass]
    public class ImageExtensionsTests
    {
        [TestMethod]
        public void ScaleImageTest()
        {
            var fakeBitmap = new Bitmap(10, 10);
            fakeBitmap.SetPixel(0, 0, Color.Red);

            byte[] expectedBytes;
            using (var ms = new MemoryStream())
            {
                fakeBitmap.Save(ms, ImageFormat.Png);
                expectedBytes = ms.ToArray();
            }

            Image actualImage;
            using (var ms = new MemoryStream(expectedBytes))
                actualImage = Image.FromStream(ms);

            Assert.AreEqual(10, actualImage.Width);
            Assert.AreEqual(10, actualImage.Height);

            var scaleImage = actualImage.ScaleImage(20, 20);

            Assert.AreEqual(10, scaleImage.Width);
            Assert.AreEqual(10, scaleImage.Height);

            scaleImage = actualImage.ScaleImage(8, 8);

            Assert.AreEqual(8, scaleImage.Width);
            Assert.AreEqual(8, scaleImage.Height);
        }

        [TestMethod]
        public void ParseExBase64Test()
        {
            string exBase64 = "data:image/png;base64,iVBORw0KGgoAAAAN";
            var tuple = exBase64.ParseExBase64();

            Assert.AreEqual("data:image/png;base64", tuple.Item1);
            Assert.AreEqual("iVBORw0KGgoAAAAN", tuple.Item2);
        }

        [TestMethod]
        public void Base64ToExBase64Test()
        {
            string data = "data:image/png;base64";
            string base64 = "iVBORw0KGgoAAAAN";

            Assert.AreEqual("data:image/png;base64,iVBORw0KGgoAAAAN", base64.Base64ToExBase64(data));
        }

        [TestMethod]
        public void Base64ToImageTest()
        {
            string base64 = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhUlEQVQ4T+3TMQrCQBAF0BfQRs+lYG0jknvY2aTxJiKIpU0u4HmMYBUQIQvBSDa4Kd12Zt6H3dlM4skS5wVgihVmLfCKeywgAAfsPppvWKLqQwJwxjqW1qo/kePyK/C2jtimACds/sCId/BtkWJrUWAfXmGCBeaxqab+QIl6tM80MLjb9gIzyRsRxdcCDQAAAABJRU5ErkJggg==";

            var image = base64.Base64ToImage();

            Assert.AreEqual(16, image.Width);
            Assert.AreEqual(16, image.Height);
        }

        [TestMethod]
        public void ImageToExBase64Test()
        {
            var exBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhUlEQVQ4T+3TMQrCQBAF0BfQRs+lYG0jknvY2aTxJiKIpU0u4HmMYBUQIQvBSDa4Kd12Zt6H3dlM4skS5wVgihVmLfCKeywgAAfsPppvWKLqQwJwxjqW1qo/kePyK/C2jtimACds/sCId/BtkWJrUWAfXmGCBeaxqab+QIl6tM80MLjb9gIzyRsRxdcCDQAAAABJRU5ErkJggg==";

            var tuple = exBase64.ParseExBase64();
            var data = tuple.Item1;
            var base64 = tuple.Item2;
            var image = base64.Base64ToImage();

            Assert.AreEqual(16, image.Width);
            Assert.AreEqual(16, image.Height);

            var result = image.ImageToExBase64(data);

            var imageResult = result.ParseExBase64().Item2.Base64ToImage();

            Assert.AreEqual(16, imageResult.Width);
            Assert.AreEqual(16, imageResult.Height);
        }

        [TestMethod]
        public void GetExtensionFromDataTest()
        {
            string data = "data:image/png;base64";

            Assert.AreEqual("png", data.GetExtensionFromData());
        }

        [TestMethod]
        public void FileExtensionToImageFormatTest()
        {
            Assert.AreEqual(ImageFormat.Png, "png".FileExtensionToImageFormat());
            Assert.AreEqual(ImageFormat.Jpeg, "jpg".FileExtensionToImageFormat());
            Assert.AreEqual(ImageFormat.Jpeg, "jpeg".FileExtensionToImageFormat());
        }

        [TestMethod]
        [ExpectedException(typeof(FormatException))]
        public void FileExtensionToImageFormatExTest()
        {
            "".FileExtensionToImageFormat();
        }
    }
}
