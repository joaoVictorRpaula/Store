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
    public class ProdutoRepository : BaseRepository<Produto, StoreDbContext>, IProdutoRepository
    {
        public ProdutoRepository(StoreDbContext context) : base(context)
        {
        }
    }
}
