using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.INFRA.Exceptions
{
    public class CustomDbRelationException : Exception
    {
        public CustomDbRelationException(string message) : base(message)
        {
        }
    }
}
