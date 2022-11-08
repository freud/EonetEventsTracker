using EventsTracker.Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace EventsTracker.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoriesRepository _repository;

    public CategoriesController(ICategoriesRepository repository)
    {
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
    }

    [HttpGet]
    public async Task<IEnumerable<Category>> Get(CancellationToken token)
    {
        return await _repository.GetAll(token);
    }
}