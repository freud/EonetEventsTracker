import { FormControl, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

interface DaysSelectProps {
    onChanged: (days: number) => void
    days: number
}

export default function DaysSelect(props: DaysSelectProps) {
    const [value, setValue] = useState<Dayjs>(dayjs().subtract(props.days, 'day'));
    const getNumberOfDaysBack = (date: Dayjs) => dayjs().diff(date, 'day')
    const handleChange = async(newValue: Dayjs | null) => {
        if (newValue === null) {
            return
        }
        setValue(newValue)
        props.onChanged(getNumberOfDaysBack(newValue))
    }
    return (
        <FormControl fullWidth={true}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
                label="Days back from now"
                value={value}
                disableMaskedInput={true}
                disableFuture={true}
                onChange={handleChange}
                renderInput={(params: any) => {
                    const newDays = getNumberOfDaysBack(params.inputProps.value);
                    const textFieldProps = {...params, inputProps: { ...params.inputProps, value: newDays }}
                    return <TextField {...textFieldProps} variant="filled" />
                }}
            />
        </LocalizationProvider>
    </FormControl>);
}