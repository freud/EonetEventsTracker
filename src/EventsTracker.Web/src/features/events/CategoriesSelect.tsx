import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import * as React from "react";
import { useQuery } from "react-query";
import { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import { Category, getCategories } from "./api";

interface CategoriesSelectProps {
    onCategoryChanged: (category: Category | undefined) => void
    category: Category | undefined
}

export default function CategoriesSelect(props: CategoriesSelectProps) {
    const [categoryId, setCategoryId] = useState<string | undefined>(
        props.category ? props.category.id : '');
    const { isLoading, isFetching, data } = useQuery(
        {
            refetchInterval: false,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            enabled: true,
            queryFn: (): Promise<Category[]> => getCategories()
        }
    )

    const isInitializing = isLoading || isFetching;
    const clear = () => {
        setCategoryId('')
        props.onCategoryChanged(undefined)
    }
    const onChange = (e: SelectChangeEvent) => {
        setCategoryId(e.target.value)
        const selectedCategory = data?.find(category => category.id === e.target.value);
        props.onCategoryChanged(selectedCategory)
    }
    return (<>
        <FormControl variant="filled" fullWidth={true}>
            <InputLabel>Categories</InputLabel>
            <Select value={categoryId} displayEmpty IconComponent={() => null} onChange={onChange}
                    endAdornment={<IconButton onClick={clear}><ClearIcon /></IconButton>}>
                {!isInitializing && data &&
                    data.map(category => <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>)}
            </Select>
        </FormControl>
    </>);
}