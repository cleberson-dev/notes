import React from 'react';

import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade';


function MyAlert({ type, message, open = false }) {
    return (
        <Fade in={open}>
            <Box display="flex" justifyContent="center">
                <Box position="absolute" bottom={20} width="50%">
                    <Alert severity={type} elevation={6} variant="filled">
                        {message}
                    </Alert>
                </Box>
            </Box>
        </Fade>
    );
}

export default MyAlert;