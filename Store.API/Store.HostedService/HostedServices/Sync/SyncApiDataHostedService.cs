using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Store.DOMAIN.Model;
using Store.DOMAIN.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Store.HostedService.HostedServices.Sync
{
    public class SyncApiDataHostedService : BackgroundService
    {
        private readonly ILogger<SyncApiDataHostedService> _logger;
        private readonly IServiceProvider provider;
        private readonly IConfiguration configuration;
        private readonly CancellationToken _cancellationToken;
        private const int WaitingTime = 10000;
        public SyncApiDataHostedService(ILogger<SyncApiDataHostedService> logger, IServiceProvider provider, IConfiguration configuration)
        {
            _logger = logger;
            this.provider = provider;
            this.configuration = configuration;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await Task.Delay(1000);

            //while (!stoppingToken.IsCancellationRequested)
            //{
                _logger.LogInformation(
                    "Sync Api data started.");

                using(var scope = provider.CreateScope())
                {
                    await SyncData(scope);
                }

                //await Task.Delay(WaitingTime, stoppingToken);
            //}
        }

        private async Task SyncData(IServiceScope scope)
        {
            var vendaRepository = scope.ServiceProvider.GetRequiredService<IVendaRepository>();
            var produtoRepository = scope.ServiceProvider.GetRequiredService<IProdutoRepository>();
            var clienteRepository = scope.ServiceProvider.GetRequiredService<IClienteRepository>();

            var vendaEndpoint = configuration.GetSection("CamposDealer")["getVendas"];
            var produtoEndpoint = configuration.GetSection("CamposDealer")["getProdutos"];
            var clienteEndpoint = configuration.GetSection("CamposDealer")["getClientes"];

            try
            {
                var vendaList = await getResult<Venda>(scope, vendaEndpoint);
                var produtoList = await getResult<Produto>(scope, produtoEndpoint);
                var clienteList = await getResult<Cliente>(scope, clienteEndpoint);

                var vendaIds = await vendaRepository.GetAllNoTracking().Select(c => c.IdVenda).ToListAsync();
                var produtoIds = await produtoRepository.GetAllNoTracking().Select(c => c.IdProduto).ToListAsync();
                var clientIds = await clienteRepository.GetAllNoTracking().Select(c => c.IdCliente).ToListAsync();

                var newVendas = vendaList.Where(v => !vendaIds.Contains(v.IdVenda)).ToList();
                newVendas = FillVendaTotalValue(newVendas);
                var newProducts = produtoList.Where(p => !produtoIds.Contains(p.IdProduto)).ToList();
                newProducts = RemoveIdsProduto(newProducts);
                var newClients = clienteList.Where(c => !clientIds.Contains(c.IdCliente)).ToList();
                newClients = RemoveIdsCliente(newClients);

                if (newClients.Any())
                {
                    clienteRepository.Context.AddRange(newClients);
                    await clienteRepository.Context.SaveChangesAsync();
                }

                if (newProducts.Any())
                {
                    produtoRepository.Context.AddRange(newProducts);
                    await produtoRepository.Context.SaveChangesAsync();
                }

                if (newVendas.Any())
                {
                    vendaRepository.Context.AddRange(newVendas);
                    await vendaRepository.Context.SaveChangesAsync();
                }
            }

            catch (Exception ex)
            {
                _logger.LogError("Sync Api error", ex);
            }
        }

        private async Task<List<T>> getResult<T>(IServiceScope scope, string endpoint)
        {
            var client = scope.ServiceProvider.GetRequiredService<IHttpClientFactory>()
                    .CreateClient(nameof(SyncApiDataHostedService));

            client.BaseAddress = new Uri(endpoint);

            var response = await client.GetAsync(string.Empty);
            var objResponse = await response.Content.ReadAsStringAsync();
            objResponse = FixApiResponseString(objResponse);
            var obj = JsonConvert.DeserializeObject<List<T>>(objResponse);

            return obj;
        }
        private string FixApiResponseString(string input)
        {
            input = input.Replace("\\", string.Empty);
            input = input.Trim('"');
            return input;
        }

        private List<Cliente> RemoveIdsCliente(List<Cliente> clienteList)
        {
            var newList = new List<Cliente>();
            foreach(var cliente in clienteList)
            {
                newList.Add(new Cliente
                {
                    NmCliente = cliente.NmCliente,
                    Cidade = cliente.Cidade
                });
            }
            return newList;
        }
        private List<Produto> RemoveIdsProduto(List<Produto> produtoList)
        {
            var newList = new List<Produto>();
            foreach (var produto in produtoList)
            {
                newList.Add(new Produto
                {
                    DscProduto = produto.DscProduto,
                    VlrUnitario = produto.VlrUnitario
                });
            }
            return newList;
        }
        private List<Venda> FillVendaTotalValue(List<Venda> vendaList)
        {
            var newList = new List<Venda>();
            foreach(var venda in vendaList)
            {
                newList.Add(new Venda
                {
                    IdCliente = venda.IdCliente,
                    IdProduto = venda.IdProduto,
                    QtdVenda = venda.QtdVenda,
                    VlrUnitarioVenda = venda.VlrUnitarioVenda,
                    DthVenda = venda.DthVenda,
                    VlrTotalVenda = venda.QtdVenda * venda.VlrUnitarioVenda
                });
            }

            return newList;
        }
    }
}
