using Store.CORE.DataAccess;
using Store.DOMAIN.Model;
using Store.DOMAIN.Repositories;
using Store.INFRA.Base.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.CORE.Repositories
{
    public class VendaRepository : BaseRepository<Venda, StoreDbContext>, IVendaRepository
    {
        public VendaRepository(StoreDbContext context) : base(context)
        {
        }
    }
}
