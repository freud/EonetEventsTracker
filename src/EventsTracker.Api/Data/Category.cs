using System.Text.Json.Serialization;

namespace EventsTracker.Api.Data;

public class Category
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("title")]
    public string Title { get; set; }
}