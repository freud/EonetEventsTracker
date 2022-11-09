import * as React from 'react';
import { useQuery } from 'react-query';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Stack, Alert, AlertTitle,
    Button, TableSortLabel
} from '@mui/material';
import EventGridRow from "./EventGridRow";
import _ from 'lodash'

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

type Order = 'asc' | 'desc';
type EventsQueryKey = ["events", {
    type: EventType,
    category: Category | undefined,
    days: number
}];
type FetchEvents = { queryKey: EventsQueryKey };

export default function EventsGrid(props: { type: EventType, category: Category | undefined, days: number }) {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Event>('id');
    const handleSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Event,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const queryKey: EventsQueryKey = ["events", {
        type: props.type,
        category: props.category,
        days: props.days
    }];
    const { isLoading, isError, data, refetch } = useQuery(
        queryKey,
        ({ queryKey: [, param] }: FetchEvents): Promise<Event[]> => {
            const categoryQueryParameter = param.category?.id ? `&categoryId=${param.category?.id}` : "";
            return fetch(`${process.env.REACT_APP_API_BASE_URL}/events?limit=200&days=${param.days}&type=${param.type}${categoryQueryParameter}`)
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
                        <TableCell width={220}><TableSortLabel onClick={(e) => handleSort(e, 'closed')} active={orderBy === 'closed'} direction={orderBy === 'closed' ? order : 'asc'}>Closed?</TableSortLabel></TableCell>
                        <TableCell width={110}><TableSortLabel onClick={(e) => handleSort(e, 'id')} active={orderBy === 'id'} direction={orderBy === 'id' ? order : 'asc'}>ID</TableSortLabel></TableCell>
                        <TableCell><TableSortLabel onClick={(e) => handleSort(e, 'title')} active={orderBy === 'title'} direction={orderBy === 'title' ? order : 'asc'}>Title</TableSortLabel></TableCell>
                        <TableCell>Categories</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && _.orderBy(data, [orderBy], [order]).map((event) => (
                        <EventGridRow event={event} key={event.id} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>);
}
