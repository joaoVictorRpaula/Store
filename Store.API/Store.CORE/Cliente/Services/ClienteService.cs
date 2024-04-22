using Store.DOMAIN.Model;
using Store.DOMAIN.Repositories;
using Store.DOMAIN.Services;
using Store.INFRA.Base.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.CORE.Services
{
    public class ClienteService : BaseService<Cliente, IClienteRepository>, IClienteService
    {
        private readonly IClienteRepository _objRepository;
        public ClienteService(IClienteRepository objRepository) : base(objRepository)
        {
            _objRepository = objRepository;
        }

        public Cliente GetById(int id)
        {
            return _objRepository.GetAllNoTracking().FirstOrDefault(x => x.IdCliente == id);
        }
    }
}
