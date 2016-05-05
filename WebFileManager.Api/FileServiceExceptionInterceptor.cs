using Microsoft.Practices.Unity.InterceptionExtension;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using WebFileManager.Core.Managers;

namespace WebFileManager.Api
{
    public class FileServiceExceptionInterceptor : IInterceptionBehavior
    {
        #region fields

        private readonly IFileManager fileManager;

        #endregion

        #region ctors

        public FileServiceExceptionInterceptor(IFileManager fileManager)
        {
            this.fileManager = fileManager;
        }

        #endregion

        #region IInterceptionBehavior Members

        public IEnumerable<Type> GetRequiredInterfaces()
        {
            return Type.EmptyTypes;
        }

        public IMethodReturn Invoke(IMethodInvocation input, GetNextInterceptionBehaviorDelegate getNext)
        {
            var result = getNext()(input, getNext);

            if (result.Exception != null)
            {
                var request = (HttpRequestMessage)input.Inputs[1];
                result.ReturnValue = request.CreateErrorResponse(HttpStatusCode.BadRequest, result.Exception.Message);
                result.Exception = null;
            }

            return result;

        }

        public bool WillExecute
        {
            get { return true; }
        }

        #endregion
    }
}
