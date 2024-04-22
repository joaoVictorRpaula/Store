using Store.DOMAIN.Model;
using Store.INFRA.Base.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.DOMAIN.Services
{
    public interface IVendaService : IBaseService<Venda>
    {
        Venda GetById(int id);
        Task<List<Venda>> SaveVenda(VendaDto vendaDto);
        Task<Venda> UpdateVenda (VendaDto vendaDto);
    }
}
