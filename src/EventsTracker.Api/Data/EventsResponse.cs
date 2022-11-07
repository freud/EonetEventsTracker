using System.Text.Json.Serialization;

namespace EventsTracker.Api.Data;

public class EventsResponse
{
    [JsonPropertyName("events")]
    public IEnumerable<Event> Events { get; set; }
}