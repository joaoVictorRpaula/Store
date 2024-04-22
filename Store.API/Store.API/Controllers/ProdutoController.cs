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
    public class ProdutoController : BaseController<Produto, IProdutoService>
    {
        private readonly IProdutoService _produtoService;
        public ProdutoController(IProdutoService service) : base(service)
        {
            _produtoService = service;
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById(int id)
        {
            var produto = _produtoService.GetById(id);

            if (produto == null)
            {
                return NotFound();
            }

            return Ok(produto);
        }
    }
}
