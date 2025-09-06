using Microsoft.AspNetCore.Mvc;
using TodoApi.Services;
using TodoApi.Dtos;
using System.Linq;

namespace TodoApi.Controllers;

[ApiController]
[Route("api/todos")]
public class TodoController(ITodoRepository repo) : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<TodoItemDto>> GetAll()
    {
        var items = repo.GetAll().Select(x => new TodoItemDto
        {
            Id = x.Id,
            Title = x.Title,
            IsDone = x.IsDone,
            CreatedAt = x.CreatedAt
        });
        return Ok(items);
    }

    [HttpPost]
    public ActionResult<TodoItemDto> Create([FromBody] TodoCreateDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto?.Title))
            return BadRequest("Title is required");
        
        var item = repo.Add(dto.Title.Trim());
        var result = new TodoItemDto
        {
            Id = item.Id,
            Title = item.Title,
            IsDone = item.IsDone,
            CreatedAt = item.CreatedAt
        };
        return CreatedAtAction(nameof(GetAll), new { id = result.Id }, result);
    }

    [HttpDelete("{id:int}")]
    public ActionResult Delete(int id)
    {
        var result = repo.Delete(id);
        return result ? NoContent() : NotFound();
    }
}
