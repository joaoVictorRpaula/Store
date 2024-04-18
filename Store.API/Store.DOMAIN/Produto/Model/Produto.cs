using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.DOMAIN.Model
{
    public class Produto
    {
        public long IdProduto { get; set; }
        public string DscProduto { get; set; }
        public decimal VlrUnitario { get; set; }
        public IList<Venda> Vendas { get; set; }
    }
}
