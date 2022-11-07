import * as React from 'react';
import { useQuery } from 'react-query';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Stack } from '@mui/material';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)

interface Event {
    id: string,
    title: string,
    closed: Date
}
export default function EventsGrid() {
    const { isLoading, error, data } = useQuery<Event[]>({
        queryKey: ['repoData'],
        queryFn: () => fetch('https://localhost:5001/events?limit=100&days=50&Type=1').then(res => res.json())
    })

    if (isLoading) {
        return (
            <Stack alignItems="center" justifyContent="center">
                <CircularProgress size={70} />
            </Stack>
        );
    }
    if (error) {
        return (<>
            'An error has occurred: ' + error
        </>)
    }

    return (
        <TableContainer component={Paper} sx={{ padding: 1, marginBottom: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width={170}>Closed</TableCell>
                        <TableCell width={110}>ID</TableCell>
                        <TableCell>Title</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{dayjs.utc(row.closed).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.title}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
