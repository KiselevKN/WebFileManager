using Microsoft.Practices.Unity.InterceptionExtension;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using WebFileManager.Core.Managers;

namespace WebFileManager.Api
{
    public class FolderServiceExceptionInterceptor : IInterceptionBehavior
    {
        #region fields

        private readonly IFolderManager folderManager;

        #endregion

        #region ctors

        public FolderServiceExceptionInterceptor(IFolderManager folderManager)
        {
            this.folderManager = folderManager;
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
