/**
 * Component displayed when user select the "Forgot Password option", showing a box to insert the username or email they want
 * to recover 
 */

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { AuthContext, returnStringRoute } from '@kubo-dev/kubo-auth';
import { Avatar, Box, Button, Container, CssBaseline, Divider, Grid, TextField, Typography } from '@mui/material';

import { CustomSnackBar } from '../../../components';
import { ISnackMessage } from '../../../types';
import { AUTH_PREFIX, AUTH_ROUTES } from '../../../routes';


interface IForgotPasswordPageForm {
    Username: string
}

export const ForgotPasswordPage = () => {

    const { resendSignUpCode } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false as boolean)
    const [snack, setSnack] = useState(
        {
            message: null,
            snackType: "info"
        } as ISnackMessage
    );
    const [loginForm, setLoginForm] = useState({
        Username: '',
    } as IForgotPasswordPageForm);





    /**
     * Local functions
     */

    const submitForm = async () => {
        setLoading(true);
        try {
            await resendSignUpCode({ username: loginForm.Username })
            setLoading(false);
            navigate(returnStringRoute(AUTH_PREFIX, AUTH_ROUTES.RECOVERY), { state: { origin: loginForm.Username } });
        } catch (e) {
            setLoading(false);
            setSnack(() => { return { message: String(e), snackType: "error" } })
        }
    }


    /**
     * Updates the values for local state
     * @param prop_name 
     * @param value 
     */
    const updateSpecificValue = (prop_name: string, value: string) => {
        setLoginForm((l) => {
            return { ...l, [prop_name]: value }
        })
    }




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
                        id="email"
                        label="Email or Username"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => {
                            updateSpecificValue('Username', e.target.value);
                        }}
                    />
                    <Typography variant="caption">
                        Type your email or username
                    </Typography>

                    <Button
                        fullWidth
                        onClick={submitForm}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}

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
