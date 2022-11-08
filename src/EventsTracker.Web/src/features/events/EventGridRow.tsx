import { TableCell, TableRow, Stack, Chip, ToggleButton } from "@mui/material";
import EventTypeIcon from "./EventTypeIcon";
import EventClosedInformation from "./EventClosedInformation";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import * as React from "react";
import EventsGridCell from "./EventsGridCell";
import { Event } from './EventsGrid'
import EventDetailsGridRow from "./EventDetailsGridRow";
import { useState } from "react";

export default function EventGridRow(props: { event: Event }) {

    const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

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
                <ToggleButton value="check" selected={isDetailsExpanded} 
                    onChange={() => setIsDetailsExpanded(!isDetailsExpanded)}>
                    {isDetailsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    Details                    
                </ToggleButton>
            </TableCell>
        </TableRow>
        {isDetailsExpanded && <EventDetailsGridRow eventId={props.event.id} />}
    </>);
}