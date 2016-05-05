using System.Net.Http;
using WebFileManager.Api.Models;

namespace WebFileManager.Api.Services.Interfaces
{
    public interface IIconsService
    {
        HttpResponseMessage Get(IconsModel model, HttpRequestMessage request);
    }
}
