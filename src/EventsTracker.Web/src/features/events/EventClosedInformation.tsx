import { Typography } from "@mui/material";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)

export default function EventClosedInformation(props: { closedAt: Date | null }) {
    if (props.closedAt) {
        return (<Typography>{dayjs.utc(props.closedAt).format('YYYY-MM-DD HH:mm:ss')}</Typography>);
    }
    return (<Typography>not closed</Typography>);
}