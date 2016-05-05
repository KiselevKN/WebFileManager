using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.InterceptionExtension;
using WebFileManager.Api.Services;
using WebFileManager.Api.Services.Interfaces;
using WebFileManager.Core.Managers;

namespace WebFileManager.Api
{
    public static class WebFileManagerUnityConfig
    {
        public static void RegisterComponents(string pathToRootFolder, string rootFolderName, IUnityContainer container)
        {
            container.RegisterType<ICacheManager, CacheManager>(new InjectionConstructor("WebFileManager"));
            container.RegisterType<IIconsManager, IconsManager>();
            container.RegisterType<IFolderManager, FolderManager>(new InjectionConstructor(pathToRootFolder, rootFolderName, container.Resolve<ICacheManager>()));
            container.RegisterType<IFileManager, FileManager>(new InjectionConstructor(pathToRootFolder, rootFolderName, container.Resolve<ICacheManager>()));

            container.AddNewExtension<Interception>();
            container.RegisterType<IFolderService, FolderService>(new Interceptor<InterfaceInterceptor>(),
                new InterceptionBehavior<FolderServiceExceptionInterceptor>());
            container.RegisterType<IFileService, FileService>(new Interceptor<InterfaceInterceptor>(),
                new InterceptionBehavior<FileServiceExceptionInterceptor>());
            container.RegisterType<IFolderTreeService, FolderTreeService>();
            container.RegisterType<IIconsService, IconsService>();
        }
    }
}
