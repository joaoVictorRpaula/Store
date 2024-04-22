using Store.DOMAIN.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.DOMAIN.Model
{
    public class VendaDto
    {
        public long IdVenda { get; set; }
        public IList<ProdutoDto> ProdutoDto { get; set; }
        public Cliente Cliente { get; set; }
    }
}
