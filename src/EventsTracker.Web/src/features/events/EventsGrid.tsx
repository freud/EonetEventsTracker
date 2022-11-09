import * as React from 'react';
import { useQuery } from 'react-query';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Stack, Alert, AlertTitle,
    Button
} from '@mui/material';
import EventGridRow from "./EventGridRow";

export interface Event {
    id: string,
    title: string,
    closed: Date | null,
    categories: Category[]
}

export enum EventType {
    Open = 0,
    Closed = 1
}

export interface Category {
    id: string,
    title: string
}

type EventsQueryKey = ["events", { type: EventType, category: Category | undefined }];
type FetchEvents = { queryKey: EventsQueryKey };

export default function EventsGrid(props: { type: EventType, category: Category | undefined }) {
    const queryKey: EventsQueryKey = ["events", { type: props.type, category: props.category }];
    const { isLoading, isError, data, refetch } = useQuery(
        queryKey,
        ({ queryKey: [, param] }: FetchEvents): Promise<Event[]> => {
            const categoryQueryParameter = param.category?.id ? `&categoryId=${param.category?.id}` : "";
            return fetch(`https://localhost:5001/events?limit=200&days=50&type=${param.type}${categoryQueryParameter}`)
                .then(async res => {
                    if (!res.ok) {
                        return Promise.reject(await res.text());
                    }
                    return res.json();
                })
                .then(events => {
                    return events.map((event: Event) => event)
                })
        },
        {
            refetchInterval: false,
            refetchOnWindowFocus: false,
            useErrorBoundary: false            
        })

    if (isLoading) {
        return (
            <Stack alignItems="center" justifyContent="center">
                <CircularProgress size={70} />
            </Stack>
        )
    }

    if (isError) {
        return (<>
            <Alert variant="filled" severity="error">
                <AlertTitle>Error</AlertTitle>
                Unable to load events!<br />
            </Alert>
            <Button onClick={() => refetch()} color="error" variant="outlined" sx={{ marginTop: 3 }}>Retry...</Button>
        </>)
    }

    return (<>
        <TableContainer component={Paper} sx={{ padding: 1, marginBottom: 3, marginTop: 1 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width={220}>Closed?</TableCell>
                        <TableCell width={110}>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Categories</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.map((event) => (
                        <EventGridRow event={event} key={event.id} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>);
}
