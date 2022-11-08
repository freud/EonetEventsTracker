using System.Text.Json.Serialization;

namespace EventsTracker.Api.Data;

public class Source
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("url")]
    public string Url { get; set; }
}