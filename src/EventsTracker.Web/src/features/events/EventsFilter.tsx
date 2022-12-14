import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import * as React from "react";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CategoriesSelect from "./CategoriesSelect";
import { Category, EventType } from "./api";
import DaysSelect from "./DaysSelect";

interface FilterProps {
    onFilterApply: (type: EventType, category: Category | undefined, numberOfDaysBack: number) => void
    type: EventType,
    category: Category | undefined,
    days: number
}

export default function EventsFilter(props: FilterProps) {
    const [type, setType] = useState(props.type);
    const [category, setCategory] = useState<Category | undefined>(props.category);
    const [days, setDays] = useState<number>(10);
    const applyFilter = () =>{
        props.onFilterApply(type, category, days);
    }

    return (<Stack direction='row' justifyContent="end">
        <FormControl variant="filled" fullWidth={true}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value as EventType)}>
                <MenuItem value={EventType.Open}>Open</MenuItem>
                <MenuItem value={EventType.Closed}>Closed</MenuItem>
            </Select>
        </FormControl>
        <CategoriesSelect category={category} onCategoryChanged={category => setCategory(category)} />
        <DaysSelect days={days} onChanged={(days) => setDays(days)} />
        <LoadingButton variant="outlined" onClick={() => applyFilter()}><RestartAltIcon /></LoadingButton>
    </Stack>);
}