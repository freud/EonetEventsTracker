namespace EventsTracker.Api.Data;

public interface IEventsRepository
{
    Task<IEnumerable<Event>> GetEvents(EventsFilter filter);
}

public class EventsRepository : IEventsRepository
{
    public async Task<IEnumerable<Event>> GetEvents(EventsFilter filter)
    {
        return new[]
        {
            new Event
            {
                Id = "test",
                Title = "Test title",
                ClosedAt = null
            }
        };
    }
}