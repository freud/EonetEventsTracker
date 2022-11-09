using EventsTracker.Api.Infrastructure;
using Microsoft.Extensions.Options;

namespace EventsTracker.Api.Data;

public class CategoriesEndpointBuilder : ICategoriesEndpoint
{
    private readonly NasaEonetApiOptions _options;

    public CategoriesEndpointBuilder(IOptionsSnapshot<NasaEonetApiOptions> options)
    {
        _options = options.Value;
    }

    public Uri Get()
    {
        var endpoint = "api/v3/categories";
        return new Uri($"{_options.BaseUrl}{endpoint}", UriKind.Absolute);
    }
}