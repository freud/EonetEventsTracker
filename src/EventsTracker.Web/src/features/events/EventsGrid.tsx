import * as React from 'react';
import { useQuery } from 'react-query';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Stack
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import EventGridRow from "./EventGridRow";

export interface Event {
    id: string,
    title: string,
    closed: Date | null,
    isClosed: boolean,
    fetchedAt: Date,
    categories: Category[]
}

interface Category {
    id: number,
    title: string
}

export default function EventsGrid() {
    const { isLoading, isFetching, error, data, refetch } = useQuery<Event[]>({
        queryKey: ['repoData'],
        queryFn: () => fetch('https://localhost:5001/events?limit=200&days=50&type=0')
            .then(res => res.json())
            .then(events => {
                return events.map((event: any) => {
                    return { ...event, isClosed: event.closed !== null }
                })
            })
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
            <Stack>
                <LoadingButton onClick={() => refetch()} loading={isFetching}>Refresh</LoadingButton>
            </Stack>
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
    );
}
