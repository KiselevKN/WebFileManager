using System.Web.Mvc;

namespace WebFileManager.Controllers
{
    public class TemplatesController : Controller
    {
        public ActionResult SortingFiles()
        {
            return PartialView();
        }

        public ActionResult AddNewFolder()
        {
            return PartialView();
        }

        public ActionResult ResizeImage()
        {
            return PartialView();
        }

        public ActionResult DeleteSelected()
        {
            return PartialView();
        }

        public ActionResult DeleteFolder()
        {
            return PartialView();
        }

        public ActionResult DeleteFile()
        {
            return PartialView();
        }

        public ActionResult RenameFolder()
        {
            return PartialView();
        }

        public ActionResult RenameFile()
        {
            return PartialView();
        }

        public ActionResult WebFileManager()
        {
            return PartialView();
        }
    }
}