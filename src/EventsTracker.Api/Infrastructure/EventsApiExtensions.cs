using EventsTracker.Api.Data;
using Polly;
using Polly.Extensions.Http;

namespace EventsTracker.Api.Infrastructure;

public static class EventsApiExtensions
{
    public static IServiceCollection AddEventsTracker(
        this IServiceCollection serviceCollection,
        ConfigurationManager configuration)
    {
        serviceCollection.AddTransient<IEventsEndpoint, EventsEndpointBuilder>();
        serviceCollection.AddTransient<ICategoriesEndpoint, CategoriesEndpointBuilder>();
        serviceCollection.Configure<NasaEonetApiOptions>(configuration.GetSection(NasaEonetApiOptions.Section));
        serviceCollection
            .AddHttpClient<IEventsRepository, EventsRepository>()
            .AddPolicyHandler(GetRetryPolicy());
        serviceCollection
            .AddHttpClient<ICategoriesRepository, CategoriesRepository>()
            .AddPolicyHandler(GetRetryPolicy());
        return serviceCollection;
    }

    private static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy()
    {
        return HttpPolicyExtensions
            .HandleTransientHttpError()
            .WaitAndRetryAsync(3, _ => TimeSpan.FromMilliseconds(100));
    }
}