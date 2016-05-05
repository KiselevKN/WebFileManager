using System.Net.Http;
using System.Web.Http;
using WebFileManager.Api.Models;
using WebFileManager.Api.Services.Interfaces;

namespace WebFileManager.Api.Controllers
{
    public class IconsController: ApiController
    {
        private IIconsService iconsService;

        public IconsController(IIconsService iconsService)
        {
            this.iconsService = iconsService;
        }

        [Route("~/api/WebFileManager/Icons")]
        [HttpPost]
        public HttpResponseMessage GetIcons(IconsModel model)
        {
            return iconsService.Get(model, Request);
        }
    }
}
