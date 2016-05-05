using System.Net.Http;
using System.Web.Http;
using WebFileManager.Api.Models;
using WebFileManager.Api.Services;
using WebFileManager.Api.Services.Interfaces;

namespace WebFileManager.Api.Controllers
{
    public class FolderController : ApiController
    {
        private IFolderService folderService;

        public FolderController(IFolderService folderService)
        {
            this.folderService = folderService;
        }

        [Route("~/api/WebFileManager/CreateFolder")]
        [HttpPost]
        public HttpResponseMessage CreateFolder(CreateFolderModel model)
        {
            return folderService.Create(model, Request);
        }

        [Route("~/api/WebFileManager/DeleteFolder")]
        [HttpPost]
        public HttpResponseMessage DeleteFolder(DeleteFolderModel model)
        {
            return folderService.Delete(model, Request);
        }

        [Route("~/api/WebFileManager/DeleteFolders")]
        [HttpPost]
        public HttpResponseMessage DeleteFolder(DeleteFoldersModel model)
        {
            return folderService.Delete(model, Request);
        }

        [Route("~/api/WebFileManager/RenameFolder")]
        [HttpPost]
        public HttpResponseMessage RenameFolder(RenameFolderModel model)
        {
            return folderService.Rename(model, Request);
        }
    }
}
