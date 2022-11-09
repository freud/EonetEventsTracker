namespace EventsTracker.Api.Data;

public class EventsRepository : IEventsRepository
{
    private readonly HttpClient _client;
    private readonly IEventsEndpoint _endpoint;

    public EventsRepository(HttpClient client, IEventsEndpoint endpoint)
    {
        _client = client ?? throw new ArgumentNullException(nameof(client));
        _endpoint = endpoint ?? throw new ArgumentNullException(nameof(endpoint));
    }

    public async Task<IEnumerable<Event>> GetEvents(EventsFilter filter, CancellationToken token)
    {
        var uri = await _endpoint.Get(filter);
        var response = await _client.GetAsync(uri, token);
        response.EnsureSuccessStatusCode();
        var body = await response.Content.ReadFromJsonAsync<EventsResponse>(cancellationToken: token);
        if (body == null)
        {
            throw new InvalidOperationException("Events response is expected to be not empty");
        }
        return body.Events;
    }

    public async Task<EventDetails> GetDetails(string eventId, CancellationToken token)
    {
        var uri = await _endpoint.GetDetails(eventId);
        var response = await _client.GetAsync(uri, token);
        response.EnsureSuccessStatusCode();
        var body = await response.Content.ReadFromJsonAsync<EventDetails>(cancellationToken: token);
        if (body == null)
        {
            throw new InvalidOperationException("Event details response is expected to be not empty");
        }
        return body;
    }
}