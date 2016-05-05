namespace WebFileManager.Api.Models.Base
{
    public class SBaseModel
    {
        public string Path { get; set; }
        public string Name { get; set; }
    }

    public class MBaseModel
    {
        public string Path { get; set; }
        public string[] Names { get; set; }
    }
}
