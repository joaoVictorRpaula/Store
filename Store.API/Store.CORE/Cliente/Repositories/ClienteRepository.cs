using Store.DOMAIN.Model;
using Store.DOMAIN.Repositories;
using Store.INFRA.Base.Core.Repositories;
using Store.CORE.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.CORE.Repositories
{
    public class ClienteRepository : BaseRepository<Cliente, StoreDbContext>, IClienteRepository
    {
        public ClienteRepository(StoreDbContext context) : base(context)
        {
        }
    }
}
