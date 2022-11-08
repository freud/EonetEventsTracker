using System.Text.Json.Serialization;

namespace EventsTracker.Api.Data;

public class Category
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("title")]
    public string Title { get; set; }
}