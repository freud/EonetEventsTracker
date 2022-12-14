using System.Text.Json.Serialization;

namespace EventsTracker.Api.Data;

#nullable disable
public class Event
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("title")]
    public string Title { get; set; }
    
    [JsonPropertyName("closed")]
    public DateTime? ClosedAt { get; set; }

    public Category[] Categories { get; set; }
}