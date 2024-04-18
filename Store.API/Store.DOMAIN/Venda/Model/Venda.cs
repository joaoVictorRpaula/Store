using Store.DOMAIN.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.DOMAIN.Model
{
    public class Venda
    {
        public long IdVenda { get; set; }
        public long IdCliente { get; set; }
        public long IdProduto { get; set; }
        public int QtdVenda { get; set; }
        public double VlrUnitarioVenda { get; set; }
        public DateTime DthVenda { get; set; }
        public double VlrTotalVenda { get; set; }
        public Cliente Cliente { get; set; }
        public Produto Produto { get; set; }
    }
}
