import React, { useState } from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import EventsGrid, { Category, EventType } from "./features/events/EventsGrid";
import logo from './logo.svg'
import EventsFilter from "./features/events/EventsFilter";

function App() {
    const [eventType, setEventType] = useState(EventType.Open)
    const [filterCategory, setFilterCategory] = useState<Category | undefined>(undefined)
    const [days, setDays] = useState(10)
    return (<>
        <AppBar position="static" sx={{ marginBottom: 3, padding: 1 }}>
            <Container>
                <Toolbar>
                    <Box component="img" src={logo} sx={{ margin: 0, height: 50}} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        NASA Earth Observatory Natural Events Tracker
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
        <Container>
            <EventsFilter
                type={eventType}
                category={filterCategory}
                days={days}
                onFilterApply={(type, category, days) => {
                    setEventType(type)
                    setFilterCategory(category)
                    setDays(days)
                }} />
            <EventsGrid type={eventType} category={filterCategory} days={days} />
        </Container>
    </>);
}

export default App;
