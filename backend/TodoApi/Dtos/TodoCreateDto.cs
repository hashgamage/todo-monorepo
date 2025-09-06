using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Dtos
{
    public class TodoCreateDto
    {
        public required string Title { get; set; }
    }
}