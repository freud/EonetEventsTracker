using System.Text.Json.Serialization;

namespace EventsTracker.Api.Data;

public class CategoriesResponse
{
    [JsonPropertyName("categories")]
    public IEnumerable<Category> Categories { get; set; }
}