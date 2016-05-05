using System.Collections.Generic;
using System.Runtime.Serialization;

namespace WebFileManager.Core.Models
{
    [DataContract(IsReference = true)]
    public class FolderInfo
    {
        public FolderInfo()
        {
            SubFolders = new List<SubFolderInfo>();
            Files = new List<FileInfo>();
        }

        [DataMember]
        public string Path { get; set; }

        [DataMember]
        public List<SubFolderInfo> SubFolders { get; set; }

        [DataMember]
        public List<FileInfo> Files { get; set; }
    }
}
