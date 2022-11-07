import * as React from 'react';
import { useQuery } from 'react-query';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Stack, Typography, Chip
} from '@mui/material';
import EventsGridCell from "./EventsGridCell";
import EventTypeIcon from "./EventTypeIcon";
import EventClosedInformation from "./EventClosedInformation";

interface Event {
    id: string,
    title: string,
    closed: Date | null,
    isClosed: boolean,
    categories: Category[]
}

interface Category {
    id: number,
    title: string
}

export default function EventsGrid() {
    const { isLoading, error, data } = useQuery<Event[]>({
        queryKey: ['repoData'],
        queryFn: () => fetch('https://localhost:5001/events?limit=200&days=50&type=0')
            .then(res => res.json())
            .then(data => data.map((r: Event) => {
                return { ...r, isClosed: r.closed !== null }
            }))
    })

    if (isLoading) {
        return (
            <Stack alignItems="center" justifyContent="center">
                <CircularProgress size={70} />
            </Stack>
        )
    }

    if (error) {
        return (<>An error has occurred: {error}</>)
    }

    return (
        <TableContainer component={Paper} sx={{ padding: 1, marginBottom: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width={220}>Closed?</TableCell>
                        <TableCell width={110}>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Categories</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.map((event) => (
                        <TableRow key={event.id}>
                            <EventsGridCell disabled={event.isClosed}>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <EventTypeIcon isClosed={event.isClosed} />
                                    <EventClosedInformation closedAt={event.closed} />
                                </Stack>
                            </EventsGridCell>
                            <EventsGridCell disabled={event.isClosed}>{event.id}</EventsGridCell>
                            <EventsGridCell disabled={event.isClosed}>{event.title}</EventsGridCell>
                            <EventsGridCell disabled={event.isClosed}>
                                {event.categories.map((category) => (<Chip key={category.id} label={category.title} />))}
                            </EventsGridCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
