import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import EventsGrid from "./features/events/EventsGrid";
import logo from './logo.svg'

function App() {
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
            <EventsGrid />
        </Container>
    </>);
}

export default App;
