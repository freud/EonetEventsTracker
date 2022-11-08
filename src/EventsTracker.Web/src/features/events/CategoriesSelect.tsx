import { FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import * as React from "react";
import { useQuery } from "react-query";
import { Category } from "./EventsGrid";
import { useState } from "react";

interface CategoriesSelectProps {
    onCategoryChanged: (category: Category) => void
}

export default function CategoriesSelect(props: CategoriesSelectProps) {
    const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
    const { isLoading, isFetching, data } = useQuery(
        {
            refetchInterval: false,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            enabled: true,
            queryFn: (): Promise<Category[]> =>
                fetch('https://localhost:5001/categories')
                    .then(async res => {
                        if (!res.ok) {
                            return Promise.reject(await res.text());
                        }
                        return res.json();
                    })
                    .then(data => data.map((c: Category) => c))
        }
    )

    const isInitializing = isLoading || isFetching;

    return (<>
        <FormControl variant="filled" fullWidth={true}>
            <InputLabel>Categories</InputLabel>
            <Select value={categoryId} onChange={(e) => {
                setCategoryId(e.target.value as string)
                const selectedCategory = data?.find(category => category.id === e.target.value);
                if (selectedCategory) {
                    props.onCategoryChanged(selectedCategory)
                }
            }}>
                {!isInitializing && data && data.map(category => <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>)}
            </Select>
        </FormControl>
    </>);
}