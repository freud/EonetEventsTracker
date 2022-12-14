namespace EventsTracker.Api.Data;

public interface IEventsRepository
{
    Task<IEnumerable<Event>> GetEvents(EventsFilter filter, CancellationToken token);
    Task<EventDetails> GetDetails(string eventId, CancellationToken token);
}