using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.DOMAIN.Model
{
    public class Cliente
    {
        public long IdCliente { get; set; }
        public string NmCliente { get; set; }
        public string Cidade { get; set; }
        public IList<Venda> Vendas { get; set; }
    }
}
