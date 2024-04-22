using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.DOMAIN.Model
{
    public class ProdutoDto
    {
        public long IdProduto { get; set; }
        public string DscProduto { get; set; }
        public double VlrUnitario { get; set; }
        public int QtdVenda { get; set; }
    }
}
