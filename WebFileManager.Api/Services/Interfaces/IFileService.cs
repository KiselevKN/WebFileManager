using System.Net.Http;
using System.Threading.Tasks;
using WebFileManager.Api.Models;

namespace WebFileManager.Api.Services.Interfaces
{
    public interface IFileService
    {
        Task<HttpResponseMessage> Upload(UploadFileModel model, HttpRequestMessage request);
        HttpResponseMessage Delete(DeleteFileModel model, HttpRequestMessage request);
        HttpResponseMessage Delete(DeleteFilesModel model, HttpRequestMessage request);
        HttpResponseMessage Resize(ResizeImagesModel model, HttpRequestMessage request);
        HttpResponseMessage Rename(RenameFileModel model, HttpRequestMessage request);
        HttpResponseMessage ReadOnly(ReadOnlyFileModel model, HttpRequestMessage request);
    }
}
