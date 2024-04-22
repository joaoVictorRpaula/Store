using Store.DOMAIN.Model;
using Store.DOMAIN.Repositories;
using Store.DOMAIN.Services;
using Store.INFRA.Base.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Store.CORE.Services
{
    public class VendaService : BaseService<Venda, IVendaRepository>, IVendaService
    {
        private readonly IVendaRepository objRepository;
        private readonly IProdutoRepository objProdutoRepository;
        private readonly IClienteRepository objClienteRepository;
        public VendaService(IVendaRepository objRepository, IProdutoRepository objProdutoRepository, IClienteRepository objClienteRepository) : base(objRepository)
        {
            this.objRepository = objRepository;
            this.objProdutoRepository = objProdutoRepository;
            this.objClienteRepository = objClienteRepository;
        }

        public Venda GetById(int id)
        {
            return this.objRepository.GetAllNoTracking()
                .Include(x => x.Cliente)
                .Include(x => x.Produto)
                .FirstOrDefault(x => x.IdVenda == id);
        }

        public async Task<List<Venda>> SaveVenda(VendaDto vendaDto)
        {
            var vendaList = new List<Venda>();
            foreach(var produto in vendaDto.ProdutoDto)
            {
                var produtoDb = this.objProdutoRepository.GetAllNoTracking().FirstOrDefault(x => x.IdProduto == produto.IdProduto);
                if (produtoDb == null)
                {
                    throw new Exception($"Produto {produto.DscProduto} não encontrado.");
                }

                var newVenda = new Venda
                {
                    IdCliente = vendaDto.Cliente.IdCliente,
                    IdProduto = produtoDb.IdProduto,
                    QtdVenda = produto.QtdVenda,
                    VlrUnitarioVenda = produtoDb.VlrUnitario,
                    DthVenda = DateTime.Now,
                    VlrTotalVenda = produto.QtdVenda * produtoDb.VlrUnitario
                };

                vendaList.Add(newVenda);
                this.objRepository.Add(newVenda);
            }

            await this.objRepository.Context.SaveChangesAsync();
            return vendaList;
        }

        public async Task<Venda> UpdateVenda(VendaDto vendaDto)
        {
            var vendaDb = objRepository.GetAll().FirstOrDefault(x => x.IdVenda == vendaDto.IdVenda);

            if (vendaDb == null)
            {
                throw new Exception("Venda não encontrada para atualizar");
            }

            vendaDb.QtdVenda = vendaDto.ProdutoDto.First().QtdVenda;
            vendaDb.IdProduto = vendaDto.ProdutoDto.First().IdProduto;
            vendaDb.IdCliente = vendaDto.Cliente.IdCliente;
            vendaDb.VlrUnitarioVenda = vendaDto.ProdutoDto.First().VlrUnitario;
            vendaDb.VlrTotalVenda = vendaDto.ProdutoDto.First().VlrUnitario * vendaDto.ProdutoDto.First().QtdVenda;

            await objRepository.Context.SaveChangesAsync();

            return vendaDb;
        }
    }
}
