using EventsTracker.Api.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddEventsTracker(builder.Configuration);

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors(policyBuilder =>
{
    policyBuilder.AllowAnyOrigin();
});
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();