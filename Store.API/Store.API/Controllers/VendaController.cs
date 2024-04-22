using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Store.API.Controllers.Base;
using Store.DOMAIN.Model;
using Store.DOMAIN.Services;

namespace Store.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendaController : BaseController<Venda, IVendaService>
    {
        private readonly IVendaService vendaService;
        public VendaController(IVendaService service) : base(service)
        {
            this.vendaService = service;
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById(int id)
        {
            var venda = this.vendaService.GetById(id);

            if (venda == null)
            {
                return NotFound();
            }

            return Ok(venda);
        }

        [HttpPost]
        [Route("SaveVenda")]
        public async Task<IActionResult> SaveVenda([FromBody] VendaDto vendaDto)
        {
            return Ok(await this.vendaService.SaveVenda(vendaDto));
        }

        [HttpPut]
        [Route("UpdateVenda")]
        public async Task<IActionResult> UpdateVenda([FromBody] VendaDto vendaDto)
        {
            return Ok(await this.vendaService.UpdateVenda(vendaDto));
        }

    }
}
