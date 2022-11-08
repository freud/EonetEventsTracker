import { TableCell, TableRow, Stack, Chip, Button } from "@mui/material";
import EventTypeIcon from "./EventTypeIcon";
import EventClosedInformation from "./EventClosedInformation";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as React from "react";
import EventsGridCell from "./EventsGridCell";
import { Event } from './EventsGrid'

export interface EventDetails {
    id: string,
    title: string,
    description: string
}

export default function EventGridRow(props: { event: Event }) {
    return (<>
        <TableRow key={props.event.id}>
            <EventsGridCell disabled={props.event.isClosed}>
                <Stack direction="row" alignItems="center" gap={1}>
                    <EventTypeIcon isClosed={props.event.isClosed} />
                    <EventClosedInformation closedAt={props.event.closed} />
                </Stack>
            </EventsGridCell>
            <EventsGridCell disabled={props.event.isClosed}>{props.event.id}</EventsGridCell>
            <EventsGridCell disabled={props.event.isClosed}>{props.event.title}</EventsGridCell>
            <EventsGridCell disabled={props.event.isClosed}>
                {props.event.categories.map((category) => (
                    <Chip key={category.id} label={category.title} />))}
            </EventsGridCell>
            <TableCell>
                <Button variant="text" startIcon={<ExpandMoreIcon />}>Details</Button>
            </TableCell>
        </TableRow>
        {/*<EventDetailsGridRow eventDetails={tableRow as EventDetails} />*/}
    </>);
}