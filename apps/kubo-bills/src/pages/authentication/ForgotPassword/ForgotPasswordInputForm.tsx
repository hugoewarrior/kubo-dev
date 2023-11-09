/**
 * Component displayed when user select the "Forgot Password option", showing a box to insert the username or email they want
 * to recover 
 */

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { AuthContext, isError, returnErrorMessage, returnStringRoute } from '@kubo-dev/kubo-auth';
import { Avatar, Box, Button, Container, CssBaseline, Divider, Grid, TextField, Typography } from '@mui/material';
import { FormValidatorContext } from '@kubo-dev/form-validator';
import { CustomSnackBar } from '../../../components';
import { ISnackMessage } from '../../../types';
import { AUTH_PREFIX, AUTH_ROUTES } from '../../../routes';


interface IForgotPasswordPageForm {
    username: string
}

export const ForgotPasswordInputForm = () => {

    const { forgotPasswordInit } = useContext(AuthContext);
    const formValidator = useContext(FormValidatorContext);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false as boolean)

    const [snack, setSnack] = useState(
        {
            message: null,
            snackType: "info"
        } as ISnackMessage
    );
    const [forgotForm, setForgotForm] = useState({
        username: '',
    } as IForgotPasswordPageForm);





    /**
     * Local functions
     */

    const submitForm = async () => {
        setLoading(true);
        try {
            const resp = await forgotPasswordInit(forgotForm.username)
            setLoading(false);
            navigate(returnStringRoute(AUTH_PREFIX, AUTH_ROUTES.FORGOT_RESET), { state: { origin: resp, username: forgotForm.username } });
        } catch (e) {
            setLoading(false);
            setSnack(() => { return { message: String(e), snackType: "error" } })
        }
    }

    const validateForm = () => {
        formValidator.are_any_errors();
        formValidator.text_error_validator("username", forgotForm.username, [2]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };


    /**
     * Updates the values for local state
     * @param prop_name 
     * @param value 
     */
    const updateSpecificValue = (prop_name: string, value: string) => {
        setForgotForm((l) => {
            return { ...l, [prop_name]: value }
        })
    }

    useEffect(() => {
        validateForm();
        return () => formValidator.clean_object(["username"]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        validateForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forgotForm])



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
                <Avatar src="/images/password_reset.png" sx={{ m: 1, bgcolor: 'secondary.main', width: 86, height: 86 }}>
                </Avatar>

                <Typography variant="h5">
                    Having trouble loging in?
                </Typography>
                <Typography variant="caption">
                    Don't worry we will help you recover your credentials!
                </Typography>


                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label={returnErrorMessage(formValidator.total_errors, "username") ?? "Email or Username"}
                        name="username"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => {
                            updateSpecificValue('username', e.target.value);
                        }}
                        error={isError(formValidator.total_errors, "username")}
                    />
                    <Typography variant="caption">
                        Type your email or username
                    </Typography>

                    <Button
                        fullWidth
                        onClick={submitForm}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={formValidator.active_errors}
                    >
                        {loading ? "Sending..." : "Send recovery link"}
                    </Button>
                </Box>
                <Divider />

                <Grid container>
                    <Grid item xs>
                        <Link href={"#" + returnStringRoute(AUTH_PREFIX, AUTH_ROUTES.LOGIN)} variant="body2">
                            Return to Log In page
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <CustomSnackBar
                message={String(snack.message)}
                open={Boolean(snack.message)}
                variant={snack.snackType}
                onClose={() => setSnack((l) => { return { ...l, message: null } })}
                hiddeable={false}
            />
        </Container >
    )
}
