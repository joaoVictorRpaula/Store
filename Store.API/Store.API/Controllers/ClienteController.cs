using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store.API.Controllers.Base;
using Store.DOMAIN.Model;
using Store.DOMAIN.Services;

namespace Store.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : BaseController<Cliente, IClienteService>
    {
        private readonly IClienteService _clienteService;
        public ClienteController(IClienteService service) : base(service)
        {
            _clienteService = service;
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById(int id)
        {
            var cliente = _clienteService.GetById(id);

            if (cliente == null)
            {
                return NotFound();
            }

            return Ok(cliente);
        }
    }
}
