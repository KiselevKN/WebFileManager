using System.Net.Http;
using WebFileManager.Api.Models;

namespace WebFileManager.Api.Services.Interfaces
{
    public interface IFolderService
    {
        HttpResponseMessage Create(CreateFolderModel model, HttpRequestMessage request);
        HttpResponseMessage Delete(DeleteFolderModel model, HttpRequestMessage request);
        HttpResponseMessage Delete(DeleteFoldersModel model, HttpRequestMessage request);
        HttpResponseMessage Rename(RenameFolderModel model, HttpRequestMessage request);
    }
}
