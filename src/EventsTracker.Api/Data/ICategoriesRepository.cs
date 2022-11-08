namespace EventsTracker.Api.Data;

public interface ICategoriesRepository
{
    Task<IEnumerable<Category>> GetAll(CancellationToken token);
}