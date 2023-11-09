/**
 * Component in displayed when code its been send to user's and it display the options to
 * update the password
 */
import { useCallback, useContext, useEffect, useState } from 'react';

import { Box, Button, Container, CssBaseline, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { useLocation } from "react-router-dom";
import { FormValidatorContext } from '@kubo-dev/form-validator';
import { AuthContext, ICodeDeliveryDetails, isError, returnStringRoute } from '@kubo-dev/kubo-auth';
import { CustomSnackBar, WrongOperationComponent } from '../../../../components'
import { ISnackMessage } from '../../../../types'
import { AUTH_PREFIX, AUTH_ROUTES } from '../../../../routes';
import { useNavigateBasedOnRole } from '../../../../hooks';


interface IResetPasswordForm {
    username: string
    newPassword: string
    code: string
    newPassword2: string
}

type IOrigin = {
    CodeDeliveryDetails: ICodeDeliveryDetails
}

type ResetPasswordNavState = {
    origin: IOrigin
    username: string
}

export const NewPasswordInputForm = () => {

    const location = useLocation();
    const formValidator = useContext(FormValidatorContext);
    const { naviageByRole } = useNavigateBasedOnRole();
    const { forgotPasswordProccess, login } = useContext(AuthContext);
    const [loadedComponent, setLoadedComponent] = useState(false);

    const [snack, setSnack] = useState(
        {
            message: null,
            snackType: "info"
        } as ISnackMessage
    );
    const [forgotForm, setForgotForm] = useState({
        username: '',
        newPassword: '',
        code: '',
    } as IResetPasswordForm);
    const [passwordConfirm, setPasswordConfirm] = useState(false)
    const [loading, setLoading] = useState(false as boolean);
    const [origin, setOrigin] = useState({} as IOrigin);

    /**
     * Local functions
     */


    const determineOrigin = useCallback((state: ResetPasswordNavState) => {
        setOrigin(state?.origin);
        updateFormValue("username", state?.username)
    }, [])


    const validateForm = useCallback(() => {
        formValidator.are_any_errors();
        formValidator.text_error_validator("code", forgotForm.code, [2, 4]);
        formValidator.text_error_validator("newPassword", forgotForm.newPassword, [2]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forgotForm])


    /**
     * Updates the values for local state
     * @param prop_name 
     * @param value 
     */
    const updateFormValue = (prop_name: string, value: string | null) => {
        setForgotForm((l) => {
            return { ...l, [prop_name]: value }
        })
    };



    const submitForm = async () => {
        setLoading(true);
        try {
            console.log(forgotForm)
            await forgotPasswordProccess({ ...forgotForm });
            const isAuth = await login(forgotForm.username, forgotForm.newPassword);
            naviageByRole(isAuth)
            setLoading(false);
            console.log(isAuth);
        }
        catch (e) {
            console.log(e)
            setLoading(false);
            setSnack(() => { return { message: String(e), snackType: "error" } })
        }
    }


    useEffect(() => {
        if (location.state) {
            determineOrigin(location.state);
        }
        setLoadedComponent(true)
        return () => {
            formValidator.clean_object(["code", "newPassword"]);
            setOrigin({} as IOrigin)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        loadedComponent && validateForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forgotForm])

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {origin?.CodeDeliveryDetails ?
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <>
                        <Typography variant="h5">
                            Please, verify your email
                        </Typography>
                        <Typography variant="caption">
                            We just send you a verification code to: {origin.CodeDeliveryDetails.Destination}
                        </Typography>
                    </>

                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <Divider />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="code"
                            label={"Verification code"}
                            name="code"
                            autoFocus
                            onChange={(e) => {
                                updateFormValue('code', e.target.value);
                            }}
                            error={isError(formValidator.total_errors, "code")}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="newPassword"
                            label={"Enter New Password"}
                            name="newPassword"
                            onChange={(e) => {
                                updateFormValue('newPassword', e.target.value);
                            }}
                            error={isError(formValidator.total_errors, "newPassword")}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="newPassword"
                            label="Confirm New Password"
                            name="newPassword"
                            onChange={(e) => {
                                setPasswordConfirm(e.target.value === forgotForm.newPassword)
                            }}
                        />
                        <Button
                            onClick={submitForm}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!passwordConfirm || formValidator.active_errors}
                        >
                            {loading ? "Changing password..." : "Change password"}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href={"#" + returnStringRoute(AUTH_PREFIX, AUTH_ROUTES.LOGIN)} variant="body2">
                                    Return to Log In page
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>

                </Box >
                : <WrongOperationComponent />
            }
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
