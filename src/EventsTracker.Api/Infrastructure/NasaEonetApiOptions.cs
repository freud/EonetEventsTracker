namespace EventsTracker.Api.Infrastructure;

#nullable disable
public class NasaEonetApiOptions
{
    public const string Section = nameof(NasaEonetApiOptions);

    public Uri BaseUrl { get; set; }
}