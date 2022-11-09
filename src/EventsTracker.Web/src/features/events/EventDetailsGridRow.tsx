import {
    Chip, CircularProgress, Table, TableBody, TableCell, TableRow
} from "@mui/material";
import * as React from "react";
import { useQuery } from "react-query";

interface EventDetails {
    id: string
    title: string
    description: string
    sources: EventSource[]
    categories: EventCategory[]
}

interface EventSource {
    id: string,
    url: string
}

interface EventCategory {
    id: string,
    title: string
}

type EventQueryKey = ["eventDetails", { id: string }];
type FetchEvent = { queryKey: EventQueryKey };

export default function EventDetailsGridRow(props: { eventId: string }) {
    const queryKey: EventQueryKey = ["eventDetails", { id: props.eventId }];
    const { isLoading, isFetching, data } = useQuery(
        queryKey,
        ({ queryKey: [, param] }: FetchEvent): Promise<EventDetails> =>
            fetch(`https://localhost:5001/events/${param.id}/details`)
                .then(async res => {
                    if (!res.ok) {
                        return Promise.reject(await res.text());
                    }
                    return res.json();
                })
                .then(event => {
                    return event as EventDetails
                }),
        {
            refetchInterval: false,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            enabled: true
        }
    )
    if (isLoading || isFetching) {
        return (
            <TableRow>
                <TableCell colSpan={5}><CircularProgress size={30} /> Loading...</TableCell>
            </TableRow>
        );
    }

    if (data == null) {
        return (
            <TableRow>
                <TableCell colSpan={5}>No data found</TableCell>
            </TableRow>
        );
    }

    return (<>
        <TableRow id={`details-${data.id}`}>
            <TableCell colSpan={5}>
                <Table size="small">
                    <TableBody>
                        <TableRow>
                            <TableCell width={100} component="th" scope="row">Title</TableCell>
                            <TableCell>{data.title}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={100} component="th" scope="row">Categories</TableCell>
                            <TableCell>{data.categories.map((category) => (
                                <Chip key={category.id} label={category.title} onClick={() => {}} />))}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={100} component="th" scope="row">Sources</TableCell>
                            <TableCell>{data.sources.map((category) => (
                                <Chip key={category.id} label={category.id} onClick={() => window.open(category.url, "_blank")} />))}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </TableCell>
        </TableRow>
    </>);
}