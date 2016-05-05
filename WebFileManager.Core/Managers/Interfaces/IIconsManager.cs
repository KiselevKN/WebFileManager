using System.Collections.Generic;
using WebFileManager.Core.Enums;

namespace WebFileManager.Core.Managers
{
    public interface IIconsManager
    {
        Dictionary<string, string> GetFileTypeIcons(IconSize size);
    }
}
