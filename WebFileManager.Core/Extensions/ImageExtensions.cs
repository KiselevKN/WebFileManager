using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Text;

namespace WebFileManager.Core.Extensions
{
    public static class ImageExtensions
    {
        public static Image ScaleImage(this Image image, int maxWidth, int maxHeight)
        {
            var w = image.Width;
            var h = image.Height;

            if (w < maxWidth && h < maxHeight)
            {
                maxWidth = w;
                maxHeight = h;
            }

            var ratioX = (double)maxWidth / w;
            var ratioY = (double)maxHeight / h;

            var ratio = Math.Min(ratioX, ratioY);

            var newWidth = (int)(w * ratio);
            var newHeight = (int)(h * ratio);

            var newImage = new Bitmap(newWidth, newHeight);

            using (var graphics = Graphics.FromImage(newImage))
                graphics.DrawImage(image, 0, 0, newWidth, newHeight);

            return newImage;
        }

        public static Tuple<string, string> ParseExBase64(this string exBase64)
        {
            var data = exBase64.Substring(0, exBase64.IndexOf(","));
            var base64 = exBase64.Substring(exBase64.IndexOf(",") + 1);

            return Tuple.Create(data, base64);
        }

        public static string Base64ToExBase64(this string base64, string data)
        {
            var sb = new StringBuilder(data);
            sb.Append(",");
            sb.Append(base64);
            return sb.ToString();
        }

        public static Image Base64ToImage(this string base64)
        {
            byte[] imageBytes = Convert.FromBase64String(base64);
            MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);
            ms.Write(imageBytes, 0, imageBytes.Length);
            Image image = Image.FromStream(ms, true);
            return image;
        }

        public static string ImageToExBase64(this Image image, string data)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                var ext = data.GetExtensionFromData();

                if (ext == "ico")
                {
                    Icon icon = Icon.FromHandle(((Bitmap)image).GetHicon());
                    icon.Save(ms);
                }
                else
                {
                    var fileExt = ext.FileExtensionToImageFormat();
                    image.Save(ms, fileExt);
                }
                byte[] imageBytes = ms.ToArray();
                return Convert.ToBase64String(imageBytes).Base64ToExBase64(data);
            }
        }

        public static string GetExtensionFromData(this string data)
        {
            var index = data.IndexOf("/") + 1;
            var length = data.IndexOf(";") - index;

            return data.Substring(index, length);
        }

        public static ImageFormat FileExtensionToImageFormat(this string fileExtension)
        {
            switch(fileExtension)
            {
                case "jpg":
                case "jpeg":
                    return ImageFormat.Jpeg;
                case "bmp":
                    return ImageFormat.Bmp;
                case "gif":
                    return ImageFormat.Gif;
                case "ico":
                    return ImageFormat.Icon;
                case "png":
                    return ImageFormat.Png;
                default:
                    throw new FormatException();
            }
        }
    }
}
