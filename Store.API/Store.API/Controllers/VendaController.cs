using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store.API.Controllers.Base;
using Store.DOMAIN.Model;
using Store.DOMAIN.Services;

namespace Store.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendaController : BaseController<Venda, IVendaService>
    {
        public VendaController(IVendaService service) : base(service)
        {
        }
    }
}
