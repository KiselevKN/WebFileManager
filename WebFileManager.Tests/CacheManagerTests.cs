using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using WebFileManager.Core.Managers;

namespace WebFileManager.Tests
{
    [TestClass]
    public class CacheManagerTests
    {
        ICacheManager manager = new CacheManager();

        [TestCleanup]
        public void Cleanup()
        {
            manager.Clear();
        }

        [TestMethod]
        public void InsertTest()
        {
            manager.Insert("key1", Tuple.Create(12, "str"));

            var result = (Tuple<int,string>)manager.Get("key1");

            Assert.AreEqual(12, result.Item1);
            Assert.AreEqual("str", result.Item2);
        }

        [TestMethod]
        public void ExistTest()
        {
            manager.Insert("key1", Tuple.Create(12, "str"));

            Assert.IsTrue(manager.Exist("key1"));
            Assert.IsFalse(manager.Exist("key2"));
        }

        [TestMethod]
        public void CountTest()
        {
            Assert.AreEqual(0, manager.Count);

            manager.Insert("key1", Tuple.Create(12, "str"));

            Assert.AreEqual(1, manager.Count);
            Assert.IsFalse(manager.Exist("key2"));
        }

        [TestMethod]
        public void RemoveTest()
        {
            manager.Insert("key1", Tuple.Create(12, "str"));
            Assert.IsTrue(manager.Exist("key1"));
            manager.Remove("key1");
            Assert.IsFalse(manager.Exist("key1"));
        }
    }
}
