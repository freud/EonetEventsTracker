using System.Text.Json.Serialization;

namespace EventsTracker.Api.Data;

#nullable disable
public class CategoriesResponse
{
    [JsonPropertyName("categories")]
    public IEnumerable<Category> Categories { get; set; }
}