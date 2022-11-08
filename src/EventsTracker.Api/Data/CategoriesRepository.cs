namespace EventsTracker.Api.Data;

public class CategoriesRepository : ICategoriesRepository
{
    private readonly HttpClient _client;
    private readonly ICategoriesEndpoint _endpoint;

    public CategoriesRepository(HttpClient client, ICategoriesEndpoint endpoint)
    {
        _client = client ?? throw new ArgumentNullException(nameof(client));
        _endpoint = endpoint ?? throw new ArgumentNullException(nameof(endpoint));
    }

    public async Task<IEnumerable<Category>> GetAll(CancellationToken token)
    {
        var uri = await _endpoint.Get();
        var response = await _client.GetAsync(uri, token);
        response.EnsureSuccessStatusCode();
        var body = await response.Content.ReadFromJsonAsync<CategoriesResponse>(cancellationToken: token);
        return body.Categories;
    }
}