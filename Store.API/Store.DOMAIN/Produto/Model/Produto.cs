using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Store.DOMAIN.Model
{
    public class Produto
    {
        public long IdProduto { get; set; }
        public string DscProduto { get; set; }
        public double VlrUnitario { get; set; }
        [JsonIgnore]
        public IList<Venda> Vendas { get; set; }
    }
}
