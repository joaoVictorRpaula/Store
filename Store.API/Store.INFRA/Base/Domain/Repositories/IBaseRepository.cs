using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.INFRA.Base.Domain.Repositories
{
    public interface IBaseRepository<T> where T : class
    {
        DbContext Context { get; }
        DbSet<T> DbSet { get; }
        void Add(T obj);
        void Update(T obj);
        void Delete(T obj);
        IQueryable<T> GetAll();
        IQueryable<T> GetAllNoTracking();
    }
}
