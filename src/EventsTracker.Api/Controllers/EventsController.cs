using EventsTracker.Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace EventsTracker.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class EventsController : ControllerBase
{
    private readonly IEventsRepository _repository;

    public EventsController(IEventsRepository repository)
    {
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public async Task<IEnumerable<Event>> Get([FromQuery]EventsFilter filter)
    {
        return await _repository.GetEvents(filter);
    }
}