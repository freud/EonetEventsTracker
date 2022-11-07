namespace EventsTracker.Api.Data;

public class EventsFilter
{
    /// <summary>
    /// Events that have ended are assigned a closed date and the existence
    /// of that date will allow you to filter for only-open or only-closed events.
    /// Omitting the status parameter will return only the currently open events.
    /// </summary>
    public EventStatus Type { get; set; }
    
    /// <summary>
    /// Limits the number of events returned.
    /// </summary>
    public int Limit { get; set; }
    
    /// <summary>
    /// Limit the number of prior days (including today) from which events will be returned.
    /// </summary>
    public int Days { get; set; }
}