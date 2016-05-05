using System.IO;
using System.Net;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebFileManager.Api.Models;
using WebFileManager.Api.Properties;
using WebFileManager.Core.Managers;
using WebFileManager.Api.Services.Interfaces;

namespace WebFileManager.Api.Services
{
    public class FileService : IFileService
    {
        private IFileManager fileManager;

        public FileService(IFileManager fileManager)
        {
            this.fileManager = fileManager;
        }

        public HttpResponseMessage Delete(DeleteFileModel model, HttpRequestMessage request)
        {
            fileManager.Delete(model.Path, model.Name);
            return request.CreateResponse(HttpStatusCode.OK, string.Format(Resources.FileHasBeenRemoved, model.Name));
        }

        public HttpResponseMessage Delete(DeleteFilesModel model, HttpRequestMessage request)
        {
            fileManager.Delete(model.Path, model.Names);
            return request.CreateResponse(HttpStatusCode.OK, string.Format(Resources.FilesHaveBeenRemoved));
        }

        public HttpResponseMessage Resize(ResizeImagesModel model, HttpRequestMessage request)
        {
            fileManager.ResizeFiles(model.Path, model.Names, model.Width, model.Height);
            return request.CreateResponse(HttpStatusCode.OK, string.Format(Resources.FilesHaveBeenResized));
        }

        public HttpResponseMessage Rename(RenameFileModel model, HttpRequestMessage request)
        {
            fileManager.Rename(model.Path, model.OldName, model.NewName);
            return request.CreateResponse(HttpStatusCode.OK, string.Format(Resources.FileHasBeenRenamed, model.OldName, model.NewName));
        }

        public async Task<HttpResponseMessage> Upload(UploadFileModel model, HttpRequestMessage request)
        {
            if (!request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
     
            try
            {
                var provider = new CustomMultipartFormDataStreamProvider(Path.Combine(fileManager.PathToRootFolder, model.Path));           
                await request.Content.ReadAsMultipartAsync(provider);
                var fileName = provider.FileData.First().Headers.ContentDisposition.FileName;
                var result = string.Format(Resources.FileHasBeenUploaded, fileName);
                return request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (System.Exception e)
            {
                return request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        public HttpResponseMessage ReadOnly(ReadOnlyFileModel model, HttpRequestMessage request)
        {
            fileManager.ReadOnly(model.Path, model.Name, model.IsReadOnly);
            return request.CreateResponse(HttpStatusCode.OK, string.Format(Resources.ReadOnlyStateHasBeenChanged, model.Name, model.IsReadOnly));
        }
    }
}
