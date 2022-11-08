import { Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import * as React from "react";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CategoriesSelect from "./CategoriesSelect";
import { Category } from "./EventsGrid";

export enum EventType {
    Open = 0,
    Closed = 1
}

interface FilterCallbacks {
    onFilterApply: (type: EventType, category: Category | undefined) => void
    isLoading?: boolean
}

export default function EventsFilter(props: FilterCallbacks) {
    const [type, setType] = useState(EventType.Open);
    const [category, setCategory] = useState<Category | undefined>(undefined);
    const applyFilter = () =>{
        props.onFilterApply(type, category);
    }

    return (<Stack direction='row' justifyContent="end">
        <FormControl variant="filled" fullWidth={true}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value as EventType)}>
                <MenuItem value={EventType.Open}>Open</MenuItem>
                <MenuItem value={EventType.Closed}>Closed</MenuItem>
            </Select>
        </FormControl>
        <CategoriesSelect onCategoryChanged={category => setCategory(category)} />
        <LoadingButton variant="outlined" onClick={() => applyFilter()} loading={props.isLoading}><RestartAltIcon /></LoadingButton>
    </Stack>);
}