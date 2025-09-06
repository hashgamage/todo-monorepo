using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using TodoApi.Dtos;
using TodoApi.Tests.API;
using Xunit;

namespace TodoApi.Tests.API
{
    public class TodosApiTests:IAsyncLifetime
    {
        private WebApplicationFactory<Program> _factory = default!;
        private HttpClient _client = default!;

        public Task InitializeAsync()
        {
            _factory = new WebApplicationFactory<Program>();
            _client = _factory.CreateClient();
            return Task.CompletedTask;
        }

        public Task DisposeAsync()
        {
             _client.Dispose();
             _factory.Dispose();
             return Task.CompletedTask;
        }

        [Fact]
        public async Task GetAll_ShouldReturnEmptyArrayInitially()
        {
            var response = await _client.GetAsync("/api/todos");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var items = await response.Content.ReadFromJsonAsync<List<TodoItemDto>>();
            items.Should().NotBeNull();
            items!.Should().BeEmpty();
        }

        [Fact]
        public async Task Post_Then_Get_ShouldReturnCreatedItem()
        {
           var create= new TodoCreateDto{Title="Test Item"};
           var postResponse = await _client.PostAsJsonAsync("/api/todos",create);
           postResponse.StatusCode.Should().Be(HttpStatusCode.Created);

           var created = await postResponse.Content.ReadFromJsonAsync<TodoItemDto>();
           created.Should().NotBeNull();
           created!.Id.Should().BeGreaterThan(0);
           created.Title.Should().Be("Test Item");
           created.IsDone.Should().BeFalse();

           var getResponse = await _client.GetAsync("/api/todos");
           getResponse.StatusCode.Should().Be(HttpStatusCode.OK);
           var items = await getResponse.Content.ReadFromJsonAsync<List<TodoItemDto>>();
           items.Should().NotBeNull();
           items!.Select(x => x.Id).Should().Contain(created.Id);
        }

        [Fact]
        public async Task Delete_ShouldReturn204_And_404WhenDeletingNonExistingItem()
        {
            var create= new TodoCreateDto{Title="To delete Item"};
            var postResponse = await _client.PostAsJsonAsync("/api/todos",create);
            var created = await postResponse.Content.ReadFromJsonAsync<TodoItemDto>();
            created!.Id.Should().BeGreaterThan(0);

            var deleteResponse1 = await _client.DeleteAsync($"/api/todos/{created.Id}");
            deleteResponse1.StatusCode.Should().Be(HttpStatusCode.NoContent);

            var deleteResponse2 = await _client.DeleteAsync($"/api/todos/{created.Id}");
            deleteResponse2.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task Post_ShouldRejectEmptyTitle()
        {
            var create= new TodoCreateDto{Title=""};
            var postResponse = await _client.PostAsJsonAsync("/api/todos",create);
            postResponse.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }
    }
}