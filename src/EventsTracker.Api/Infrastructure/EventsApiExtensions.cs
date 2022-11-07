using EventsTracker.Api.Data;

namespace EventsTracker.Api.Infrastructure;

public static class EventsApiExtensions
{
    public static IServiceCollection AddEventsTracker(
        this IServiceCollection serviceCollection,
        ConfigurationManager configuration)
    {
        serviceCollection.AddTransient<IEventsEndpoint, EventsEndpointBuilder>();
        serviceCollection.Configure<NasaEonetApiOptions>(configuration.GetSection(NasaEonetApiOptions.Section));
        serviceCollection.AddHttpClient<IEventsRepository, EventsRepository>();
        return serviceCollection;
    }
}