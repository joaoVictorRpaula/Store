using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.DOMAIN.Model
{
    public class VendaDto
    {
        public int idVenda { get; set; }
        public DateTime dthVenda { get; set; }
        public int idCliente { get; set; }
        public int idProduto { get; set; }
        public int qtdVenda { get; set; }
        public decimal vlrUnitarioVenda { get; set; }
    }
}
