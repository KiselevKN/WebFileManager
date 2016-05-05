using System.Web.Optimization;

namespace WebFileManager
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular/angular.js",
                "~/Scripts/angular/angular-route.js",
                "~/Scripts/angular/angular-animate.js",
                "~/Scripts/angular/angular-sanitize.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls-1.1.0.js",
                "~/Scripts/angular-toastr/angular-toastr.tpls.js",
                "~/Scripts/angular-translate/angular-translate.js",
                "~/Scripts/angular-file-upload/ng-file-upload-shim.js",
                "~/Scripts/angular-file-upload/ng-file-upload.js",
                "~/Scripts/app/angular-webFileManager.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap/css/bootstrap.css",
                "~/Content/font-awesome/css/font-awesome.css",
                "~/Content/bootstrap/css/awesome-bootstrap-checkbox.css",
                "~/Content/angular-toastr/css/angular-toastr.css",
                "~/Content/app/css/styles.css"));
        }
    }
}