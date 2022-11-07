namespace EventsTracker.Api.Data;

public interface IEventsEndpoint
{
    Task<Uri> Get(EventsFilter filter);
}