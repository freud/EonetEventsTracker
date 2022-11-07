namespace EventsTracker.Api.Infrastructure;

public class NasaEonetApiOptions
{
    public const string Section = nameof(NasaEonetApiOptions);

    public Uri BaseUrl { get; set; }
}