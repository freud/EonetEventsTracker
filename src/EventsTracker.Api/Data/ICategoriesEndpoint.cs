namespace EventsTracker.Api.Data;

public interface ICategoriesEndpoint
{
    Task<Uri> Get();
}