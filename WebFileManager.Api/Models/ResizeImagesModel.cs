using WebFileManager.Api.Models.Base;

namespace WebFileManager.Api.Models
{
    public class ResizeImagesModel: MBaseModel
    {
        public int Width { get; set; }
        public int Height { get; set; }
    }
}
