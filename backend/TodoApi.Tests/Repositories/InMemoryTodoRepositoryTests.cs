using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using TodoApi.Domain;
using TodoApi.Services;

namespace TodoApi.Tests.Repositories
{
    public class InMemoryTodoRepositoryTests
    {
        public void Add_ShouldCreateItemWithIncrementingId()
        {
            var repo = new InMemoryTodoRepository();
        }
    }
}