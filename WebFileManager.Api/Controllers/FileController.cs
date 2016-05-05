using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebFileManager.Api.Models;
using WebFileManager.Api.Services.Interfaces;

namespace WebFileManager.Api.Controllers
{
    public class FileController : ApiController
    {
        private IFileService fileService;

        public FileController(IFileService fileService)
        {
            this.fileService = fileService;
        }

        [Route("~/api/WebFileManager/UploadFile")]
        [HttpPost]
        public async Task<HttpResponseMessage> UploadFile([FromUri]string path = "")
        {
            return await fileService.Upload(new UploadFileModel() { Path = path }, Request);
        }

        [Route("~/api/WebFileManager/DeleteFile")]
        [HttpPost]
        public HttpResponseMessage DeleteFile(DeleteFileModel model)
        {
            return fileService.Delete(model, Request);
        }

        [Route("~/api/WebFileManager/DeleteFiles")]
        [HttpPost]
        public HttpResponseMessage DeleteFiles(DeleteFilesModel model)
        {
            return fileService.Delete(model, Request);
        }

        [Route("~/api/WebFileManager/ResizeImages")]
        [HttpPost]
        public HttpResponseMessage ResizeImages(ResizeImagesModel model)
        {
            return fileService.Resize(model, Request);
        }

        [Route("~/api/WebFileManager/RenameFile")]
        [HttpPost]
        public HttpResponseMessage RenameFile(RenameFileModel model)
        {
            return fileService.Rename(model, Request);
        }

        [Route("~/api/WebFileManager/ReadOnlyFile")]
        [HttpPost]
        public HttpResponseMessage ReadOnlyFile(ReadOnlyFileModel model)
        {
            return fileService.ReadOnly(model, Request);
        }
    }
}
