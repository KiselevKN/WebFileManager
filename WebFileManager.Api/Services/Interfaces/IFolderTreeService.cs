using System.Net.Http;
using WebFileManager.Api.Models;

namespace WebFileManager.Api.Services.Interfaces
{
    public interface IFolderTreeService
    {
        HttpResponseMessage GetFolder(GetFolderModel model, HttpRequestMessage request);
    }
}
