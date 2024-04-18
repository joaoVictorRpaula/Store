using Store.DOMAIN.Model;
using Store.INFRA.Base.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.DOMAIN.Repositories
{
    public interface IProdutoRepository : IBaseRepository<Produto>
    {
    }
}
