using EventsTracker.Api.Data;

namespace EventsTracker.Api.Infrastructure;

public static class EventsApiExtensions
{
    public static IServiceCollection AddEventsTracker(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddTransient<IEventsRepository, EventsRepository>();
        return serviceCollection;
    }
}