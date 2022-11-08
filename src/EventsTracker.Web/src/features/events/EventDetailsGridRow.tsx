import { TableCell, TableRow } from "@mui/material";
import * as React from "react";
import { EventDetails } from './EventGridRow'

export default function EventDetailsGridRow(props: { eventDetails: EventDetails }) {
    return (<>
        <TableRow id={`details-${props.eventDetails.id}`}>
            <TableCell colSpan={5}>TEST</TableCell>
        </TableRow>
    </>);
}