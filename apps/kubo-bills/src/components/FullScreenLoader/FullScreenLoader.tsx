import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { SxProps, Theme } from '@mui/material/styles';

const style: SxProps<Theme> = {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',


};

interface IFullScreenLoader {
    open: boolean
}

export const FullScreenLoader = ({ open }: IFullScreenLoader) => {
    return (
        <div>
            <Modal
                open={open}
                //onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
                keepMounted={true}
                disableEscapeKeyDown={true}
                disableAutoFocus={true}
                disablePortal={true}
            >
                <Box sx={style}>
                    <CircularProgress />
                    <Typography>Checking...</Typography>
                </Box>
            </Modal>
        </div>
    );
}