﻿using Store.DOMAIN.Model;
using Store.INFRA.Base.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.DOMAIN.Services
{
    public interface IClienteService : IBaseService<Cliente>
    {
        Cliente GetById(int id);
    }
}
