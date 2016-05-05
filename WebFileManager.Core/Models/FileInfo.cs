using System;
using System.Runtime.Serialization;

namespace WebFileManager.Core.Models
{
    [DataContract(IsReference = true)]
    public class FileInfo
    {
        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string Icon { get; set; }

        [DataMember]
        public long Size { get; set; }

        [DataMember]
        public DateTime CreationTime { get; set; }

        [DataMember]
        public DateTime ModificationTime { get; set; }

        [DataMember]
        public bool IsReadOnly { get; set; }
    }
}
