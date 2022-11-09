import React, { useState } from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import EventsGrid, { Category, EventType } from "./features/events/EventsGrid";
import logo from './logo.svg'
import EventsFilter from "./features/events/EventsFilter";

function App() {
    const [eventType, setEventType] = useState(EventType.Open)
    const [filterCategory, setFilterCategory] = useState<Category | undefined>(undefined)
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
                onFilterApply={(type, category) => {
                    setEventType(type)
                    setFilterCategory(category)
                }} />
            <EventsGrid type={eventType} category={filterCategory} />
        </Container>
    </>);
}

export default App;
