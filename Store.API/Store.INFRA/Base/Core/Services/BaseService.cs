using Store.INFRA.Base.Domain.Repositories;
using Store.INFRA.Base.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.INFRA.Base.Core.Services
{
    public class BaseService<T, TRepository> : IBaseService<T>
        where T : class
        where TRepository : IBaseRepository<T>
    {
        private readonly TRepository objRepository;
        public BaseService(TRepository objRepository)
        {
            this.objRepository = objRepository;
        }

        public async Task<T> AddAsync(T obj)
        {
            objRepository.Add(obj);
            await objRepository.Context.SaveChangesAsync();
            return obj;
        }

        public async Task<T> DeleteAsync(T obj)
        {
            objRepository.Delete(obj);
            await objRepository.Context.SaveChangesAsync();
            return obj;
        }
        public async Task<T> UpdateAsync(T obj)
        {
            objRepository.Update(obj);
            await objRepository.Context.SaveChangesAsync();
            return obj;
        }
        public IQueryable<T> GetAll()
        {
            return objRepository.GetAll();
        }

        public IQueryable<T> GetAllNoTracking()
        {
            return objRepository.GetAllNoTracking();
        }
    }
}
