using WebFileManager.Api.Models.Base;

namespace WebFileManager.Api.Models
{
    public class ReadOnlyFileModel: SBaseModel
    {
        public bool IsReadOnly { get; set; }
    }
}
