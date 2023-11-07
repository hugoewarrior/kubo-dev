import React from 'react';
import { AlertTitle, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { AlertTitleVariants } from '../../types';


interface SnackBarProps {
    message: string,
    variant: AlertTitleVariants
    onClose: () => void,
    open: boolean,
    hiddeable: boolean
}



export const CustomSnackBar = (props: SnackBarProps) => {
    const { open, onClose, message, hiddeable, variant } = props

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={hiddeable ? 6000 : null}
            onClose={onClose}
            message={message}
            disableWindowBlurListener={true}
        >
            <Alert onClose={onClose} severity={variant}>
                <AlertTitle>{variant.charAt(0).toLocaleUpperCase() + variant.slice(1)}</AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    );
}