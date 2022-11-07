import React from 'react';
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import MapIcon from '@mui/icons-material/Map';

function App() {
    return (<>
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <MapIcon sx={{ margin: 1, fontSize: 40 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        NASA Earth Observatory Natural Events Tracker
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    </>);
}

export default App;
