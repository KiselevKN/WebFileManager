using System.Net;
using System.Net.Http;
using WebFileManager.Api.Models;
using WebFileManager.Api.Properties;
using WebFileManager.Api.Services.Interfaces;
using WebFileManager.Core.Managers;

namespace WebFileManager.Api.Services
{
    public class FolderService : IFolderService
    {
        private IFolderManager folderManager;

        public FolderService(IFolderManager folderManager)
        {
            this.folderManager = folderManager;
        }

        public HttpResponseMessage Create(CreateFolderModel model, HttpRequestMessage request)
        {
            folderManager.Create(model.Path, model.Name);
            return request.CreateResponse(HttpStatusCode.OK, string.Format(Resources.FolderHasBeenCreated, model.Name));
        }

        public HttpResponseMessage Delete(DeleteFolderModel model, HttpRequestMessage request)
        {
            folderManager.Delete(model.Path, model.Name);
            return request.CreateResponse(HttpStatusCode.OK, string.Format(Resources.FolderHasBeenRemoved, model.Name));
        }

        public HttpResponseMessage Delete(DeleteFoldersModel model, HttpRequestMessage request)
        {
            folderManager.Delete(model.Path, model.Names);
            return request.CreateResponse(HttpStatusCode.OK, string.Format(Resources.FoldersHaveBeenRemoved));
        }

        public HttpResponseMessage Rename(RenameFolderModel model, HttpRequestMessage request)
        {
            folderManager.Rename(model.Path, model.OldName, model.NewName);
            return request.CreateResponse(HttpStatusCode.OK, string.Format(Resources.FolderHasBeenRenamed, model.OldName, model.NewName));
        }
    }
}
