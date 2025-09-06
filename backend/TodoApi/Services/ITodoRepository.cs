using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Domain;

namespace TodoApi.Services
{
    public interface ITodoRepository
    {
        IEnumerable<TodoItem> GetAll();
        TodoItem Add(string Title);
        bool Delete(int id);
        bool SetDone(int id, bool IsDone);
    }
}