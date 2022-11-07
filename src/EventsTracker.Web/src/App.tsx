import React from 'react';
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import MapIcon from '@mui/icons-material/Map';
import EventsGrid from "./features/events/EventsGrid";

function App() {
    return (<>
        <AppBar position="static" sx={{ marginBottom: 3 }}>
            <Container>
                <Toolbar>
                    <MapIcon sx={{ margin: 1, fontSize: 40 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        NASA Earth Observatory Natural Events Tracker
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
        <Container>
            <EventsGrid />
        </Container>
    </>);
}

export default App;
