using System;
using System.Net;
using System.Net.Http;
using WebFileManager.Api.Models;
using WebFileManager.Api.Services.Interfaces;
using WebFileManager.Core.Enums;
using WebFileManager.Core.Managers;

namespace WebFileManager.Api.Services
{
    public class FolderTreeService : IFolderTreeService
    {
        private IFolderManager folderManager;

        public FolderTreeService(IFolderManager folderManager)
        {
            this.folderManager = folderManager;
        }

        public HttpResponseMessage GetFolder(GetFolderModel model, HttpRequestMessage request)
        {
            IconSize size = (IconSize)Enum.Parse(typeof(IconSize), model.Size);
            var result = folderManager.GetFolder(model.Path, size);

            if (result == null)
            {
                return request.CreateResponse(HttpStatusCode.NotFound);
            }
            return request.CreateResponse(HttpStatusCode.OK, result);
        }
    }
}
