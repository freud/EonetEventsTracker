using EventsTracker.Api.Infrastructure;
using Microsoft.Extensions.Options;

namespace EventsTracker.Api.Data;

public class EventsEndpointBuilder : IEventsEndpoint
{
    private readonly NasaEonetApiOptions _options;

    public EventsEndpointBuilder(IOptionsSnapshot<NasaEonetApiOptions> options)
    {
        _options = options.Value;
    }

    public async Task<Uri> Get(EventsFilter filter)
    {
        var endpoint = "api/v3/events";
        var queryParameters = new List<string>
        {
            $"limit={filter.Limit}",
            $"days={filter.Days}"
        };
        if (filter.CategoryId != null)
        {
            queryParameters.Add($"category={filter.CategoryId}");
        }
        switch (filter.Type)
        {
            case EventStatus.Open:
                queryParameters.Add("status=open");
                break;
            case EventStatus.Closed:
                queryParameters.Add("status=closed");
                break;
        }

        var queryString = string.Join("&", queryParameters);
        return new Uri($"{_options.BaseUrl}{endpoint}?{queryString}", UriKind.Absolute);
    }

    public async Task<Uri> GetDetails(string eventId)
    {
        var endpoint = "api/v3/events";
        return new Uri($"{_options.BaseUrl}{endpoint}/{eventId}", UriKind.Absolute);
    }
}