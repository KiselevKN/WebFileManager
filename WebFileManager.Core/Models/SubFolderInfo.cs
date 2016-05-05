using System;
using System.Runtime.Serialization;

namespace WebFileManager.Core.Models
{
    [DataContract(IsReference = true)]
    public class SubFolderInfo
    {
        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public DateTime CreationTime { get; set; }

        [DataMember]
        public DateTime ModificationTime { get; set; }
    }
}
