namespace EventsTracker.Api.Data;

public interface IEventsEndpoint
{
    Uri Get(EventsFilter filter);
    Uri GetDetails(string eventId);
}