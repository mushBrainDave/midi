using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Midi.Core.Interfaces.DataAccessHandlers;
using Midi.Core.Models;
using Midi.DataAccessHandlers.Infrastructure;

namespace Midi.DataAccessHandlers
{
    public class BaseHandler<T> : IBaseHandler<T> where T : class, IBaseEntity
    {
        protected readonly DbSet<T> _dbSet;
        protected readonly DbContext _context;

        public BaseHandler(MidiContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public IQueryable<T> AsQueryable()
        {
            return _dbSet.AsQueryable();
        }

        public bool Contains(T entity)
        {
            return _dbSet.Contains(entity);
        }

        public bool Contains(Expression<Func<T, bool>> where)
        {
            return _dbSet.Any(where);
        }

        public long Count()
        {
            return _dbSet.Count();
        }

        public long Count(Expression<Func<T, bool>> where)
        {
            return _dbSet.Count(where);
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }

        public T First(Expression<Func<T, bool>> where)
        {
            return _dbSet.First(where);
        }

        public IEnumerable<T> Get(Expression<Func<T, bool>> where)
        {
            return _dbSet.Where(where).ToList();
        }

        public IEnumerable<T> GetAll()
        {
            return _dbSet.ToList();
        }

        public T GetById(int id)
        {
            return _dbSet.First(e => e.Id == id);
        }

        public IEnumerable<T> GetByIds(IEnumerable<int> ids)
        {
            var hashedIds = ids.ToHashSet();
            return _dbSet.Where(e => hashedIds.Contains(e.Id)).ToList();
        }

        public T Insert(T entity)
        {
            _dbSet.Add(entity);
            return entity;
        }

        public void InsertMany(IEnumerable<T> entities)
        {
            _dbSet.AddRange(entities);
        }

        public T Update(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            return entity;
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
