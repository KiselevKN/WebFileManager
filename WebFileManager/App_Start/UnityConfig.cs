using Microsoft.Practices.Unity;
using System.Web.Hosting;
using System.Web.Http;
using Unity.WebApi;
using WebFileManager.Api;

namespace WebFileManager
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var pathToRootFolder = HostingEnvironment.MapPath(@"~");
            var rootFolderName = "FileStorage";

            var container = new UnityContainer();
            WebFileManagerUnityConfig.RegisterComponents(pathToRootFolder, rootFolderName, container);
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}