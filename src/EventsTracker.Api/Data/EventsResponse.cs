using System.Text.Json.Serialization;

namespace EventsTracker.Api.Data;

#nullable disable
public class EventsResponse
{
    [JsonPropertyName("events")]
    public IEnumerable<Event> Events { get; set; }
}