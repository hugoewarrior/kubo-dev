/**
 * Component in displayed when code its been send to user's and it display the options to
 * update the password
 */
import { useContext, useEffect, useState } from 'react';

import { Box, Button, Container, CssBaseline, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import { CustomSnackBar } from '../../../components'
import { AlertTitleVariants } from '../../../types'


interface IResetPasswordForm {
    Username: string | null
    newPassword: string
    verification_code: string
    newPassword_2: string
}

export const ForgotPasswordResetComponent = () => {

    const navigate = useNavigate();
    const location = useLocation();



    const [snack_, setSnack] = useState(
        {
            message: null,
            snack_type: "info"
        } as any
    );

    const [reset_form, setResetForm] = useState({
        Username: null,
        newPassword: '',
        newPassword_2: '',
        verification_code: '',
    } as IResetPasswordForm);

    const [loading, setLoading] = useState(false as boolean)


    /**
     * Local functions
     */

    /**
     * Updates the values for local state
     * @param prop_name 
     * @param value 
     */
    const update_log_in_form_prop = (prop_name: string, value: string | null) => {
        setResetForm((l) => {
            return { ...l, [prop_name]: value }
        })
    }



    /**
     * 
     */


    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {reset_form.Username ?
                    <>
                        <Typography variant="h5">
                            Please, verify your email
                        </Typography>
                        <Typography variant="caption">
                            We just send you a verification code
                        </Typography>
                    </>
                    :
                    <>
                        <Typography variant="h5">
                            Ups! Something went wrong
                        </Typography>
                        <Typography variant="caption">
                            We were not able to process this action, to back to
                            <Link href={"#"} variant="body2">
                                {String(" " + "recover page")}
                            </Link> and try again.
                        </Typography>
                    </>

                }

                {reset_form.Username ?
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <Divider />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="verification_code"
                            label="Verification code"
                            name="verification_code"
                            autoFocus
                            onChange={(e) => {

                                update_log_in_form_prop('verification_code', e.target.value);
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="newPassword"
                            label="Enter New Password"
                            name="newPassword"
                            autoFocus
                            onChange={(e) => {

                                update_log_in_form_prop('newPassword', e.target.value);

                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="newPassword_2"
                            label="Confirm New Password"
                            name="newPassword_2"
                            autoFocus
                            onChange={(e) => {

                                update_log_in_form_prop('newPassword_2', e.target.value);

                            }}
                        />
                        <Button
                            //type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loading ? "Changing password..." : "Change password"}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href={"#"} variant="body2">
                                    Return to Log In page
                                </Link>
                            </Grid>
                        </Grid>
                    </Box> :
                    null
                }

            </Box >
            <CustomSnackBar
                message={String(snack_.message)}
                open={Boolean(snack_.message)}
                variant={snack_.snack_type}
                onClose={() => setSnack((l: any) => { return { ...l, message: null } })}
                hiddeable={false}
            />
        </Container >
    )
}
