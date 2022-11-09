export interface Event {
    id: string,
    title: string,
    closed: Date | null,
    categories: Category[]
}

export interface Category {
    id: string,
    title: string
}

export enum EventType {
    Open = 0,
    Closed = 1
}

export interface EventDetails {
    id: string
    title: string
    description: string
    sources: EventSource[]
    categories: EventCategory[]
}

export interface EventSource {
    id: string,
    url: string
}

export interface EventCategory {
    id: string,
    title: string
}

export const getCategories = () => fetch(`${process.env.REACT_APP_API_BASE_URL}/categories`)
    .then(async res => {
        if (!res.ok) {
            return Promise.reject(await res.text());
        }
        return res.json();
    })
    .then(data => data.map((c: Category) => c))

export const getEvents = (days: number, type: EventType, category: Category | undefined) => {
    const categoryQueryParameter = category?.id ? `&categoryId=${category?.id}` : "";
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/events?limit=200&days=${days}&type=${type}${categoryQueryParameter}`)
        .then(async res => {
            if (!res.ok) {
                return Promise.reject(await res.text());
            }
            return res.json();
        })
        .then(events => {
            return events.map((event: Event) => event)
        })
}

export const getEventDetails = (eventId: string) => fetch(`${process.env.REACT_APP_API_BASE_URL}/events/${eventId}/details`)
    .then(async res => {
        if (!res.ok) {
            return Promise.reject(await res.text());
        }
        return res.json();
    })
    .then(event => {
        return event as EventDetails
    })