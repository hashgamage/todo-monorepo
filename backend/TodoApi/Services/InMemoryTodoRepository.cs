using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Domain;
using System.Collections.Concurrent;
using System.Threading;
using System.Collections.ObjectModel;

namespace TodoApi.Services
{
    public class InMemoryTodoRepository : ITodoRepository
    {
        private readonly ConcurrentDictionary<int, TodoItem> _store = new();
        private int _nextId = 0;

        public IEnumerable<TodoItem> GetAll() => _store.Values.OrderBy(x => x.Id);

        public TodoItem Add(string title)
        {
            var id = Interlocked.Increment(ref _nextId);
            var item = new TodoItem { 
                Id = id, 
                Title = title, 
                IsDone = false, 
                CreatedAt = DateTime.UtcNow 
                };
            _store.TryAdd(id, item);
            return item;
        }

        public bool Delete(int id)  
        {
            return _store.TryRemove(id, out _);
        }
    }
}