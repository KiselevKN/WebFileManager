using System;
using System.Net;
using System.Net.Http;
using WebFileManager.Api.Models;
using WebFileManager.Api.Services.Interfaces;
using WebFileManager.Core.Enums;
using WebFileManager.Core.Managers;

namespace WebFileManager.Api.Services
{
    public class IconsService : IIconsService
    {
        private IIconsManager iconsManager;

        public IconsService(IIconsManager iconsManager)
        {
            this.iconsManager = iconsManager;
        }

        public HttpResponseMessage Get(IconsModel model, HttpRequestMessage request)
        {
            IconSize size = (IconSize)Enum.Parse(typeof(IconSize), model.Size);

            var result = iconsManager.GetFileTypeIcons(size);

            if (result == null)
            {
                return request.CreateResponse(HttpStatusCode.NotFound);
            }
            return request.CreateResponse(HttpStatusCode.OK, result);

        }
    }
}
