using System.Text.Json.Serialization;

namespace EventsTracker.Api.Data;

public class EventDetails
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("title")]
    public string Title { get; set; }
    
    [JsonPropertyName("closed")]
    public DateTime? ClosedAt { get; set; }

    [JsonPropertyName("categories")]
    public Category[] Categories { get; set; }
}