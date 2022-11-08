import { Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import * as React from "react";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export enum EventType {
    Open = 0,
    Closed = 1
}

interface FilterCallbacks {
    onFilterApply: (type: EventType) => void
    isLoading?: boolean
}

export default function EventsFilter(props: FilterCallbacks) {
    const [type, setType] = useState(EventType.Open);
    const applyFilter = () =>{
        props.onFilterApply(type);
    }

    return (<Stack direction='row' justifyContent="end">
        <FormControl variant="filled" fullWidth={true}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value as EventType)}>
                <MenuItem value={EventType.Open}>Open</MenuItem>
                <MenuItem value={EventType.Closed}>Closed</MenuItem>
            </Select>
        </FormControl>
        <LoadingButton variant="outlined" onClick={() => applyFilter()} loading={props.isLoading}><RestartAltIcon /></LoadingButton>
    </Stack>);
}