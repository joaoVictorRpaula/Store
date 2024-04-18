using Store.DOMAIN.Model;
using Store.DOMAIN.Repositories;
using Store.DOMAIN.Services;
using Store.INFRA.Base.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.CORE.Services
{
    public class ProdutoService : BaseService<Produto, IProdutoRepository>, IProdutoService
    {
        public ProdutoService(IProdutoRepository objRepository) : base(objRepository)
        {
        }
    }
}
