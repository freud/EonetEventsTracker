using EventsTracker.Api.Data;
using EventsTracker.Api.Infrastructure;
using Microsoft.Extensions.Options;
using NSubstitute;
using Shouldly;
using Xunit;

namespace EventsTracker.Api.Tests;

public class EventsEndpointBuilderTests
{
    // Single demo unit test
    [Theory]
    [MemberData(nameof(UseCases))]
    public async Task filter__build__returns_absolute_uri_endpoint(EventsFilter filter, Uri endpoint)
    {
        var result = await _sut.Get(filter);
        
        result.ShouldBe(endpoint);
    }

    public static IEnumerable<object[]> UseCases =>
        new List<object[]>
        {
            new object[]
            {
                new EventsFilter(),
                new Uri("https://test-endpoint.com/api/v2.1/events?limit=10&days=1&status=open")
            },

            new object[] {
                new EventsFilter
                {
                    Days = 4,
                    Limit = 67,
                    Type = EventStatus.Closed
                },
                new Uri("https://test-endpoint.com/api/v2.1/events?limit=67&days=4&status=closed") 
            },
            
            new object[] {
                new EventsFilter
                {
                    Days = 90,
                    Limit = 200,
                    Type = EventStatus.Open
                },
                new Uri("https://test-endpoint.com/api/v2.1/events?limit=200&days=90&status=open") 
            }
        };

    private readonly EventsEndpointBuilder _sut;

    public EventsEndpointBuilderTests()
    {
        var options = Substitute.For<IOptionsSnapshot<NasaEonetApiOptions>>();
        options.Value.Returns(new NasaEonetApiOptions
        {
            BaseUrl = new Uri("https://test-endpoint.com")
        });
        _sut = new EventsEndpointBuilder(options);
    }
}