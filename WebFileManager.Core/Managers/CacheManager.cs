using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Web.Caching;

namespace WebFileManager.Core.Managers
{
    public class CacheManager : ICacheManager
    {
        #region fields

        private string cacheName;
        private Cache cache;      

        #endregion

        #region ctors

        public CacheManager(string cacheName = "WebFileManager")
        {
            this.cacheName = cacheName;
            cache = System.Web.HttpRuntime.Cache;
            if (cache[cacheName] == null)
            {
                Debug.WriteLine(string.Format("Create cache {0}", this.cacheName));
                cache.Insert(cacheName, new Dictionary<string, object>());
            }
                
        }

        #endregion

        #region ICacheManager

        public int Count
        {
            get
            {
                return ((Dictionary<string, object>)cache.Get(cacheName)).Count;
            }
        }

        public void Insert(string key, object obj)
        {

            if (!Exist(key))
            {
                Debug.WriteLine("Insert {0} into cache {1}", key, cacheName);
                ((Dictionary<string, object>)cache.Get(cacheName)).Add(key, obj);
            }
                
        }

        public bool Exist(string key)
        {
            return ((Dictionary<string, object>)cache.Get(cacheName)).ContainsKey(key);
        }

        public void Remove(string key)
        {
            if (Exist(key))
            {
                Debug.WriteLine("Remove {0} into cache {1}", key, cacheName);
                ((Dictionary<string, object>)cache.Get(cacheName)).Remove(key);
            }           
        }

        public object Get(string key)
        {
            return ((Dictionary<string, object>)cache.Get(cacheName))[key];
        }

        public void Clear()
        {
            Debug.WriteLine(string.Format("Clear cache {0}", cacheName));
            ((Dictionary<string, object>)cache.Get(cacheName)).Clear();
        }

        #endregion
    }
}
