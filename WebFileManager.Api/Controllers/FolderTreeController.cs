using System.Net.Http;
using System.Web.Http;
using WebFileManager.Api.Models;
using WebFileManager.Api.Services.Interfaces;

namespace WebFileManager.Api.Controllers
{
    public class FolderTreeController : ApiController
    {
        private IFolderTreeService folderTreeService;

        public FolderTreeController(IFolderTreeService folderTreeService)
        {
            this.folderTreeService = folderTreeService;
        }

        [Route("~/api/WebFileManager/GetFolder")]
        [HttpPost]
        public HttpResponseMessage GetFolder(GetFolderModel model)
        {
            return folderTreeService.GetFolder(model, Request);
        }
    }
}
