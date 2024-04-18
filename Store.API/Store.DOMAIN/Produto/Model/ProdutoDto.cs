using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.DOMAIN.Model
{
    public class ProdutoDto
    {
        public int idProduto { get; set; }
        public string dscProduto { get; set; }
        public decimal vlrUnitario { get; set; }
    }
}
