/**
 * Component in displayed when code its been send to user's and it display the options to
 * update the password
 */
import { useCallback, useContext, useEffect, useState } from 'react';
import { Box, Button, Container, CssBaseline, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import { FormValidatorContext } from '@kubo-dev/form-validator';
import { AuthContext, ICognitoSignResponse, isError, returnStringRoute } from '@kubo-dev/kubo-auth';
import { CustomSnackBar } from '../../../components'
import { ISnackMessage } from '../../../types'
import { AUTH_PREFIX, AUTH_ROUTES } from '../../../routes';
import { useNavigateBasedOnRole } from '../../../hooks';


interface IResetPasswordForm {
    username: string
    newPassword: string
    code: string
    newPassword2: string
}

type RecoverEmailSenderNavState = {
    username: string
    data: string //User Login Data comes stringify from login form
    oldPassword: string
}

export const RecoverEmailSender = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const formValidator = useContext(FormValidatorContext);
    const { naviageByRole } = useNavigateBasedOnRole();
    const { changePasswordIndividualFlow, login } = useContext(AuthContext);
    const [passwordConfirm, setPasswordConfirm] = useState(false);
    const [loadedComponent, setLoadedComponent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userSignInData, setUserSignInData] = useState({} as ICognitoSignResponse)
    const [oldPassword, setOldPassword] = useState('')


    const [snack, setSnack] = useState(
        {
            message: null,
            snackType: "info"
        } as ISnackMessage
    );

    const [resetForm, setResetForm] = useState({
        username: '',
        newPassword: '',
        newPassword2: '',
        code: '',
    } as IResetPasswordForm);


    /**
     * Local functions
     */


    const determineOrigin = useCallback((state: RecoverEmailSenderNavState) => {
        if (state?.username) {
            updateFormValue('username', state.username);
            setUserSignInData(state?.data ? JSON.parse(state?.data) : {});
            setOldPassword(state?.oldPassword)
        }
        else updateFormValue('username', '');
    }, [])


    const validateForm = useCallback(() => {
        formValidator.are_any_errors();
        formValidator.text_error_validator("newPassword", resetForm.newPassword, [2]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetForm.newPassword]);


    /**
     * Updates the values for local state
     * @param prop_name 
     * @param value 
     */
    const updateFormValue = (prop_name: string, value: string | null) => {
        setResetForm((l) => {
            return { ...l, [prop_name]: value }
        })
    }


    const updateUserPassword = async () => {
        setLoading(true);
        try {
            await changePasswordIndividualFlow({ oldPassword, newPassword: resetForm.newPassword, user: userSignInData });
            const isAuth = await login(resetForm.username, resetForm.newPassword);
            naviageByRole(isAuth)
            setLoading(false);
            console.log(isAuth);
        }
        catch (e) {
            console.error(e)
            setLoading(false);
            setSnack(() => { return { message: String(e), snackType: "error" } })
        }
    }


    /**
     * 
     */


    useEffect(() => {
        if (location.state) {
            determineOrigin(location.state);
        }
        setLoadedComponent(true)
        return () => {
            formValidator.clean_object(["newPassword"]);
        }
    }, []);


    useEffect(() => {
        loadedComponent && validateForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetForm])


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
                {resetForm.username ?
                    <>
                        <Typography variant="h5">
                            Login Success!
                        </Typography>
                        <Typography variant="caption">
                            But first, we need to update your password...
                        </Typography>
                    </>
                    :
                    <>
                        <Typography variant="h5">
                            Ups! Something went wrong
                        </Typography>
                        <Typography variant="caption">
                            We were not able to process this action, to back to
                            <Link href={"#" + returnStringRoute(AUTH_PREFIX, AUTH_ROUTES.LOGIN)} variant="body2">
                                {String(" login page")}
                            </Link> and try again.
                        </Typography>
                    </>

                }

                {resetForm.username ?
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <Divider />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="newPassword"
                            label="Enter New Password"
                            name="newPassword"
                            autoFocus
                            onChange={(e) => {
                                updateFormValue('newPassword', e.target.value);
                            }}
                            error={isError(formValidator.total_errors, "newPassword")}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="newPassword2"
                            label="Confirm New Password"
                            name="newPassword2"
                            onChange={(e) => {
                                setPasswordConfirm(e.target.value === resetForm.newPassword)
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!passwordConfirm || formValidator.active_errors}
                            onClick={updateUserPassword}
                        >
                            {loading ? "Updating password..." : "Update password"}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href={"#" + returnStringRoute(AUTH_PREFIX, AUTH_ROUTES.LOGIN)} variant="body2">
                                    Return to Log In page
                                </Link>
                            </Grid>
                        </Grid>
                    </Box> :
                    null
                }

            </Box >
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
