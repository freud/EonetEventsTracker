import { CircularProgress, Stack, TableCell, TableRow } from "@mui/material";
import * as React from "react";
import { useQuery } from "react-query";

export interface EventDetails {
    id: string,
    title: string,
    description: string
}

export type EventQueryKey = ["eventDetails", { id: string }];
export type FetchEvent = { queryKey: EventQueryKey };

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
            onError: () => console.log("eeerrrrrrrrrr"),
            refetchInterval: false,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            enabled: true
        }
    )
    if (isLoading || isFetching || data == null) {
        return (
            <TableRow>
                <TableCell colSpan={5}><CircularProgress size={30} /></TableCell>
            </TableRow>
        );
    }
    return (<>
        <TableRow id={`details-${data.id}`}>
            <TableCell colSpan={5}>{data.title}</TableCell>
        </TableRow>
    </>);
}